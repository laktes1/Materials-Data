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

let username = ref('')
let password = ref('')
let dialogVisible = ref(true)

const router = useRouter()

const handleLogin = () => {
    // TODO запрос на логирование
    router.push('/cifPage')
}
const cancelLogin = () => {
    username.value = ''
    password.value = ''
}
</script>

<style scoped>

</style>