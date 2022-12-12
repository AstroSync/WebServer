import { defineStore } from 'pinia';

interface Session {
  username: string;
  station: string;
  sat_name: string;
  start_time: string;
  duration_sec: number;
}

export const useRegisterSessionStore = defineStore('register_session', {
  state: (): Session => ({
    username: '',
    station: '',
    sat_name: '',
    start_time: '',
    duration_sec: 0,
  }),
});
