<template>
    <div class="q-pa-md">
        <div class="justify-center row items-stretch">
            <div class="q-ma-md col-8" style="min-width: 400px; max-width: 1000px;">
                <codemirror
                    v-model="code"
                    placeholder="Code goes here..."
                    style="height: 600px;"
                    :autofocus="true"
                    :indent-with-tab="true"
                    :tab-size="4"
                    :extensions="extensions"
                />
                <!--@ready="log('ready', $event)"
                    @change="log('change', $event)"
                    @focus="log('focus', $event)"  -->
                <div
                    class="q-pa-md text-block"
                    style="background-color: #282c34; color: #EEEEEE; white-space: pre-line"
                >
                    Linter result: {{ pylint_result }}
                </div>
            </div>
            <div class="q-pa-md">
                <div class="q-pa-md">
                    <q-form
                        @submit="onSubmit"
                        @reset="onReset"
                        class="col-1 offset-md-3"
                    >
                        <q-input
                            filled
                            v-model="file_name"
                            label="File name *"
                            lazy-rules
                            :rules="[
                                val => val && val.length > 0 || 'Please type something',
                                val => val && val.length < 15 || 'Script name length should be less 15 symbols',
                                val => val && /^[0-9a-zA-Z-_ ... ]+$/.test(val) || 'Script name should not contain special symbols' ]"
                        />

                        <q-input
                            filled
                            v-model="description"
                            autogrow
                            label="Description"
                            lazy-rules
                            :rules="[val => val.length >= 0 && val.length < 150 || 'Max description 150 symbols']"
                        />
                        <div>
                            <q-btn :icon="matCloudUpload" label="Save" type="submit" color="primary"/>
                            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                        </div>
                    </q-form>
                </div>
                <div class="q-ma-md">
                    <scripts-table
                        :scripts_meta="scripts_meta"
                        :manage_buttons="true"
                        @onDelete="onDelete"
                        @onDownload="onDownload"
                    />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import ScriptsTable from 'components/tables/ScriptsTable.vue';
    import { Codemirror } from 'vue-codemirror';
    import { python } from '@codemirror/lang-python';
    import { oneDark } from '@codemirror/theme-one-dark';
    import { matCloudUpload } from '@quasar/extras/material-icons';
    import { useQuasar } from 'quasar'
    import { api } from 'src/boot/axios';
    import { keycloak } from 'src/boot/keycloak';
    import { useUserProfileStore } from 'stores/user-profile-store';
    // import axios from 'axios';
    const store = useUserProfileStore();
    const $q = useQuasar()
    const code = ref('');
    const extensions = ref([python(), oneDark]);
    // const log = ref(console.log);
    const file_name = ref(null);
    const description = ref('');
    const scripts_meta = ref([]);
    const pylint_result = ref('');
    const user_id = ref(null);

    function onReset() {
        file_name.value = null
        description.value = ''
    }
    function onSubmit(){
        if (code.value.length > 0) {
            var blob = new Blob([code.value], { type: 'text/plain' });
            const formData  = new FormData();
            formData.append('user_script', blob, file_name.value)

            api
            .post(`/save_script?user_id=${store.user_id}&script_name=${file_name.value}&description=${description.value}`,
                formData,
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            .then((response) => {
                console.log(response)
                pylint_result.value = response.data.result
                console.log(response.data);
                if(response.data.errors == 0){
                    $q.notify({
                        color: 'green-4',
                        textColor: 'white',
                        icon: 'cloud_done',
                        message: 'Your scripts successfully saved.',
                        position: 'top'
                    })
                    updateScriptTable(user_id.value)
                }
                $q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'warning',
                    message: `Linter has found ${response.data.errors} errors in your script.`,
                    position: 'top'
                })
            })
            .catch((err) => {
                console.log(err);
                $q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'warning',
                    message: 'Save script failed',
                    position: 'top'
                })
            })
        } else {
            $q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: 'Script can not be empty!',
                position: 'top'
            })
        }

    }
    // onReset(() => {
    //     file_name.value = null
    //     description.value = null
    //     accept.value = false
    // });
    function onDelete(script){
        // axios.delete('http://localhost:8080/delete_script', )
        api
        .delete('/delete_script', {params: {'script_id': script.script_id}, headers: {'accept': 'application/json'}})
        .then((response) => {
            console.log(response.data)
            scripts_meta.value = scripts_meta.value.filter((el) => el.script_id != script.script_id)
        })
        .catch((err) => {
            console.log(err);
        })
    }
    function onDownload(script){
        api
        .get(`/download_script/${script.script_id}`, {headers: {'accept': 'text/plain', 'Content-type': 'text/plain'}})
        .then((response) => {
            code.value = response.data
            file_name.value = script.script_name
            description.value = script.description
        })
        .catch((err) => {
            console.log(err);
        })
    }
    function updateScriptTable(user_id){
        api
        .get(`/scripts/${user_id}`)
        .then((response) => {
            scripts_meta.value = response.data
        })
        .catch((err) => {
            console.log(err);
        })
    }
    onMounted(() => {
        keycloak
        .loadUserInfo()
        .then(function (profile) {
            user_id.value = profile.sub
            updateScriptTable(profile.sub)
        })
        .catch(function () {
            console.log('Failed to load user profile');
        });
    })
</script>
