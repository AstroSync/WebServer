<template>
  <q-page class="justify-center items-start content-start q-pa-md">
    <codemirror
      v-model="code"
      placeholder="Code goes here..."
      style="height: 600px;"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="4"
      :extensions="extensions"
      @ready="log('ready', $event)"
      @change="log('change', $event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
    />
  </q-page>
</template>
<script setup>
import { ref } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
const code = ref('import time');
const extensions = ref([python(), oneDark]);
const log = ref(console.log);
</script>