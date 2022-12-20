<template>
  <div class="q-pa-md justify-center">
    <q-stepper
      v-model="step"
      horizontal
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
              @click="open_sessions_table"
              color="primary"
              label="Continue"
              :disable="store.sat_name === '' ? true : false"
            />
          </q-stepper-navigation>
        </div>
      </q-step>
      <q-step :name="2" title="Select sessions" icon="create_new_folder" :done="step > 2">
        <!-- An ad group contains one or more ads which target a shared set of
        keywords. -->
        <sessions-table @onSelect="onSelect" ref="session_table"/>
        <q-stepper-navigation>
          <q-btn
            @click="updateScriptTable"
            color="primary"
            label="Continue"
            :disable="session_selected.length === 0 ? true : false"
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
        <div class="q-pa-md">
            <q-file
            color="teal"
            filled
            v-model="file_model"
            label="Upload local user script"
            style="max-width: 300px"
            >
            <template v-slot:prepend>
                <q-icon name="cloud_upload" />
            </template>
            </q-file>
        </div>

        <scripts-table
            :scripts_meta="scripts_meta"
            :manage_buttons="false"
            @onSelect="(sel) => script_selected = sel"
        />
        <q-stepper-navigation>
          <q-btn label="Finish" @click="uploadHandler" color="primary"/>
          <q-btn label="Back" @click="step = 2" color="primary" flat  class="q-ml-sm"/>
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
import ScriptsTable from 'components/tables/ScriptsTable.vue';
import { useUserProfileStore } from 'stores/user-profile-store';

const user_store = useUserProfileStore();
// TODO: если получить список сеансов, а потом вернуться и изменить спутник, то можно зарегистрировать несуществующий сеанс.
const store = useRegisterSessionStore();
const scripts_meta = ref([]);
const file_model = ref(null);
const script_selected = ref([])
const session_table = ref(null);
const session_selected = ref([])
const script_id = ref(null)
const $q = useQuasar()
function showNotif (val) {
    $q.notify({
        message: val ? 'Session successfully registered' : 'There is some isues with ground station server.',
        color: val ? 'green' : 'red',
        position: 'top'
    })
}
function open_sessions_table() {
    step.value = 2;
    console.log(store)
//   if (session_table.value !== undefined){
    session_table.value.updateSessionTable();
//   }
}
function uploadHandler() {
    console.log(file_model.value);
    //   if (file_model.value != null) {
    //     var reader = new FileReader();
    //     reader.readAsText(file_model.value, 'UTF-8');
    //     reader.onload = function (evt) {
    //       register_session(evt.target.result);
    //     };
    //   }
    //   else {
    //     register_session('');
    //   }

    register_session()

    // let formData = new FormData();
    // formData.append('sat_name', store.sat_name);
    // formData.append('session_list', JSON.stringify(store.session_list));
    // formData.append('file', file_model.value);
}

function updateScriptTable(){
    step.value = 3;
    console.log(user_store.user_id)
    api
    .get(`/scripts/${user_store.user_id}`)
    .then((response) => {
        scripts_meta.value = response.data
    })
    .catch((err) => {
        console.log(err);
    })
}
function register_session() {
    console.log(script_selected.value)
    console.log(store.sat_name)
    if(Object.keys(script_selected.value).length > 0){
        console.log('script selected')
        console.log(script_selected.value)
        script_id.value = script_selected.value[0].script_id
    } else {
        script_id.value = null
    }
    api
    .post('/schedule/register_sessions',
    session_selected.value.map((session) => ({
        user_id: user_store.user_id,
        username: user_store.username,
        script_id: script_id.value,
        sat_name: store.sat_name,
        priority: 1,
        start: new Date(session.start_time.replace('\n', ' ')),
        duration_sec: session.duration_sec,
    })),
    // [{
    //     user_id: user_store.user_id,
    //     username: user_store.username,
    //     script_id: script_id.value,
    //     sat_name: store.sat_name,
    //     priority: 1,
    //     start: new Date(session_selected.value[0].start_time.replace('\n', ' ')),
    //     duration_sec: session_selected.value[0].duration_sec,
    // }],
    {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
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
function onSelect(selected){
    session_selected.value = selected
    console.log(session_selected.value)
}
const step = ref(1);
</script>
