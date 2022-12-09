import { defineStore } from 'pinia';

interface TimeRange {
  start: string;
  finish: string;
  priority: number;
}

interface Session {
  username: string;
  station: string;
  sat_name: string;
  session_list: TimeRange[];
}

export const useRegisterSessionStore = defineStore('register_session', {
  state: (): Session => ({
    username: '',
    station: '',
    sat_name: '',
    session_list: [],
  }),
});
