<template>
    <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :router="true"
    >
        <el-menu-item index="1" route="/cifPage">
            <span class="side-bar-menu__title" slot="title">CIF файлы</span>
        </el-menu-item>
        <el-menu-item index="2" route="/outPage">
            <span class="side-bar-menu__title" slot="title">OUT файлы</span>
        </el-menu-item>
<!--        //TODO разкоментить, когда будет готова /filesPage-->
<!--        <el-menu-item index="3" route="/filesPage">-->
<!--            <span class="side-bar-menu__title" slot="title">Все файлы</span>-->
<!--        </el-menu-item>-->
    </el-menu>
</template>

<script setup>
// TODO фикс default-active="1" на значение в зависимости от текущего роута
</script>

<style scoped lang="scss">
.side-bar-menu {
    &__title {
        font-size: 16px;
    }
}
</style>