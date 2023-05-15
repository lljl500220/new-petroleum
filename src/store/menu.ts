//1.定义容器
import {defineStore} from "pinia";

export const useMenuStore = defineStore("menu", {
    state: () => {
        return {
            collapse:false
        }
    },
    getters: {},
    actions: {}
})

//2. 使用容器中的state