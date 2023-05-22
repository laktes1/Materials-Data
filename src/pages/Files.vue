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
            <el-table-column
                v-for="key in mockKeys"
                :key="key"
                :prop="key"
                :label="key"
                :width="calculateSize(mockObjects[0][key], 100, 800)"
            />
            <el-table-column label="Скачать" width="150" fixed="right" >
                <template class="centered-cell" #default="scope">
                    <el-button
                        size="default"
                        @click="handleDownload(scope.$index, scope.row, scope)"
                        :icon="UploadFilled"
                        :loading-icon="Eleme"
                        :loading="tableDownloadButtons[scope.$index].loading"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-row class="m-t-15" align="middle" justify="center">
        <el-pagination
            v-model:current-page="delimetr"
            :page-size="filesOnPageCount"
            layout="prev, pager, next"
            :total="totalFilesCount"
            hide-on-single-page
        />
    </el-row>
</template>

<script setup lang="ts">
import { Search, UploadFilled, Eleme } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { API } from '@/api'
import {UploadInstance, UploadUserFile} from "element-plus";
import axios from "axios";
import {calculateSize} from "@/helpers/Utils";

const fileName = ref('')
const fileExtension = ref('')

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const fileApiActionUrl = `${import.meta.env.VITE_APP_API_URL}/upload_file/`
const fileUploading = ref(false)

const mockUploadUrl = ref('https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15')

const handleUpload = () => {
    fileUploading.value = true

    const formData = new FormData()
    fileList.value.forEach((file, id) => {
        formData.append('files', file.raw)
    })

    API.OTHER.uploadFile(formData)
        .then(response => {
            fileList.value.forEach((file, id) => {
                if (response.data[file.name].status === 'successfully') {
                    file.status = 'success'
                } else {
                    file.status = 'fail'
                }
            })
        })
        .catch(error => {
            console.error(error)
        })
        .finally(() => {
            fileUploading.value = false // TODO сделать очистку загруженных файлов и оставить ошибочные
        })
}

const clearFiles = () => {
    uploadRef.value!.clearFiles()
}

const mockObj = reactive({
    'Идентификатор': 'c5434530fs-sdas-hfdghf',
    'Название файла': 'adult-creation-date 2015-07-29',
    'Расширение файла': 'cif',
    'Содержимое файла': `# AFLOW.org Repositories
        # Ag2C4Ca1H4N4O2S4   [MCLC,MCLC1,mS84] (ST  [MCL,MCL,mP84] (STD_CONV doi:10.1016/j.commatsci.2010.05.010)
        data_Ag2C4Ca1H4N4O2S4
        _pd_phase_name Ag2C4Ca1H4N4O2S4
        _cell_length_a  7.8170943150
        _cell_length_b  23.1024398085
        _cell_length_c  8.1669723027
        _cell_angle_alpha  81.9286787941
        _cell_angle_beta  90.0000000000
        _cell_angle_gamma  90.0000000000
        _symmetry_space_group_name_H-M  'P1'
        _symmetry_Int_Tables_Number  1
        loop_
        _symmetry_equiv_pos_site_id
        _symmetry_equiv_pos_as_xyz
          1  x,y,z
        loop_
         _atom_site_label
         _atom_site_occupancy
         _atom_site_fract_x
         _atom_site_fract_y
         _atom_site_fract_z
         _atom_site_thermal_displace_type
         _atom_site_B_iso_or_equiv
         _atom_site_type_symbol`,
})

const mockKeys = reactive(Object.keys(mockObj))

const mockObjects = reactive([
    {
        'Идентификатор': 'c5434530fs-sdas-hfdghf',
        'Название файла': 'adult-creation-date 2015-07-29',
        'Расширение файла': 'cif',
        'Содержимое файла': `# AFLOW.org Repositories
        # Ag2C4Ca1H4N4O2S4   [MCLC,MCLC1,mS84] (ST  [MCL,MCL,mP84] (STD_CONV doi:10.1016/j.commatsci.2010.05.010)
        data_Ag2C4Ca1H4N4O2S4
        _pd_phase_name Ag2C4Ca1H4N4O2S4
        _cell_length_a  7.8170943150
        _cell_length_b  23.1024398085
        _cell_length_c  8.1669723027
        _cell_angle_alpha  81.9286787941
        _cell_angle_beta  90.0000000000
        _cell_angle_gamma  90.0000000000
        _symmetry_space_group_name_H-M  'P1'
        _symmetry_Int_Tables_Number  1
        loop_
        _symmetry_equiv_pos_site_id
        _symmetry_equiv_pos_as_xyz
          1  x,y,z
        loop_
         _atom_site_label
         _atom_site_occupancy
         _atom_site_fract_x
         _atom_site_fract_y
         _atom_site_fract_z
         _atom_site_thermal_displace_type
         _atom_site_B_iso_or_equiv
         _atom_site_type_symbol`,
    },
    {
        'Идентификатор': 'c5434530fs-sdas-hfdghf',
        'Название файла': 'adult-creation-date 2015-07-29',
        'Расширение файла': 'cif',
        'Содержимое файла': `# AFLOW.org Repositories
        # Ag2C4Ca1H4N4O2S4   [MCLC,MCLC1,mS84] (ST  [MCL,MCL,mP84] (STD_CONV doi:10.1016/j.commatsci.2010.05.010)
        data_Ag2C4Ca1H4N4O2S4
        _pd_phase_name Ag2C4Ca1H4N4O2S4
        _cell_length_a  7.8170943150
        _cell_length_b  23.1024398085
        _cell_length_c  8.1669723027
        _cell_angle_alpha  81.9286787941
        _cell_angle_beta  90.0000000000
        _cell_angle_gamma  90.0000000000
        _symmetry_space_group_name_H-M  'P1'
        _symmetry_Int_Tables_Number  1
        loop_
        _symmetry_equiv_pos_site_id
        _symmetry_equiv_pos_as_xyz
          1  x,y,z
        loop_
         _atom_site_label
         _atom_site_occupancy
         _atom_site_fract_x
         _atom_site_fract_y
         _atom_site_fract_z
         _atom_site_thermal_displace_type
         _atom_site_B_iso_or_equiv
         _atom_site_type_symbol`,
    },
])

mockObjects.forEach(chemicalData => {
    Object.entries(chemicalData).forEach(([key, value]) => {
        chemicalData[key] = JSON.stringify(value)
    })
})

const filesOnPageCount = ref(10)
const totalFilesCount = ref(10)
const delimetr = ref(1)

const tableDownloadButtons: Record<any, any> = ref([])
for (let i = 0; i < filesOnPageCount.value; i += 1) {
    tableDownloadButtons.value.push({loading: false})
}
const handleDownload = async (index: number, row: any, scope: any) => {
    tableDownloadButtons.value[index].loading = true;

    // TODO Загрузка файла
    await new Promise((resolve => {
        setTimeout(resolve, 2000)
    }))

    tableDownloadButtons.value[index].loading = false;

    // console.log(index, row)
    // console.log('scope', scope)
}
</script>

<style scoped>

</style>