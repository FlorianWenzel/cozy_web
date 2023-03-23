import { defineStore } from 'pinia'
import { useSocketStore } from "@/stores/socket.store";
import {  ref } from "vue";
import type { Ref } from "@vue/reactivity";
import axios from "axios";
export const useRecipeStore = defineStore("recipe",
  () => {
    const socket = useSocketStore();

    let recipes = ref<any[]>([]);

    function getRecipes(): Ref<any[]> {
      socket.emit("recipes/get").then((data: any) => {
        recipes.value = data;
      });
      return recipes;
    }

    const recipeRefsMap = new Map<string, Ref>();

    function getRecipe(id: string): Ref<any> {
      if (!recipeRefsMap.has(id)) {
        recipeRefsMap.set(id, ref({}));
      }

      socket.emit("recipes/get", { id }).then((data) => {
        recipeRefsMap.get(id)!.value = data;
      });
      return recipeRefsMap.get(id) as Ref<any>;
    }

    async function newRecipe(): Promise<any> {
      return socket.emit("recipes/create");
    }

    async function deleteRecipe(id: string): Promise<any> {
      return socket.emit("recipes/delete", { id });
    }

    async function removeRecipe(id: string) {
      recipes.value = recipes.value.filter((recipe: any) => recipe.id !== id);
    }


    let units = ref<any[]>([]);

    function getUnits(force?: boolean) {
      if (units.value.length === 0 || force) {
        socket.emit("units/get").then((data: any) => {
          units.value = data;
        });
      }
      return units;
    }


    let items = ref<any[]>([]);

    function getItems(force?: boolean) {
      if (items.value.length === 0 || force) {
        socket.emit("items/get").then((data: any) => {
          items.value = data;
        });
      }
      return items;
    }

    function createItem(item: any) {
      return socket.emit("items/create", item);
    }

    function addItem(item: any) {
      items.value.push(item);
    }

    async function addEntry(recipeEntry: any) {
      const entry = await socket.emit("recipes/addEntry", recipeEntry) as any;
      recipeRefsMap.get(entry.id)!.value = entry;
    }

    async function deleteRecipeEntry(recipeEntryId: string) {
      const recipe = await socket.emit("recipes/deleteEntry", { id: recipeEntryId }) as any;
      recipeRefsMap.get(recipe.id)!.value = recipe;
    }

    function refreshRecipe(recipe: any) {
      recipes.value = recipes.value.map((r: any) => {
        if (r.id === recipe.id) {
          return recipe;
        }
        return r;
      });
    }

    function updateRecipe(recipe: any) {
      return socket.emit("recipes/update", recipe);
    }

    async function uploadImage(recipeId: string, imageArrayBuffer: ArrayBuffer) {
      const blob = new Blob([imageArrayBuffer]);
      // use axios
      const recipe = await axios.post("http://localhost:3000/recipes/uploadImage/" + recipeId, blob, { headers: { "Content-Type": "image/jpeg" } });

      recipeRefsMap.get(recipe.id)!.value = recipe;
    }


    return {
      getRecipes,
      newRecipe,
      deleteRecipe,
      removeRecipe,
      getUnits,
      createItem,
      getRecipe,
      getItems,
      addItem,
      addEntry,
      refreshRecipe,
      deleteRecipeEntry,
      updateRecipe,
      uploadImage
    };
  })
