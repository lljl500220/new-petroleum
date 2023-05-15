import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router/index.ts";
import {createPinia} from "pinia";
import {loadSvg} from "@/icons";


const pinia = createPinia()
const app = createApp(App)
loadSvg(app)
app.use(router).use(pinia).use(ElementPlus)
router.isReady().then(()=>{
    app.mount('#app')
})
