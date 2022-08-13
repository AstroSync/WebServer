import { defineStore } from 'pinia';

export const useRegisterSessionStore = defineStore('register_session', {
  state: () => ({
    sat_name: '',
    session_list: [],
  }),
});
