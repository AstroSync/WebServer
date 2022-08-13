<template>
  <div class="row">
    <div class="col-auto">
      <q-tabs v-model="tab" vertical class="text-teal">
        <q-tab name="mails" icon="mail" label="Mails" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
        <q-tab name="code_editor" icon="movie" label="Code Editor" />
      </q-tabs>
    </div>

    <div class="col">
      <q-tab-panels v-model="tab">
        <q-tab-panel name="mails">
          <stepper-widget />
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <!-- <div class="text-h4 q-mb-md">Alarms</div> -->
          <!-- <q-calendar-month /> -->
        </q-tab-panel>

        <q-tab-panel name="code_editor">
          <user-terminal />
          <!-- <code-editor :languages="[['python', 'Python']]" /> -->
          <!-- <D3Chart /> -->
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { onMounted } from 'vue';
import UserTerminal from 'components/UserTerminal';
import StepperWidget from 'components/StepperWidget.vue';
// import CodeEditor from 'simple-code-editor';
// import Plotly from 'components/plotly_chart.vue';
// import { QCalendarMonth } from '@quasar/quasar-ui-qcalendar/dist/QCalendarMonth.esm.js';
// import D3Chart from './D3Chart.vue';
const tab = ref('mails');
</script>
