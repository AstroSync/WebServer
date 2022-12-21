<template>
  <q-layout view="hHh Lpr fFf">
    <header-component @toggle-event="toggleLeftDrawer" ref="header_widget"/>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" v-ripple clickable @click="router.push(link.path)">
            <q-item-section avatar >
              <q-icon color="grey" :name="link.icon"/>
            </q-item-section>
            <q-item-section >
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links2" :key="link.text" v-ripple clickable>

            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container v-if="header_widget">
      <router-view v-if="header_widget.user_ready"/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import HeaderComponent from 'src/components/HeaderComponent.vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const leftDrawerOpen = ref(false);
const header_widget = ref(null)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const links1 = [
  { icon: 'dashboard', text: 'Dashboard', path: 'dashboard' },
  { icon: 'data_object', text: 'Code Editor', path: 'code_editor' },
  { icon: 'satellite_alt', text: 'Map Viewer', path: 'map_viewer' },
  { icon: 'edit_calendar', text: 'Register Sat Session', path: 'register_session' },
  { icon: 'restore', text: 'Sessions History', path: 'sessions_history' },
  { icon: 'terminal', text: 'Terminal', path: 'terminal' },
  { icon: 'calendar_month', text: 'Schedule', path: 'schedule' },
  { icon: 'view_in_ar', text: 'Parser Constructor', path: 'parser_constructor' },
];
const links2 = [
  { icon: 'account_circle', text: 'Profile' },
  { icon: 'settings', text: 'Settings' },
  { icon: 'help', text: 'Help' },
  { icon: 'info', text: 'About' },
];
</script>

<style lang="sass">

</style>
