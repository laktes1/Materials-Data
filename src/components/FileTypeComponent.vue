<template>
    <el-container direction="vertical" v-loading="groupsLoading">
        <el-card>
            <el-row>
                <h2>Работа с {{materialName}}-файлами</h2>
            </el-row>
            <el-card>
                <el-row class="m-t-15">
                <el-collapse v-model="activeNames" class="collapse-container">
                    <el-collapse-item name="Поиск">
                        <template #title>
                            <p class="collapse-header">
                                Поиск {{materialName}}-файлов
                            </p>
                        </template>
                        <search-component :structure="structure">

                        </search-component>

                        <el-row :gutter="25" class="m-t-15" align="middle">
                            <el-col :span="4">
                                <h3>Режим поиска</h3>
                            </el-col>
                            <el-col :span="12">
                                <el-radio-group v-model="selectedMode">
                                    <el-radio size="large" label="divided">
                                        Частичный {{materialName}}
                                    </el-radio>
                                    <el-radio size="large" label="full" >
                                        Полный {{materialName}}
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
                                Загрузка {{materialName}}-файлов
                            </p>
                        </template>

                        <!--                        <el-upload-->
                        <!--                            v-model:file-list="fileList"-->
                        <!--                            ref="uploadRef"-->
                        <!--                            class="upload-demo m-t-15"-->
                        <!--                            multiple-->
                        <!--                            :auto-upload="false"-->
                        <!--                            :action="fileApiActionUrl"-->
                        <!--                            v-loading="fileUploading"-->
                        <!--                        >-->
                        <!--                            <template #trigger>-->
                        <!--                                <el-button type="primary" class="m-r-15">Загрузить файлы</el-button>-->
                        <!--                            </template>-->
                        <!--                            <div class="el-upload el-upload&#45;&#45;text">-->
                        <!--                                <el-button type="success" @click="handleUpload" class="m-r-15">-->
                        <!--                                    Отправить на сервер-->
                        <!--                                </el-button>-->
                        <!--                            </div>-->
                        <!--                            <div class="el-upload el-upload&#45;&#45;text">-->
                        <!--                                <el-button type="warning" @click="clearFiles" class="m-r-15">-->
                        <!--                                    Очистить файлы-->
                        <!--                                </el-button>-->
                        <!--                            </div>-->
                        <!--                        </el-upload>-->

                        <!--TODO mock данные, потом удалить-->
                        <el-upload
                            v-model:file-list="fileList"
                            ref="uploadRef"
                            class="upload-demo m-t-15"
                            multiple
                            :auto-upload="false"
                            :action="mockUploadUrl"
                            v-loading="fileUploading"
                        >
                            <template #trigger>
                                <el-button type="primary" class="m-r-15">Загрузить файлы</el-button>
                            </template>
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

        <el-card class="m-t-15" v-loading="materialsDataLoading">
            <el-table :data="mockObjects" border>
                <el-table-column
                    v-for="key in groupsNames"
                    :key="key"
                    :prop="key"
                    :label="key"
                    :width="calculateSize(mockObjects[0][key], 100, 500)"
                />
                <el-table-column label="Скачать" width="150" fixed="right" >
                    <template class="centered-cell" #default="scope">
                        <el-button
                            size="default"
                            @click="handleDownload(scope.$index, scope.row, scope)"
                            :icon="UploadFilled"
                            :loading-icon="Eleme"
                            :loading="tableDownloadButtons[scope.$index].loading"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </el-container>
</template>

<script setup lang="ts">
import { Search, UploadFilled, Eleme } from '@element-plus/icons-vue'
import { ref, reactive, Ref, watch, toRaw, onMounted, unref } from 'vue'
import { Api } from '@/api'
import {IGetGroupsRequest} from "@/types/Requests";
import {IGetGroupsResponse} from "@/types/Responses";
import {dataViewFormats, fileTypes} from "@/types/enums";
import SearchComponent from "@/components/searchComponent.vue";
import type { UploadInstance, UploadUserFile } from 'element-plus'
import axios from "axios";
import {calculateSize} from "@/helpers/Utils";

const props = defineProps({
    fileType: {
        type: String as () => fileTypes,
        required: true
    },
})
const materialName = unref(props.fileType)
const activeNames = ref('Поиск')
const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const fileApiActionUrl = `${import.meta.env.VITE_APP_API_URL}/upload_${materialName.toLocaleLowerCase()}_file/`
const fileUploading = ref(false)

const mockUploadUrl = ref('https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15')

const handleUpload = () => {
    if (fileUploading.value) {
        return
    }
    fileUploading.value = true

    const formData = new FormData()
    fileList.value.forEach((file, id) => {
        formData.append(`file-${id}`, file.raw)
    })


    // Api[materialName].uploadFile(formData)
    // TODO Mock-Данные удалить потом
    axios.post(mockUploadUrl.value, formData)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error(error)
        })
        .finally(() => {
            fileUploading.value = false // TODO сделать очистку загруженных файлов и оставить ошибочные
        })
}

