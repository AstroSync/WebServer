<template>
    <div v-if="store" class="q-pa-md justify-center">
        <ScheduledSessions :sessions_meta="sessions_meta" @onDelete="onDelete"/>
    </div>
    <div class="q-pa-md justify-center">
        <ScriptsTable :scripts_meta="scripts_meta" :manage_buttons="false" :extra_columns="true"/>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { api } from 'src/boot/axios';
    import ScheduledSessions from 'src/components/tables/ScheduledSessions.vue';
    import ScriptsTable from 'components/tables/ScriptsTable.vue';
    import { useUserProfileStore } from 'stores/user-profile-store';
    const store = useUserProfileStore();
    const user = computed(() => store)
    const sessions_meta = ref([])
    const scripts_meta = ref([])
    function onDelete(session){
        console.log(session)
        // api
        // .get(`/scripts/${session.user_id}`)
        // .then((scripts_response) => {
        //     console.log(scripts_response);
        //     scripts_meta.value = scripts_response.data
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
    }
    onMounted(() => {
        api
        .get(`/scripts/${user.value.user_id}`)
        .then((scripts_response) => {
            console.log(scripts_response);
            scripts_meta.value = scripts_response.data
        })
        .catch((err) => {
            console.log(err);
        })
        api
        .get(`/celery/scheduled_tasks/${user.value.user_id}`)
        .then((tassks_response) => {
            console.log(tassks_response);
            // scripts_response.data.foreach((script) => script_name.push(script.script_name) if(script.script_id in ))
            sessions_meta.value = tassks_response.data
            // rows.value = response.data;
        })
        .catch((err) => {
            console.log('error');
            console.log(err);
        });
    })
</script>