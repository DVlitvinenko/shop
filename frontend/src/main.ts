import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@router/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import directives from "@directives/directives";

const pinia = createPinia();
library.add(fas, far);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

directives.forEach((directive: any) => {
  app.directive(directive.name, directive);
});

app.use(pinia);
app.use(router);

app.mount("#app");
