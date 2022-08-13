import { defineStore } from 'pinia';

export const useUserProfileStore = defineStore('user_profile', {
  state: () => ({
    name: '',
    surname: '',
    username: '',
    email: '',
    email_verified: false,
  }),
});
