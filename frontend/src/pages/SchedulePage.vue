<template>
  <q-page class="fit row wrap justify-center items-start content-start q-pa-md">
    <div class="q-pa-md q-gutter-sm">
        <q-btn label="Today" @click="onToday"></q-btn>
        <q-btn label="Prev" @click="onPrev"></q-btn>
        <q-btn label="Next" @click="onNext"></q-btn>
    </div>
    <QCalendarMonth ref="calendar" dark focusable hoverable animated bordered  v-model="selectedDate" :day-height="150" />
  </q-page>
</template>
<script setup>
import { ref } from 'vue';
import { QCalendarMonth, today  } from '@quasar/quasar-ui-qcalendar/dist/QCalendarMonth.esm.js';
// import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'
const calendar = ref(null);
const selectedDate = ref(today());
function onToday(){
    calendar.value.moveToToday()
};
function onPrev () {
    calendar.value.prev()
}
function onNext () {
    calendar.value.next()
};
</script>

<style src="@quasar/quasar-ui-qcalendar/dist/QCalendarDay.min.css"></style>