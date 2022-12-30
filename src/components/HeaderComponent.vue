<template>
  <q-header height-hint="58" reveal >
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        @click="$emit('toggleEvent')"
        aria-label="Menu"
        icon="menu"
      />

      <q-btn flat no-caps no-wrap>
        <!-- <q-icon :name="fabYoutube" color="red" size="28px" /> -->
        <q-toolbar-title shrink>
          <!-- <q-icon class="text-dark" size="lg"> -->
            <img src="~assets/logo1.png" style="width: 180px; height: 30px;" />
          <!-- </q-icon> -->
          <!-- NAKU -->
        </q-toolbar-title>
        <q-badge outline align="middle" color="teal" v-if="$q.screen.gt.xs"> Alpha v1.0.0 </q-badge>
      </q-btn>

      <q-space />

      <div class="q-gutter-sm row items-center no-wrap">
        <q-toggle
          v-model="toggle_model"
          @click="$q.dark.set(toggle_model)"
          color="green"
          icon="battery"
          label="Dark mode"
          v-if="$q.screen.gt.xs"
        />
        <q-btn v-if="$q.screen.gt.xs" dense flat>
          <div class="row items-center no-wrap">
            Docs
            <q-icon
              name="arrow_drop_down"
              size="16px"
              style="margin-left: -2px"
            />
          </div>
          <q-menu auto-close>
            <q-list dense style="min-width: 100px">
              <q-item clickable class="GL__menu-link">
                <q-item-section>Guide</q-item-section>
              </q-item>
              <q-item clickable class="GL__menu-link">
                <q-item-section>Tutorial</q-item-section>
              </q-item>
              <q-item clickable class="GL__menu-link">
                <q-item-section>Examples</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn
          round
          dense
          flat
          color="grey-8"
          icon="apps"
          v-if="$q.screen.gt.sm"
        >
          <q-tooltip>Apps</q-tooltip>
        </q-btn>

        <q-btn round dense flat color="grey-8" icon="notifications">
          <q-badge color="red" text-color="white" floating> 2 </q-badge>
          <q-tooltip>Notifications</q-tooltip>
        </q-btn>
        <q-chip clickable>
          <q-avatar rounded size="20px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div v-if="$q.screen.gt.xs">
          {{ username }}
          </div>
          <q-icon name="arrow_drop_down" size="16px" />

          <q-menu auto-close>
            <q-list dense>
              <q-item class="GL__menu-link-signed-in">
                <q-item-section>
                  <div>
                    Signed in as <strong>{{ username }}</strong>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable class="GL__menu-link">
                <q-item-section>Your profile</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable class="GL__menu-link">
                <q-item-section>Help</q-item-section>
              </q-item>
              <q-item clickable class="GL__menu-link">
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-item clickable class="GL__menu-link">
                <q-item-section @click="Logout"> Sign out ></q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-chip>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { keycloak } from 'src/boot/keycloak';
import { useUserProfileStore } from 'stores/user-profile-store';
import { useQuasar } from 'quasar';
const store = useUserProfileStore();
const toggle_model = ref(false);
const username = ref('');
const user_id = ref('');
const $q = useQuasar();
const user_ready = ref(false);
defineExpose({
    user_ready
})
function Logout() {
  keycloak.logout('/');
}
onMounted(() => {
  keycloak
    .loadUserInfo()
    .then(function (profile) {
        console.log(profile)
        store.user_id = profile.sub;
        store.name = profile.given_name;
        store.surname = profile.family_name;
        store.email = profile.email;
        store.email_verified = profile.email_verified;
        store.username = profile.preferred_username;
        username.value = profile.preferred_username;
        user_id.value = profile.sub
        user_ready.value = true
    })
    .catch(function () {
      console.log('Failed to load user profile');
    });
});
</script>
