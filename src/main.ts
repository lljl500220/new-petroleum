import { createApp } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "virtual:svg-icons-register";
import "default-passive-events";
import ElementPlus from "element-plus";

import App from "./App.vue";
import router from "@/router/index.ts";
import { loadSvg } from "@/icons";
import "@/router/permission.ts";
import pinia from "@/store";
import { loadDirectives } from "@/directives";

import "./style.css";
import "@/styles/index.scss";
import "element-plus/theme-chalk/src/message.scss";
import "element-plus/dist/index.css";
import 'animate.css';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

loadSvg(app);
loadDirectives(app);

app.use(router).use(pinia).use(ElementPlus);

router.isReady().then(() => {
  app.mount("#app");
});
