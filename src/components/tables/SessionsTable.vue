<template>
    <div class="q-gutter-md">
        <q-table

            :title="`Sessions for ${store.sat_name}`"
            style="height: 600px"
            :selected-rows-label="getSelectedString"
            selection="multiple"
            v-model:selected="selected"
            :rows="rows"
            row-key="start_time"
            :columns="columns"
            virtual-scroll
            :rows-per-page-options="[0]"
            @update:selected="$emit('onSelect', selected)"
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        <q-checkbox v-model="props.selected" color="primary" />
                    </q-td>
                    <q-td key="status" :props="props">
                        <q-badge color="green">
                            {{ props.row.status }}
                        </q-badge>
                    </q-td>
                    <q-td auto-width key="start_time" :props="props" style="white-space: pre-line">
                        {{ props.row.start_time}}
                    </q-td>
                    <!-- <q-td key="finish_time" :props="props">
                    {{ props.row.finish_time }}
                    </q-td> -->
                    <q-td key="duration" :props="props">
                        {{ props.row.duration_sec }}
                    </q-td>
                    <!-- <q-td key="station" :props="props">
                    {{ props.row.station }}
                    </q-td> -->
                </q-tr>
            </template>
            <template v-slot:top-right>
                <div class="q-gutter-md">
                    <q-field
                    filled
                    label="Search period"
                    stack-label
                    class="cursor-pointer"
                    bottom-slots
                    v-model="date_model"
                    :rules="[(val) => !!val || 'Field is required']"
                    >
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-date
                            v-model="date_model"
                            today-btn
                            :mask="date_format"
                            @update:model-value="modelUpdated"
                            range
                            :options="
                                (d) =>
                                d >= date.formatDate(Date.now(), 'YYYY/MM/DD') &&
                                d <= date.formatDate(
                                    date.addToDate(Date.now(), { months: 1 }),
                                    'YYYY/MM/DD'
                                    )"
                            >
                            </q-date>
                        </q-popup-proxy>
                    <template v-slot:control>
                        {{ date_string(date_model) }}
                    </template>
                    <template #append>
                        <q-icon name="event" class="cursor-pointer"> </q-icon>
                    </template>
                    </q-field>
                </div>
            </template>
        </q-table>
    </div>
  <!-- <div class="q-mt-md">Selected: {{ (selected) }}</div> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { date } from 'quasar';
import { useRegisterSessionStore } from 'stores/register-session-store';
import { keycloak } from 'src/boot/keycloak';
const store = useRegisterSessionStore();
const date_format = ref('YYYY-MM-DD');
// const date_format = ref('DD.MM.YYYY');

onMounted(() => {
    updateSessionTable()
//   console.log(keycloak.token);
    console.log(keycloak);
  // api_test
  //   .get('/protected', {
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: 'Bearer ' + keycloak.token,
  //     },
  //   })
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch(() => {
  //     console.log('error');
  //   });
});
defineExpose({
    updateSessionTable,
});
function updateSessionTable() {
    selected.value = []
    modelUpdated(date_model.value)
}
function modelUpdated(val) {
  if (val !== null) {
    var req_str = '';
    if (typeof val === 'string') {
      req_str = `/sessions?sat_name=${store.sat_name}&start_date=${val}&end_date=${val}`;
    } else if (typeof val === 'object') {
      req_str = `/sessions?sat_name=${
        store.sat_name
      }&start_date=${date.formatDate(date_model.value.from,'YYYY-MM-DD')
    }&end_date=${date.formatDate(date_model.value.to, 'YYYY-MM-DD')}`;
    }
    api
      .get(req_str)
      .then((response) => {
        console.log(response)
        rows.value = response.data;
      })
      .catch(() => {
        console.log('error');
      });
  }
}
function getSelectedString() {
  return selected.value.length === 0
    ? ''
    : `${selected.value.length} record${
        selected.value.length > 1 ? 's' : ''
      } selected of ${rows.value.length}`;
}
const selected = ref([]);
const date_string = ref((val) => {
  if (val === null) {
    return '';
  }
  switch (typeof val) {
    case 'object':
      return val.from + ' - ' + val.to;
    case 'string':
      return val + ' - ' + val;
    default:
      return '';
  }
});
const date_model = ref({
  from: date.formatDate(new Date(), date_format.value),
  to: date.formatDate(new Date(), date_format.value),
});

const rows = ref([]);
const columns = ref([
  {
    name: 'status',
    align: 'center',
    label: 'Status',
    field: 'status',
    sortable: true,
  },
  {
    name: 'start_time',
    required: true,
    label: 'Start Time',
    align: 'left',
    field: 'start_time',
    sortable: true,
  },
//   {
//     name: 'finish_time',
//     align: 'center',
//     label: 'Finish Time',
//     field: 'finish_time',
//     sortable: true,
//   },
  {
    name: 'duration',
    align: 'center',
    label: 'Duration, sec',
    field: 'duration_sec',
    sortable: true,
  },
//   {
//     name: 'station',
//     align: 'center',
//     label: 'Station',
//     field: 'station',
//     sortable: true,
//   },
]);
</script>

<!-- <style lang="sass">
.available_sat_table
  height: 310px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 600px
  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style> -->
