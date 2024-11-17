import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@router/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { createPinia } from "pinia";

const pinia = createPinia();
library.add(fas);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(pinia);
app.use(router);

app.mount("#app");
