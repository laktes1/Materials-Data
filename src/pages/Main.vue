<template>
    <el-card>
        <el-row>
            <h3>Искать в базе</h3>
        </el-row>

        <el-row :gutter="25" class="m-t-15" align="middle">
            <el-col :span="4">
                Поле
            </el-col>
            <el-col :span="20">
                <el-select v-model="selectedValue" size="large" :span="20" class="w-p-100">
                    <el-option
                        v-for="item in mockKeys"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </el-col>
        </el-row>

        <el-row :gutter="25" class="m-t-15" align="middle">
            <el-col :span="4">
                Значение
            </el-col>
            <el-col :span="20">
                <el-input v-model="input" clearable />
            </el-col>
        </el-row>

        <el-row :gutter="25" class="m-t-15" align="middle">
            <el-col :span="4">
                Режим
            </el-col>
            <el-col :span="4">
                <el-radio-group v-model="selectedMode">
                    <el-radio size="large" :label="0" >
                        Полный CIF
                    </el-radio>
                    <el-radio size="large" :label="1">
                        Частичный CIF
                    </el-radio>
                </el-radio-group>
            </el-col>
        </el-row>

        <el-row class="m-t-15" align="middle">
            <el-button type="primary" :icon="Search" size="large">Поиск</el-button>
        </el-row>
    </el-card>

    <el-card class="m-t-15">
        <el-table :data="mockObjects" border style="width: 100%">
            <el-table-column prop="Идентификатор" label="Идентификатор" width="180" />
            <el-table-column prop="default group" label="default group" width="180" />
            <el-table-column prop="submitions details" label="submitions details" width="180" />
            <el-table-column prop="processing summary" label="processing summary" width="300" />
            <el-table-column prop="title and author" label="title and author" width="150" />
            <el-table-column prop="test" label="test" width="180" />
            <el-table-column prop="chemical data" label="chemical data" width="300" />
            <el-table-column prop="refinement data" label="refinement data" width="300" />
            <el-table-column prop="one of" label="one of" />
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'

const input = ref('')
const selectedMode = ref(0)
const selectedValue = ref()

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