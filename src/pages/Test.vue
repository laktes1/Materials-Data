<template>
    <h1>TEST</h1>
    <canvas id="smiles-canvas"></canvas>
</template>

<script setup>
import {SmiDrawer} from 'smiles-drawer';
import {onMounted} from 'vue';

onMounted(() => {
    // settings - https://github.com/reymond-group/smilesDrawer#readme
    let moleculeOptions = {
        width: 500,
        height: 500,
        compactDrawing: true,
        bondThickness: 1,
        experimental: true,
        terminalCarbons: true,
        explicitHydrogens: true,

    };
    let reactionOptions = {};

    let sd = new SmiDrawer(moleculeOptions, reactionOptions);
    sd.draw('OC(C(=O)O[C@H]1C[N+]2(CCCOC3=CC=CC=C3)CCC1CC2)(C1=CC=CS1)C1=CC=CS1', '#smiles-canvas')

})
</script>

<style scoped>

</style>