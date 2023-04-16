<template>
    <el-container>
        <el-header height="100">
            <h1>Materials Data</h1>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <side-bar-menu></side-bar-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import SideBarMenu from "@/components/SideBarMenu.vue";

</script>

<style scoped>

</style>
