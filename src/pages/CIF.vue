<template>
    <el-container direction="vertical" v-loading="groupsLoading">
        <el-card>
            <el-row>
                <h2>Поиск по CIF-файлам</h2>
            </el-row>
            <el-row class="m-t-15">
                <el-collapse class="collapse-container">
                    <el-collapse-item name="Группы CIF-файла">
                        <template #title>
                            <p class="collapse-header">
                                Группы CIF-файла
                            </p>
                        </template>
                        <search-component :structure="structure">

                        </search-component>
                    </el-collapse-item>

                    <el-collapse-item name="Загрузка CIF-файлов">
                        <template #title>
                            <p class="collapse-header">
                                Загрузка CIF-файлов
                            </p>
                        </template>

                        <el-upload
                            v-model:file-list="fileList"
                            ref="uploadRef"
                            class="upload-demo m-t-15"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            multiple
                            :auto-upload="false"
                        >
                            <template #trigger>
                                <el-button type="primary" class="m-r-15">Загрузить файлы</el-button>
                            </template>
                            <div class="el-upload el-upload--text">
                                <el-button type="success" @click="submitUpload">
                                    Отправить на сервер
                                </el-button>
                            </div>


                        </el-upload>

                    </el-collapse-item>
                </el-collapse>
            </el-row>

            <el-row :gutter="25" class="m-t-15" align="middle">
                <el-col :span="4">
                    Режим
                </el-col>
                <el-col :span="16">
                    <el-radio-group v-model="selectedMode">
                        <el-radio size="large" label="divided">
                            Частичный CIF
                        </el-radio>
                        <el-radio size="large" label="full" >
                            Полный CIF
                        </el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="4" align="end">
                    <el-button
                        type="primary"
                        :icon="Search"
                        size="large"
                        @click="findCIFs"
                    >
                        Поиск
                    </el-button>
                </el-col>
            </el-row>
        </el-card>

        <el-card class="m-t-15" v-loading="cifsLoading">
            <el-table :data="mockObjects" border>
                <el-table-column v-for="key in groupsNames" :key="key" :prop="key" :label="key" width="250" />
            </el-table>
        </el-card>
    </el-container>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, Ref, watch, toRaw, } from 'vue'
import { Api } from '@/api'
import {IGetGroupsRequest} from "@/types/Requests";
import {IGetGroupsResponse} from "@/types/Responses";
import {dataViewFormats, fileTypes} from "@/types/enums";
import SearchComponent from "@/components/searchComponent.vue";
import type { UploadInstance, UploadUserFile } from 'element-plus'

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
    uploadRef.value!.submit()
    // uploadRef.value!.clearFiles()
}

const fileList = ref<UploadUserFile[]>([])

const selectedMode = ref('divided') as Ref<dataViewFormats>

const groupsLoading = ref(true)

const cifsLoading = ref(false)
const cifsCount = ref(10)
const delimeter = ref(1)
const structure: Record<string, any> = reactive({})
const cifs = ref([])
const executionTime = ref(0)

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

const groupsNames = ref(Object.keys(mockObj))
// const groupsNames = ref([])

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
console.log(toRaw(structure));

const getGroups = async () => {
    groupsLoading.value = true
    const request: IGetGroupsRequest = {
        fileType: fileTypes.CIF,
        dataViewFormat: selectedMode.value,
    }

    try {
        const response: IGetGroupsResponse = await Api.OTHER.getGroups(request)
        // selectedMode.value = response.dataViewFormat
        // groupsNames.value = [...response.structure]
    } catch (e) {
        console.error(e);
    }

    groupsLoading.value = false
}

const findCIFs = async () => {
    cifsLoading.value = true
    const request: any = {
        count: cifsCount.value,
        delimeter: delimeter.value,
        dataViewFormat: selectedMode.value,
        structure: toRaw(structure)
    }

    try {
        const response = await Api.CIF.getCIFData(request)
        executionTime.value = response.executionTime
        mockObjects = response.data_from_DB
    } catch (e) {
        console.error(e);
    }

    cifsLoading.value = false
}

watch(selectedMode, newValue => {
    getGroups()
    // groupsNames.value.forEach((group: string) => {
    //     structure[group] = ''
    // })
})

getGroups()

</script>

<style scoped>
</style>