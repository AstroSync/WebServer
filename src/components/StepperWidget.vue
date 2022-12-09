<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      vertical
      style="min-width: 500px"
      alternative-labels
      color="primary"
      animated
      keep-alive
    >
      <q-step
        :name="1"
        title="Select satellite"
        icon="settings"
        :done="step > 1"
      >
        <!-- For each ad campaign that you create, you can control how much you're
        willing to spend on clicks and conversions, which networks and
        geographical locations you want your ads to show on, and more. -->
        <div class="q-pa-md">
          <available-sats />

          <q-stepper-navigation>
            <q-btn
              @click="step = 2"
              color="primary"
              label="Continue"
              :disable="store.sat_name === '' ? true : false"
            />
          </q-stepper-navigation>
        </div>
      </q-step>
      <q-step
        :name="2"
        title="Select sessions"
        icon="create_new_folder"
        :done="step > 2"
      >
        <!-- An ad group contains one or more ads which target a shared set of
        keywords. -->
        <sessions-table />
        <q-stepper-navigation>
          <q-btn
            @click="step = 3"
            color="primary"
            label="Continue"
            :disable="store.session_list.length === 0 ? true : false"
          />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Upload user script" icon="add_comment">
        <q-file
          color="teal"
          filled
          v-model="file_model"
          label="User script"
          style="max-width: 300px"
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
        <q-stepper-navigation>
          <q-btn color="primary" label="Finish" v-on:click="uploadHandler" />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar'
import AvailableSats from 'components/tables/AvailableSats.vue';
import SessionsTable from 'components/tables/SessionsTable.vue';
import { useRegisterSessionStore } from 'stores/register-session-store';
import qs from 'qs';

// TODO: если получить список сеансов, а потом вернуться и изменить спутник, то можно зарегистрировать несуществующий сеанс.
const store = useRegisterSessionStore();
const file_model = ref(null);
const $q = useQuasar()
function showNotif (val) {
  $q.notify({
    message: val ? 'Session successfully registered' : 'There is some isues with ground station server.',
    color: val ? 'green' : 'red'
  })
}
function uploadHandler() {
  console.log(file_model.value);
  if (file_model.value != null) {
    var reader = new FileReader();
    reader.readAsText(file_model.value, 'UTF-8');
    reader.onload = function (evt) {
      register_session(evt.target.result);
    };
  } else {
    register_session('');
  }
  // let formData = new FormData();
  // formData.append('sat_name', store.sat_name);
  // formData.append('session_list', JSON.stringify(store.session_list));
  // formData.append('file', file_model.value);
}

function register_session(script) {
    api
    .post('/register_new_session',
    qs.parse({
      sat_name: store.sat_name,
      session_list: store.session_list,
      user_script: script,
    }),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  .then((response) => {
    console.log(response);
    showNotif(true)
    step.value = 1;
  })
  .catch((error) => {
    console.log(error);
    showNotif(false)
  });
}
const step = ref(1);
</script>
