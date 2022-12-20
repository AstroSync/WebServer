<template>
    <div class="q-gutter-md">
        <q-table
            title="My scheduled tasks"
            style="max-height: 500px;"
            :rows="rows"
            :columns="columns"
            row-key="sat_name"
            virtual-scroll
            no-data-label="You don't have any scheduled task."
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
                    <q-th auto-width />
                </q-tr>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                        style="white-space: pre-line"
                        auto-width
                    >
                        {{ col.value }}
                    </q-td>
                    <q-td auto-width>
                        <q-btn v-if="props.row.script_id"
                            flat
                            :icon="matContentPaste"
                            size="1rem"
                            @click="$emit('onShowScript', props.row)"/>
                        <q-btn v-else
                            flat
                            :icon="matContentPasteOff"
                            size="1rem"
                            @click="$emit('onAddScript', props.row)"/>
                    </q-td>
                    <q-td auto-width>
                        <q-btn flat :icon="matDelete" size="1rem" @click="$emit('onDelete', props.row)"/>
                    </q-td>
                </q-tr>
                <!-- Выпадающий блок -->
                <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                        <div class="text-left"
                             style="white-space: pre-line; word-wrap: break-all; text-overflow:ellipsis; max-width: 400px;">
                            {{ props.row.description }}
                        </div>
                    </q-td>
                </q-tr>
            </template>
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
import { matContentPaste, matContentPasteOff, matDelete  } from '@quasar/extras/material-icons';

const table_props = defineProps(['sessions_meta'])
const filter = ref('');
const columns = ref([
        {
            name: 'sat_name',
            required: true,
            label: 'Sat Name',
            align: 'left',
            field: 'sat_name',
            sortable: true
        },
        {
            name: 'start',
            align: 'left',
            label: 'Start time',
            field: 'start',
            sortable: true
        },
        {
            name: 'duration_sec',
            align: 'left',
            label: 'Duration, sec',
            field: 'duration_sec',
            sortable: true,
        },
        {
            name: 'registration_time',
            align: 'left',
            label: 'Registration time',
            field: 'registration_time',
            sortable: true
        },
        {
            name: 'priority',
            align: 'left',
            label: 'Priority',
            field: 'priority',
            sortable: true
        },

    ]);

const rows = computed(() => table_props.sessions_meta);

</script>

