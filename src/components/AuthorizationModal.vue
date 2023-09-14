<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title="Авторизация"
            :modal="false"
            :show-close="false"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            width="540px"
        >
            <el-form label-width="80px">
                <el-form-item label="Логин">
                    <el-input v-model="username" />
                </el-form-item>
                <el-form-item label="Пароль">
                    <el-input v-model="password" type="password" />
                </el-form-item>
            </el-form>
            <el-row slot="footer" justify="end">
                <span  class="dialog-footer">
                <el-button @click="cancelLogin">Отмена</el-button>
                <el-button type="primary" @click="handleLogin">Войти</el-button>
            </span>
            </el-row>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// import {API} from "@/api/index.js";
import { API } from '@/api'
import axios from "axios";


let username = ref('')
let password = ref('')
let dialogVisible = ref(true)

const router = useRouter()

const handleLogin = () => {
    // TODO запрос на логирование
    // if (username.value === 'admin' && password.value === 'HqDRUj') {
    //    router.push('/cifPage')
    // } else {
    //    errorMessage()
    // }

    let jsonString;
    jsonString = password.value;

    API.AUTH.authorization(jsonString, username.value)
        .then(response => {
            if (String(response.data) === 'true') {
              router.push('/cifPage')
            }
        })
        .catch(error => {
            console.error(error)
            errorMessage()
        })
    //   let jsonString;
    // jsonString = password.value;
    //
    // API.AUTH.authorization(jsonString,'http://37.75.248.232:8080/users/validate/'+username.value)
    //     .then(response => {
    //         if (String(response.data) === 'true') {
    //           router.push('/cifPage')
    //         }
    //     })
    //     .catch(error => {
    //         console.error(error)
    //         errorMessage()
    //     })
}

const cancelLogin = () => {
    username.value = ''
    password.value = ''
}

const errorMessage = () => {
    ElMessage({
        showClose: true,
        message: 'Неправильный данные',
        type: 'error',
    })
}
</script>

<style scoped>

</style>