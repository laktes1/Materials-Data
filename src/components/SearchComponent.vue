<template>
    <el-collapse class="collapse-container">
        <el-collapse-item
            v-for="key in Object.keys(structure)"
            :name="key"
        >
            <template #title>
                <h3> {{ key }} </h3>
            </template>
            <el-row :gutter="25" class="m-t-15" align="middle">
                <el-col :span="4">
                    <p>Поле</p>
                </el-col>
                <el-col :span="20">
                    <el-input
                        v-model="structure[key]"
                        clearable
                        placeholder="Значение..."
                    />
                </el-col>
            </el-row>
        </el-collapse-item>
    </el-collapse>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue'

const props = defineProps({
    structure: {
        type: Object,
        required: true
    }
})

const { structure } = toRefs(props)
</script>

<style scoped>

</style>