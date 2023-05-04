<template>
    <el-collapse class="collapse-container">
        <el-collapse-item
            v-for="key in Object.keys(props.structure)"
            :title="key"
            :name="key"
        >
            <el-row :gutter="25" class="m-t-15" align="middle">
                <el-col :span="4">
                    <h4>Поле</h4>
                </el-col>
                <el-col :span="20">
                    <el-input
                        v-model="props.structure[key]"
                        clearable
                        placeholder="Значение..."
                    />
                </el-col>
            </el-row>
        </el-collapse-item>
    </el-collapse>
</template>

<script setup>
const props = defineProps({
    structure: {
        type: Object,
        required: true
    },
})
</script>

<style scoped>

</style>