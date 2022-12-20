<template>
    <q-page class="fit row wrap justify-center items-start content-start q-pa-md">
        <ResultsTable :results_meta="results_meta"/>
    </q-page>
</template>

<script setup>
    import ResultsTable from 'src/components/tables/ResultsTable.vue';
    import { ref, onMounted, computed } from 'vue';
    import { api } from 'src/boot/axios';
    import { useUserProfileStore } from 'stores/user-profile-store';
    const store = useUserProfileStore();
    const user = computed(() => store)
    const results_meta = ref([])
    // const scripts_meta = ref([])
    onMounted(() => {
        api
        .get(`/sessions_result/${user.value.user_id}`)
        .then((response) => {
            console.log(response);
            results_meta.value = response.data
        })
        .catch((err) => {
            console.log(err);
        })
    })
</script>