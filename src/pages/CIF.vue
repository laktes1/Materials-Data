<template>
    <file-type-component :file-type="fileTypes.CIF"></file-type-component>
</template>

<script setup lang="ts">
import {fileTypes} from "@/types/enums";
import FileTypeComponent from "@/components/fileTypeComponent.vue";
</script>
