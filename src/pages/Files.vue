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

const fileName = ref('')
const fileExtension = ref('')

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