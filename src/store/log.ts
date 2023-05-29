import { defineStore } from "pinia";
import { ref } from "vue";
import store from "@/store/index.ts";
import { RouteLocationNormalized } from "vue-router";

export interface Log {
  pageName: string;
  path: string;
  time: string;
  status: number;
  request: string;
  type: string;
}

export const useLogStore = defineStore("log", () => {
  const logList = ref<Log[]>([]);
  const currentRoute = ref<RouteLocationNormalized>();

  const setLog = (log: Log) => {
    logList.value.unshift(log);
  };

  const setCurrentRoute = (route: RouteLocationNormalized) => {
    currentRoute.value = route;
  };

  return { logList, currentRoute, setLog, setCurrentRoute };
});

export default function useLogStoreHook() {
  return useLogStore(store);
}
