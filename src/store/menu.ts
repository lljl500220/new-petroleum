import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore("menu", () => {
  const collapse = ref<Boolean>(false);

  return {
    collapse,
  };
});
