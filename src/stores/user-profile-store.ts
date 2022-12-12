import { defineStore } from 'pinia';

export const useUserProfileStore = defineStore('user_profile', {
  state: () => ({
    user_id: '',
    name: '',
    surname: '',
    username: '',
    email: '',
    email_verified: false,
  }),
});
