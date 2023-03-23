import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { io } from "socket.io-client";
import { useSocketStore } from "@/stores/socket.store";

export const useUserStore = defineStore('user', () => {
  const socket = useSocketStore();

  const me = ref<any>({})
  const household = ref<any>({})

  function getMe() {
    socket.emit("users/get").then((data: any) => {
      me.value = data
      household.value = data.households[0];
    });

    return me;
  }


  async function getHousehold() {
    getMe();
    return household
  }

  async function getHouseholdAsync(): Promise<any> {
    return new Promise((resolve) => {
      socket.emit("users/get").then((data: any) => {
        resolve(data.households[0]?.household)
      });
    })
  }

  return { getMe, getHousehold, getHouseholdAsync }
})
