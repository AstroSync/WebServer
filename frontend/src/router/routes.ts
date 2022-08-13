import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: () => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: '/register_session'}
    },
    children: [
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'code_editor', component: () => import('pages/CodeEditorPage.vue') },
      { path: 'map_viewer', component: () => import('pages/MapViewerPage.vue') },
      { path: 'register_session', component: () => import('pages/RegisterSessionPage.vue') },
      { path: 'sessions_history', component: () => import('pages/SessionsHistoryPage.vue') },
      { path: 'terminal', component: () => import('pages/TerminalPage.vue') },
      { path: 'schedule', component: () => import('pages/SchedulePage.vue') },
      { path: 'parser_constructor', component: () => import('pages/ParserConstructorPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
