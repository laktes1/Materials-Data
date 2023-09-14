<template>
    <el-container direction="vertical" v-loading="groupsLoading">
        <el-card id="materials-card">
            <el-row>
                <h2>Работа с {{ fileTypeName }} OPTIMIZATION -файлами</h2>
            </el-row>
            <el-card>
                <el-row class="m-t-15">
                <el-collapse v-model="activeNames" class="collapse-container">
                    <el-collapse-item name="Поиск">
                        <template #title>
                            <p class="collapse-header">
                                Поиск {{ fileTypeName }}-файлов
                            </p>
                        </template>
                        <search-component :structure="structure" />

                        <el-row :gutter="25" class="m-t-15" align="middle">
                            <el-col :span="4">
                                <h3>Режим поиска</h3>
                            </el-col>
                            <el-col :span="12">
                                <el-radio-group v-model="selectedMode">
                                    <el-radio size="large" label="divided">
                                        Частичный {{ fileTypeName }}
                                    </el-radio>
                                    <el-radio size="large" label="full" >
                                        Полный {{ fileTypeName }}
                                    </el-radio>
                                </el-radio-group>
                            </el-col>
                            <el-col :span="8" align="end">
                                <el-button
                                    type="primary"
                                    :icon="Search"
                                    size="large"
                                    @click="getMaterialsData"
                                >
                                    Поиск
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-collapse-item>

                    <el-collapse-item name="Загрузка" class="m-t-15">
                        <template #title>
                            <p class="collapse-header">
                                Загрузка {{ fileTypeName }}-файлов
                            </p>
                        </template>

                        <el-upload
                            v-model:file-list="fileList"
                            ref="uploadRef"
                            class="upload-demo m-t-15"
                            multiple
                            :auto-upload="false"
                            :action="fileApiActionUrl"
                            v-loading="fileUploading"
                        >
                            <template #default="{ fileList }">
                                <div class="el-upload el-upload--text">
                                    <el-button type="success" @click="handleUpload" class="m-r-15">
                                        Отправить на сервер
                                    </el-button>
                                </div>
                                <div class="el-upload el-upload--text">
                                    <el-button type="warning" @click="clearFiles" class="m-r-15">
                                        Очистить файлы
                                    </el-button>
                                </div>
                            </template>
                            <template #trigger>
                                <el-button type="primary" class="m-r-15">Загрузить файлы</el-button>
                            </template>
                        </el-upload>

                    </el-collapse-item>
                </el-collapse>
            </el-row>
            </el-card>
            <template v-if="resultsVisible">
                <el-row :gutter="25" class="m-t-15" align="middle">
                    <el-col>
                        Время выполнения запроса: {{executionTime}}
                    </el-col>
                </el-row>
                <el-row :gutter="25" class="m-t-15" align="middle">
                    <el-col>
                        Количество результатов: {{resultsCount}}
                    </el-col>
                </el-row>
            </template>
        </el-card>

        <el-card
            class="m-t-15"
            v-loading="materialsDataLoading"
            v-if="materials.length > 0"
        >
            <el-table :data="materials" border>
                <el-table-column
                    v-for="key in groupsNames"
                    :key="key"
                    :prop="key"
                    :label="key"
                    :width="calculateSize(materials[0][key], 100, 800)"
                    resizable
                >
                    <template #default="scope">
                        <template v-if="scope.row[key].length > 500">
                            <details>
                                <summary>Длинный текст</summary>
                                {{scope.row[key]}}
                            </details>
                        </template>
                        <template v-else>
                            {{scope.row[key]}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="Дополнительно" width="150" fixed="right" v-if="groupsNames.length > 0">
                    <template #default="scope">
                        <el-row :gutter="25" align="middle">
                            <el-col :span="12" class="centered-content">
                                <el-button
                                    size="default"
                                    @click="handleDownload(scope.$index, scope.row, scope)"
                                    :icon="UploadFilled"
                                    :loading-icon="Eleme"
                                    :loading="tableDownloadButtons[scope.$index].loading"
                                ></el-button>
                            </el-col>

                            <el-col :span="12" class="centered-content">
                                <el-button
                                    size="default"
                                    @click="viewMaterialInfo(scope.row)"
                                    :icon="View"
                                ></el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-row class="m-t-15" align="middle" justify="center">
            <el-pagination
                v-model:current-page="delimetr"
                :page-size="materialsCount"
                layout="prev, pager, next"
                :total="resultsCount"
                hide-on-single-page
            />
        </el-row>

        <el-card class="m-t-15" v-show="showMaterialInformation" id="smiles-card-ref">
            <el-collapse v-model="showSmiles">
                <el-collapse-item name="Визуализация SMILES">
                    <template #title>
                        <p class="collapse-header">
                            Визуализация SMILES кодов
                        </p>
                    </template>
                    <material-information
                        :smilesCode="smilesCode"
                        :sizes="canvasSizes"
                    />
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </el-container>
</template>

<script setup lang="ts">
import {Eleme, Search, UploadFilled, View} from '@element-plus/icons-vue'
import {computed, h, nextTick, onMounted, reactive, Ref, ref, toRaw, unref, watch} from 'vue'
import {API} from '@/api'
import {IGetGroupsRequest} from '@/types/Requests'
import {IGetGroupsResponse} from '@/types/Responses'
import {dataViewFormats, fileTypes} from '@/types/enums'
import SearchComponent from '@/components/SearchComponent.vue'
import type {UploadInstance, UploadUserFile} from 'element-plus'
import {calculateSize} from '@/helpers/Utils'
import MaterialInformation from '@/components/MaterialInformation.vue'

const props = defineProps({
    fileType: {
        type: String as () => fileTypes,
        required: true
    },
})

const fileTypeName = unref(props.fileType).toUpperCase()
const activeNames = ref('')
const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const fileApiActionUrl = `${import.meta.env.VITE_APP_API_URL}/upload_${fileTypeName.toLocaleLowerCase()}_file/`
const fileUploading = ref(false)

const handleUpload = () => {
    fileUploading.value = true

    const formData = new FormData()
    fileList.value.forEach((file, id) => {
        formData.append('files', file.raw)
    })

    API[fileTypeName].uploadFile(formData)
        .then(response => {
            fileList.value.forEach((file) => {
                if (response.data[file.name].status === 'successfully') {
                    file.status = 'success'
                } else {
                    file.status = 'fail'
                    file.error = response.data[file.name].error
                }
            })

            const uploadList = document.querySelector('.el-upload-list')
            const uploadChildren = Array.from(uploadList!.children)
            const files = response.data
            const fileKeys = Object.keys(files);
            uploadChildren.forEach((el, id) => {
                const oldDiv = document.getElementById(`upload-list__item-info-${id}`)
                if (oldDiv) {
                    oldDiv.remove()
                }
                const div = document.createElement('div')
                const file = files[fileKeys[id]]
                div.classList.add('upload-list__item-info')
                div.id = `upload-list__item-info-${id}`
                div.innerHTML = `<div>ID файла - ${file.id}</div>`
                if (file.error) {
                    div.innerHTML = div.innerHTML.concat(`<div>Ошибка загрузки файла - ${file.error}</div>`)
                }
                el.append(div)
            })
        })
        .catch(error => {
            console.error(error)
        })
        .finally(() => {
            fileUploading.value = false
        })
}

const clearFiles = () => {
    uploadRef.value!.clearFiles()
}

const showMaterialInformation = ref(false);
const smilesCode = ref('OC(C(=O)O[C@H]1C[N+]2(CCCOC3=CC=CC=C3)CCC1CC2)(C1=CC=CS1)C1=CC=CS1');
let canvasSizes = reactive({ width: null, height: null })
const showSmiles = ref('Визуализация SMILES')

const viewMaterialInfo = (row) => {

    const regex = /{"smiles": "([^"]+)"}/
    const match = row.visual_data ? row.visual_data.match(regex) : null
    const element = document.getElementById('smiles-card-ref')

    if (match) {
        smilesCode.value = match[1]
        showMaterialInformation.value = true
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }
}

