<template>
        <h1>TEST</h1>
            <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :on-success="handleSuccess"
                :on-error="handleError"
                :multiple="true"
                :auto-upload="false"
                v-model:file-list="fileList"
                ref="uploadRef">
                <template #trigger>
                    <el-button type="primary" class="m-r-15">Загрузить файлы</el-button>
                </template>
                <div class="el-upload el-upload--text">
                    <el-button type="success" @click="uploadFiles">
                        Отправить на сервер
                    </el-button>
                </div>
            </el-upload>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import {UploadInstance, UploadUserFile} from "element-plus";

const uploadRef = ref<UploadInstance>()
const uploadUrl = ref('https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15')
const fileList = ref<UploadUserFile[]>([])

const handleSuccess = (response, file, fileList) => {
    console.log(response)
}

const handleError = (err, file, fileList) => {
    console.log(err)
}

const uploadFiles = () => {
    const formData = new FormData()
    fileList.value.forEach((file) => {
        formData.append('files', file.raw)
    })
    axios.post(uploadUrl.value, formData)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}
</script>

<style scoped>

</style>