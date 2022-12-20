<template>
    <div class="q-ma-md col-8" style="min-width: 400px; max-width: 1000px;">
        <codemirror
            v-model="code"
            placeholder="Code goes here..."
            style="height: 600px;"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="4"
            :extensions="extensions"
        />
        <!--@ready="log('ready', $event)"
            @change="log('change', $event)"
            @focus="log('focus', $event)"  -->
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { Codemirror } from 'vue-codemirror';
    import { python } from '@codemirror/lang-python';
    import { oneDark } from '@codemirror/theme-one-dark';
    const code = ref('');
    const extensions = ref([python(), oneDark]);
</script>