const materialInformation = computed(() => {
    if (showMaterialInformation.value) {
        return h(MaterialInformation, {
            smilesCode: smilesCode.value,
        });
    }
    return null;
});

watch(smilesCode, () => {
    materialInformation.value;
});

const selectedMode = ref('divided') as Ref<dataViewFormats>
const groupsLoading = ref(true)

const materialsDataLoading = ref(false)
const materialsCount = ref(5)
const delimetr = ref(1)
let structure: Record<any, any> = reactive({})
const materials = ref([])

onMounted(() => {
    const element = document.getElementById('materials-card')
    canvasSizes = { width: element.offsetWidth, height: element.offsetWidth }
})

const tableDownloadButtons: Record<any, any> = ref([])
for (let i = 0; i < materialsCount.value; i += 1) {
    tableDownloadButtons.value.push({loading: false})
}
const handleDownload = async (index: number, row: any, scope: any) => {
    tableDownloadButtons.value[index].loading = true;

    const request: any = {
        id: row.id
    }

    const response = await API.OTHER.downloadFile(request)

    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    const filename = `${row.id}.${fileTypeName.toLowerCase()}`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

    tableDownloadButtons.value[index].loading = false;
}

const resultsVisible = ref(false)
const executionTime = ref('0:00:00.000000')
const resultsCount = ref(0)
const groupsNames = ref([])

const getGroups = async () => {
    groupsLoading.value = true
    const request: IGetGroupsRequest = {
        fileType: fileTypeName.toLowerCase(),
        dataViewFormat: selectedMode.value,
        type_out: "optimization"
    }

    try {
        // @ts-ignore
        const response: IGetGroupsResponse = await API.OTHER.getGroups(request)
        groupsNames.value = response.data.structure
        structure = reactive(groupsNames.value.reduce((acc, group) => {
            acc[group] = ''
            return acc
        }, {}))

        activeNames.value = ''
        await nextTick()
        activeNames.value = 'Поиск'
    } catch (e) {
        console.error(e);
    }

    groupsLoading.value = false
}

const getMaterialsData = async () => {
    materialsDataLoading.value = true
    const request: any = {
        count: materialsCount.value,
        delimetr: delimetr.value,
        dataViewFormat: selectedMode.value,
        type_out: "optimization",
        structure: toRaw(structure)
    }

    try {
        const response = await API[fileTypeName].getMaterialData(request)
        executionTime.value = response.data.execution_time
        resultsCount.value = response.data.resultsCount
        materials.value = response.data.data_from_DB
        resultsVisible.value = true
    } catch (e) {
        console.error(e);
    }

    materialsDataLoading.value = false
}

onMounted(() => {
    getGroups()
})

watch(delimetr, async () => {
    showMaterialInformation.value = false
    await getMaterialsData()
})

watch(selectedMode, () => {
    showMaterialInformation.value = false
    materials.value = []
    resultsCount.value = 0
    resultsVisible.value = false
    getGroups()
})

</script>

<style>
.upload-list__item-info {
    margin-left: 24px;
    color: var(--el-text-color-regular);
    display: inline-flex;
    text-align: center;
    align-items: center;
    padding: 0 4px;
    transition: color var(--el-transition-duration);
    font-size: var(--el-font-size-base);
}
</style>