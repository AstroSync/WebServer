<template>
  <q-table
    class="available_sat_table"
    title="List of active satellite"
    style="height: 600px; min-width: 300px"
    selection="single"
    v-model:selected="selected"
    :rows="rows"
    :columns="columns"
    row-key="name"
    virtual-scroll
    :rows-per-page-options="[0]"
    :filter="filter"
    no-data-label="I didn't find anything for you"
    no-results-label="The filter didn't uncover any results"
    @update:selected="
      (val) =>
        val.length > 0 ? (store.sat_name = val[0].name) : (store.sat_name = '')
    "
  >
    <template v-slot:top-right>
      <div class="col-3">
        <q-input dense debounce="400" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </template>
  </q-table>
  <!-- <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div> -->
</template>

<script setup>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useRegisterSessionStore } from 'stores/register-session-store';
const store = useRegisterSessionStore();
const selected = ref([]);
const filter = ref('');
const rows = ref([]);
const columns = ref([
  {
    name: 'name',
    required: true,
    label: 'Sat name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'OBJECT_ID',
    align: 'center',
    label: 'ID',
    field: 'OBJECT_ID',
    sortable: true,
  },
  {
    name: 'NORAD_CAT_ID',
    align: 'center',
    label: 'Norad cat. id',
    field: 'NORAD_CAT_ID',
    sortable: true,
  },
]);

api
  .get('/satellites')
  .then((response) => {
    rows.value = response.data;
  })
  .catch((err) => {
    console.log('error');
    console.log(err);
  });
</script>

<style lang="sass">
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
</style>
