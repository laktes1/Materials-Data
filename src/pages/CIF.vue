<template>
    <el-card>
        <el-row>
            <h2>Поиск по CIF-файлам</h2>
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
                <el-input v-model="findingValue" clearable />
            </el-col>
        </el-row>

        <el-row :gutter="25" class="m-t-15" align="middle">
            <el-col :span="4">
                Режим
            </el-col>
            <el-col :span="16">
                <el-radio-group v-model="selectedMode">
                    <el-radio size="large" :label="0" >
                        Полный CIF
                    </el-radio>
                    <el-radio size="large" :label="1">
                        Частичный CIF
                    </el-radio>
                </el-radio-group>
            </el-col>
            <el-col :span="4" align="end">
                <el-button type="primary" :icon="Search" size="large">Поиск</el-button>
            </el-col>
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
import { inject } from 'vue'
const globalVariables = inject('globalVariables')

console.log(globalVariables)

const findingValue = ref('')
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