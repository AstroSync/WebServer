<template>
    <div class="q-gutter-md">
        <q-table
            title="My sessions"
            :grid="$q.screen.lt.md"
            style="max-height: 1200px;"
            :rows="rows"
            :columns="columns"
            row-key="start_time"
            virtual-scroll
            no-data-label="There are no scripts for this user."
            :filter="filter"
            :rows-per-page-options="[0]"
        >
            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                    >
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td
                        :key="props.cols[0].name"
                        :props="props"
                        style="white-space: pre-line"
                        auto-width
                    >
                    <q-badge color="green">
                        {{ props.cols[0].value }}
                    </q-badge>

                    </q-td>
                    <q-td
                        :key="props.cols[1].name"
                        :props="props"
                        style="white-space: pre-line; font-weight: bold;"
                    >
                        {{ props.cols[1].value }}
                    </q-td>
                    <q-td
                        :key="props.cols[2].name"
                        :props="props"
                        style="white-space: pre-line"
                        auto-width
                    >
                        {{ props.cols[2].value }}
                    </q-td>
                    <q-td
                        :key="props.cols[3].name"
                        :props="props"
                        style="white-space: pre-line"
                        auto-width
                    >
                        {{ props.cols[3].value }}
                    </q-td>
                    <q-td
                        :key="props.cols[4].name"
                        :props="props"
                        style="white-space: pre-line"
                        auto-width
                    >
                        {{ props.cols[4].value }}
                    </q-td>
                    <q-td
                        :key="props.cols[5].name"
                        :props="props"
                        style="white-space: pre-line"
                        auto-width
                    >
                        {{ props.cols[5].value }}
                    </q-td>
                    <q-td
                        :key="props.cols[6].name"
                        :props="props"
                        style="white-space: pre-line"

                    >
                        {{ props.cols[6].value }}
                        <q-btn
                            v-show="props.cols[6].value.length >= 15"
                            size="sm" color="primary" round dense
                            @click="props.expand = !props.expand"
                            :icon="props.expand ? 'remove' : 'add'"
                        />
                    </q-td>
                    <q-td
                        :key="props.cols[7].name"
                        :props="props"
                        style="white-space: pre-line"
                        auto-width
                    >
                        {{ props.cols[7].value }}
                    </q-td>


                    <q-td auto-width>
                        <q-btn v-if="props.row.script_id"
                            flat
                            :icon="matContentPaste"
                            size="1rem"
                            @click="$emit('onDelete', props.row)"/>
                        <q-btn v-else
                            flat
                            :icon="matContentPasteOff"
                            size="1rem"
                            @click="$emit('onDelete', props.row)"/>
                    </q-td>
                </q-tr>
                <!-- Выпадающий блок -->
                <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                        <div class="text-left"
                             style="white-space: pre-line; word-wrap: break-all; text-overflow:ellipsis; max-width: 400px;">
                            {{ props.row.result.toString() }}
                        </div>
                    </q-td>
                </q-tr>
            </template>
            <!-- Searching -->
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
    </div>
  <!-- <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div> -->
</template>

<script setup>
import { ref, computed } from 'vue';
import { matContentPaste, matContentPasteOff  } from '@quasar/extras/material-icons';
import { useQuasar } from 'quasar'
const $q = useQuasar();
const table_props = defineProps(['results_meta'])
const filter = ref('');

const columns = ref([
        {
            name: 'status',
            required: true,
            label: 'Status',
            align: 'left',
            field: 'status',
            sortable: true
        },
        {
            name: 'sat_name',
            required: true,
            label: 'Sat Name',
            align: 'left',
            field: 'sat_name',
            sortable: true
        },
        {
            name: 'registration_time',
            align: 'left',
            label: 'Registration time',
            field: 'registration_time',
            sortable: true
        },
        {
            name: 'start_time',
            align: 'left',
            label: 'Start time',
            field: 'start_time',
            sortable: true

        },
        {
            name: 'duration_sec',
            align: 'left',
            label: 'Duration, sec',
            field: 'duration_sec',
            sortable: true
        },
        {
            name: 'priority',
            align: 'left',
            label: 'Priority',
            field: 'priority',
            sortable: true
        },
        {
            name: 'result',
            align: 'left',
            label: 'Result',
            format: (val) => val.toString().length < 15 ? `[${val.toString()}]` : `[${val.toString().substring(0,15) + '...'}]`,
            field: 'result'
        },
        {
            name: 'traceback',
            align: 'left',
            label: 'Traceback',
            format: (val) => val.length < 15 ? val : val.substring(0,15) + '...',
            field: 'traceback'
        },
    ]);

const rows = computed(() => table_props.results_meta);

</script>

