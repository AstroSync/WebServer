<template>
    <q-page class="fit row wrap justify-center items-start content-start q-pa-md">
        <StepperWidget/>
        <!-- <link v-if="run_py_script" rel="stylesheet" href="https://pyscript.net/latest/pyscript.css" />
        <py-script v-if="run_py_script"> display('hello world')</py-script> -->
    </q-page>
</template>
<script setup>
import StepperWidget from 'src/components/StepperWidget.vue';
// import PyScript from 'https://pyscript.net/latest/pyscript.js';
// import { ref } from 'vue';
// const run_py_script = ref(false);

</script>