<template>
    <el-container direction="vertical" v-loading="groupsLoading">
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
                            v-for="item in groupsNames"
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
                        <el-radio size="large" label="divided">
                            Частичный CIF
                        </el-radio>
                        <el-radio size="large" label="full" >
                            Полный CIF
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
                <el-table-column v-for="key in groupsNames" :key="key" :prop="key" :label="key" width="250" />
            </el-table>
        </el-card>
    </el-container>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, Ref, watch } from 'vue'
import { Api } from '@/api'
import {IGetGroupsRequest} from "@/types/Requests";
import {IGetGroupsResponse} from "@/types/Responses";
import {dataViewFormats, fileTypes} from "@/types/enums";

console.log('API', Api);
const findingValue = ref('')
const selectedMode = ref('divided') as Ref<dataViewFormats>
const selectedValue = ref()

const groupsLoading = ref(true)

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

const mockObjects = reactive([
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
])

mockObjects.forEach(chemicalData => {
    Object.entries(chemicalData).forEach(([key, value]) => {
        chemicalData[key] = JSON.stringify(value)
    })
})

const getGroups = async () => {
    groupsLoading.value = true
    const request: IGetGroupsRequest = {
        fileType: fileTypes.CIF,
        dataViewFormat: selectedMode.value,
    }

    Api.OTHER.getGroups(request).then((response: IGetGroupsResponse) => {
        console.log('response', response);
        selectedMode.value = response.dataViewFormat
        groupsNames.value = [...response.structure]
    }).finally(async() => {
        await new Promise(((resolve, reject) => {
            setTimeout(resolve, 1000);
        }))
        groupsLoading.value = false
    })
}

watch(selectedMode, newValue => {
    getGroups()
})

getGroups()

</script>

<style scoped>

</style>