const clearFiles = () => {
    // uploadRef.value!.submit()
    uploadRef.value!.clearFiles()
}

const selectedMode = ref('divided') as Ref<dataViewFormats>

const groupsLoading = ref(true)

const materialsDataLoading = ref(false)
const materialsCount = ref(10)
const delimeter = ref(1)
const structure: Record<string, any> = reactive({})
const materials = ref([])

const tableDownloadButtons: Record<any, any> = ref([])
for (let i = 0; i < materialsCount.value; i += 1) {
    tableDownloadButtons.value.push({loading: false})
}
const handleDownload = async (index: number, row: any, scope: any) => {
    tableDownloadButtons.value[index].loading = true;

    // TODO Загрузка файла
    await new Promise((resolve => {
        setTimeout(resolve, 2000)
    }))

    tableDownloadButtons.value[index].loading = false;

    // console.log(index, row)
    // console.log('scope', scope)
}


const resultsVisible = ref(false)
const executionTime = ref('0:00:00.000000')
const resultsCount = ref(0)


const mockObj = reactive({
    'Идентификатор': 'c5434530fs-sdas-hfdghf',
    'default group': 'adult-creation-date 2015-07-29',
    'submitions details': 'null',
    'processing summary': {volume: '51', year: 2015, pageFirst: '14814', nameFull: 'Chen Conumun'},
    'title and author': JSON.stringify({author: 'Jackson Peter', title: 'Test'}),
    'test': null,
    'chemical data': {formula: 'H2O', crystalColor: 'purple', description: 'testsetsetste', formulaUnits: 2},
    'refinement data': {rFactor: 0.0368, wRFactor: 0.0456},
    'one of': null,
})

//TODO mock потом удалить эти строчки
const groupsNames = ref(Object.keys(mockObj))
// const groupsNames = ref([])

//TODO mock потом удалить эти строчки
let mockObjects = [
    {
        'Идентификатор': 'c5434530fs-sdas-hfdghf',
        'default group': 'adult-creation-date 2015-07-29',
        'submitions details': 'null',
        'processing summary': {volume: '51', year: 2015, pageFirst: '14814', nameFull: 'Chen Conumun'},
        'title and author': {author: 'Jackson Peter', title: 'Test'},
        'test': null,
        'chemical data': {formula: 'H2O', crystalColor: 'purple', description: 'testsetsetste', formulaUnits: 2},
        'refinement data': {rFactor: 0.0368, wRFactor: 0.0456},
        'one of': null,
    },
    {
        'Идентификатор': 'berbsbfb-sdfsdf45-hh544',
        'default group': 'adult-creation-date 2015-07-29',
        'submitions details': 'null',
        'processing summary': {volume: '51', year: 2015, pageFirst: '14814', nameFull: 'Chen Conumun'},
        'title and author': {author: 'Jackson Peter', title: 'Test'},
        'test': null,
        'chemical data': {formula: 'H2O', crystalColor: 'purple', description: 'testsetsetste', formulaUnits: 2},
        'refinement data': {rFactor: 0.0368, wRFactor: 0.0456},
        'one of': null,
    },
]

//TODO mock потом удалить эти строчки
mockObjects.forEach(chemicalData => {
    Object.entries(chemicalData).forEach(([key, value]) => {
        chemicalData[key] = JSON.stringify(value)
    })
})
groupsNames.value.forEach((group: string) => {
    structure[group] = ''
})

const getGroups = async () => {
    groupsLoading.value = true
    const request: IGetGroupsRequest = {
        fileType: materialName,
        dataViewFormat: selectedMode.value,
    }

    try {
        // const response: IGetGroupsResponse = await Api.OTHER.getGroups(request)
        // selectedMode.value = response.dataViewFormat
        // groupsNames.value = [...response.structure]
    } catch (e) {
        console.error(e);
    }

    groupsLoading.value = false
}

watch(selectedMode, newValue => {
    getGroups()
    groupsNames.value.forEach((group: string) => {
        structure[group] = ''
    })
})

const getMaterialsData = async () => {
    materialsDataLoading.value = true
    const request: any = {
        count: materialsCount.value,
        delimeter: delimeter.value,
        dataViewFormat: selectedMode.value,
        structure: toRaw(structure)
    }

    try {
        const response = await Api[materialName].getMaterialData(request)
        executionTime.value = response.executionTime
        resultsCount.value = response.resultsCount //TODO сказать добавить в API
        // materials.value = response.data_from_DB
        resultsVisible.value = true
        //TODO mock потом удалить эти строчки
        mockObjects = response.data_from_DB

    } catch (e) {
        console.error(e);
    }

    materialsDataLoading.value = false
}

onMounted(() => {
    getGroups()
})

</script>

<style scoped>

</style>