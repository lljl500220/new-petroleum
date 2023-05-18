import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router/index.ts";
import "virtual:svg-icons-register"
import {loadSvg} from "@/icons";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import '@/router/permission.ts'
import pinia from "@/store";

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
loadSvg(app)
app.use(router).use(pinia).use(ElementPlus)

router.isReady().then(() => {
    app.mount('#app')
})