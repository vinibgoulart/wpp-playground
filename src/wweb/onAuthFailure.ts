import { client } from "./client";

export const onAuthFailure = () => {
  client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});
};
