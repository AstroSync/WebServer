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

      <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
      >
      <q-input
          filled
          v-model="file_name"
          label="File name *"
          hint="Name of user script"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
          filled
          v-model="description"
          label="Description"
          lazy-rules
          :rules="[val => val.length < 150 || 'Max description 150 symbols']"
      />

      <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
      </q-form>

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

  const file_name = ref(null);
  const description = ref(null);
  const accept = ref(false);
  function onReset() {
      file_name.value = null
      description.value = null
      accept.value = false
  }
  function onSubmit(){
      if (accept.value !== true) {
          $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
          })
      }
      else {
          $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
          })
      }
  }
  // onReset(() => {
  //     file_name.value = null
  //     description.value = null
  //     accept.value = false
  // });
  </script>