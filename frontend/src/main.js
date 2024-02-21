import { createApp } from "vue";

import store from "./store/index.js";
import router from "./router.js";
import App from "./App.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";

const app = createApp(App);

app.use(router);
app.use(store);

app.component("base-button", BaseButton);
app.component("base-badge", BaseBadge);

app.mount("#app");
