import { defineStore } from 'pinia'
import { io } from "socket.io-client";
import { useRecipeStore } from "@/stores/recipe.store";

export const useSocketStore = defineStore('socket', () => {
  let socket = io();
  let recipeStore = useRecipeStore();
  let resolveReady: Function;

  const ready = new Promise((resolve) => {
    resolveReady = resolve;
  });
  setToken(localStorage.getItem("refresh_token") as string)

  async function emit(message: string, body?: any) {
    await ready;
    return await new Promise((resolve) => {
      socket.emit(message, body, (response: any) => {
        resolve(response)
      })
    })
  }

  function once(message: string) {
    return new Promise(resolve =>
    {
      socket.once(message, (data: any) => {
        resolve(data)
      })
    })
  }

  function on(message: string, callback: any) {
    socket.on(message, callback)
  }

  function setToken(token: string) {
    const socketOptions = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: 'Brearer ' + token
          }
        }
      }
    }

    socket = io("http://localhost:3000", socketOptions);

    socket.on("recipes/delete", (id: string) => {
      recipeStore.removeRecipe(id)
    })

    socket.on("items/create", (item: any) => {
      recipeStore.addItem(item)
    })
    socket.on("recipes/get", (recipe: any) => {
      recipeStore.refreshRecipe(recipe)
    })

    resolveReady();
    socket.onAny((event, attrs) => {
    })
  }

  return { emit, once, on, setToken }
})
