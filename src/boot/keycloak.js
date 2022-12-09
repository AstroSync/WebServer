import { boot } from 'quasar/wrappers';
import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  //   url: `https://${process.env.AUTH_URL}/auth`,
  //   realm: process.env.REALM,
  //   clientId: process.env.CLIENT_ID,
  url: 'http://localhost:8085/auth',
  realm: 'Test',
  clientId: 'test-client',
});

export default boot(({ app /* , store } */ }) => {
  async function createRefreshTokenTimer(keycloak) {
    setInterval(() => {
      keycloak
        .updateToken(60)
        .then((refreshed) => {
          if (refreshed) {
            console.log('Token refreshed' + refreshed);
          } else {
            // Do Something
          }
        })
        .catch(() => {
          console.log('Failed to refresh token');
        });
    }, 6000);
  }

  return new Promise((resolve) => {
    keycloak
      .init({
        onLoad: 'login-required',
        checkLoginIframe: false,
        // enableLogging: true,
      })
      .then(async (authenticated) => {
        if (authenticated) {
          console.log('Authenticated');
          await createRefreshTokenTimer(keycloak);
          resolve();
        } else {
          console.log('Not authenticated');
          // window.location.reload()
        }
      })
      .catch((error) => {
        console.log('Authentication failure', error);
        // window.location.reload()
      });

    app.config.globalProperties.$keycloak = keycloak;
    app.use(keycloak);
  });
});

export { keycloak };
