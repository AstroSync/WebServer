<template>
    <div class="q-gutter-md">
        <q-table
            title="My scripts"
            style="max-height: 500px;"
            :rows="rows"
            :columns="columns"
            row-key="script_name"
            virtual-scroll
            no-data-label="There are no scripts for this user."
            :filter="filter"
            :rows-per-page-options="[0]"
            selection="single"
            v-model:selected="selected"
            @update:selected="$emit('onSelect', selected)"
        >
            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th auto-width />
                    <q-th
                        :key="props.cols[0].name"
                        :props="props"
                    >
                        {{ props.cols[0].label }}
                    </q-th>
                    <q-th
                        :key="props.cols[1].name"
                        :props="props"
                    >
                        {{ props.cols[1].label }}
                    </q-th>
                    <q-th
                        v-if="table_props.extra_columns === true"
                        :key="props.cols[2].name"
                        :props="props"
                    >
                        {{ props.cols[2].label }}
                    </q-th>
                    <q-th
                        v-if="table_props.extra_columns === true"
                        :key="props.cols[3].name"
                        :props="props"
                    >
                        {{ props.cols[3].label }}
                    </q-th>
                    <q-th auto-width />
                </q-tr>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td v-show="table_props.manage_buttons == false">
                        <q-checkbox v-model="props.selected" color="primary" />
                    </q-td>
                    <q-td auto-width v-show="table_props.manage_buttons == true">
                        <q-btn flat :icon="matCloudDownload" size="1rem" @click="$emit('onDownload', props.row)"/>
                    </q-td>

                    <q-td :key="props.cols[0].name" :props="props">
                        {{ props.cols[0].value }}
                    </q-td>

                    <q-td :key="props.cols[1].name" :props="props">
                        {{ props.cols[1].value.length < 15 ? props.cols[1].value : props.cols[1].value.substring(0,15) + "..."}}
                        <q-btn
                            v-show="props.cols[1].value.length >= 15"
                            size="sm" color="primary" round dense
                            @click="props.expand = !props.expand"
                            :icon="props.expand ? 'remove' : 'add'"
                        />
                    </q-td>

                    <q-td
                        v-show="table_props.extra_columns === true"
                        :key="props.cols[2].name"
                        :props="props"
                        style="white-space: pre-line"
                        auto-width
                    >
                        {{ props.cols[2].value }}
                    </q-td>

                    <q-td
                        v-show="table_props.extra_columns === true"
                        :key="props.cols[3].name"
                        :props="props"
                        style="white-space: pre-line"
                        auto-width
                    >
                        {{ props.cols[3].value }}
                    </q-td>

                    <q-td auto-width v-show="table_props.manage_buttons == true">
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
import { matCloudDownload } from '@quasar/extras/material-icons';
import { matDelete } from '@quasar/extras/material-icons';

const table_props = defineProps(['scripts_meta', 'manage_buttons', 'extra_columns'])
const filter = ref('');
const selected = ref([]);
const columns = ref([
        {
            name: 'script_name',
            required: true,
            label: 'Name',
            align: 'left',
            field: 'script_name',
            sortable: true
        },
        {
            name: 'description',
            align: 'left',
            label: 'Description',
            field: 'description'
        },
        {
            name: 'upload_date',
            align: 'left',
            label: 'Creation date',
            field: 'upload_date'
        },
        {
            name: 'last_edited_date',
            align: 'left',
            label: 'Last edited date',
            field: 'last_edited_date'
        }
    ]);

const rows = computed(() => table_props.scripts_meta);

</script>

