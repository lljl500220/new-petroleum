import { defineStore } from "pinia";
import { ref } from "vue";

export interface Log {
  name: string;
  time: string;
  status: number;
  request: string;
  type: string;
}

export const useLogStore = defineStore("log", () => {
  const logList = ref<Log[]>([]);

  const setLog = (log: Log) => {
    logList.value.push(log);
  };

  return { logList, setLog };
});
