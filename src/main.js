import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; // Import the store

const app = createApp(App);

app.use(router);
app.use(store); // Provide the store to the app

app.mount("#app");
