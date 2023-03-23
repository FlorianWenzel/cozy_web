<template>
  <div class="flex flex-column flex-grow-1 h-full">
    <div>
    Filter!
    </div>
    <VirtualScroller :items="recipes" :item-size="100" :itemSize="382" >
      <template #item="{ item: recipe, options }">
        <div class="p-3 flex justify-content-center">
          <RecipeCard :recipe="recipe" />
        </div>
      </template>
    </VirtualScroller>
    <RouterLink to="new">
      <Button icon="pi pi-plus" class="p-button-rounded button-add-recipe" />
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import RecipeCard from "@/components/RecipeCard.vue";
import { useRecipeStore } from "@/stores/recipe.store";

const recipes = useRecipeStore().getRecipes();
</script>
<style scoped>
.button-add-recipe {
  width: 4rem;
  height: 4rem!important;
  font-size: 2rem!important;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem 1rem 5rem;
  z-index: 111
}
</style>
