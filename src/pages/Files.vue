<template>
    <el-card>
        <el-row>
            <h2>Поиск файлов</h2>
        </el-row>

        <el-row :gutter="25" class="m-t-15" align="middle">
            <el-col :span="4">
                Название файла
            </el-col>
            <el-col :span="20">
                <el-input v-model="fileName" clearable placeholder="Название"/>
            </el-col>
        </el-row>

        <el-row :gutter="25" class="m-t-15" align="middle">
            <el-col :span="4">
                Расширение файла
            </el-col>
            <el-col :span="20">
                <el-input v-model="fileExtension" clearable placeholder="Расширение"/>
            </el-col>
        </el-row>

        <el-row class="m-t-15" align="middle" justify="end">
            <el-button type="primary" :icon="Search" size="large">Поиск</el-button>
        </el-row>

        <el-row class="m-t-15">
            <el-collapse class="collapse-container">

                <el-collapse-item name="Загрузка-файлов">
                    <template #title>
                        <p class="collapse-header">
                            Загрузка файлов
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
                    <!--                                    Убрать файлы-->
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
                                Убрать файлы
                            </el-button>
                        </div>
                    </el-upload>

                </el-collapse-item>
            </el-collapse>
        </el-row>
    </el-card>

    <el-card class="m-t-15">
        <el-table :data="mockObjects" border>
            <el-table-column v-for="key in mockKeys" :key="key" :prop="key" :label="key" width="250" />
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { Api } from '@/api'
import {UploadInstance, UploadUserFile} from "element-plus";
import axios from "axios";

const fileName = ref('')
const fileExtension = ref('')

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const fileApiActionUrl = `${import.meta.env.VITE_APP_API_URL}/upload_file/`
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


    // Api.Other.uploadFile(formData)
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

const mockObj = reactive({
    'Идентификатор': 'c5434530fs-sdas-hfdghf',
    'default group': 'adult-creation-date 2015-07-29',
    'submitions details': 'null',
    'processing summary': {volume: '51', year: 2015, pageFirst: '14814', nameFull: 'Chen Conumun'},
    'title and author': JSON.stringify({author: 'Jackson Peter', title: 'Test'}),
    'test': 'test null',
    'chemical data': {formula: 'H2O', crystalColor: 'purple', description: 'testsetsetste', formulaUnits: 2},
    'refinement data': {rFactor: 0.0368, wRFactor: 0.0456},
    'one of': null,
})

const mockKeys = reactive(Object.keys(mockObj))

const mockObjects = reactive([
    {
        'Идентификатор': 'c5434530fs-sdas-hfdghf',
        'default group': 'adult-creation-date 2015-07-29',
        'submitions details': 'null',
        'processing summary': {volume: '51', year: 2015, pageFirst: '14814', nameFull: 'Chen Conumun'},
        'title and author': {author: 'Jackson Peter', title: 'Test'},
        'test': 'test null',
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
        'test': 'test null',
        'chemical data': {formula: 'H2O', crystalColor: 'purple', description: 'testsetsetste', formulaUnits: 2},
        'refinement data': {rFactor: 0.0368, wRFactor: 0.0456},
        'one of': null,
    },
])

mockObjects.forEach(chemicalData => {
    Object.entries(chemicalData).forEach(([key, value]) => {
        chemicalData[key] = JSON.stringify(value)
    })
})
</script>

<style scoped>

</style>