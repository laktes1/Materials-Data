<template>
    <div>
        <canvas id="smiles-canvas"></canvas>
    </div>
</template>

<script setup>
import {SmiDrawer} from 'smiles-drawer';
import { defineProps, watch } from 'vue';

const props = defineProps({
    smilesCode: {
        type: String,
        required: true,
    },
    sizes: {
        width: {
            type: Number
        },
        height: {
            type: Number
        }
    }
})


watch(() => props.smilesCode, (newValue, oldValue) => {
    // settings - https://github.com/reymond-group/smilesDrawer#readme
    let moleculeOptions = {
        width: props?.sizes?.width || 600,
        height: props?.sizes?.height || 600,
        compactDrawing: false,
        bondThickness: 1,
        experimental: true,
        terminalCarbons: true,
        explicitHydrogens: true,
    };
    let reactionOptions = {};

    let sd = new SmiDrawer(moleculeOptions, reactionOptions);

    sd.draw(`${props.smilesCode}`, '#smiles-canvas')
})
</script>

<style scoped>

</style>