<template>
  <Dialog header="create ingredient"
          v-model:visible="show"
          :breakpoints="{'960px': '75vw', '640px': '90vw'}"
          :style="{width: '50vw'}"
  >
    <div>
      <div class="flex flex-column gap-2">
        <label for="ingredientName">name</label>
        <InputText id="ingredientName" v-model="newItem.name"></InputText>
        <label for="ingredientUnit">unit</label>
        <Dropdown id="ingredientUnit" v-model="newItem.defaultUnitId" :options="units" optionLabel="abbreviation" option-value="id" placeholder="select a unit" />

      </div>
    </div>
    <template #footer>
      <Button label="cancel" icon="pi pi-times"  class="p-button-secondary p-button-text" @click="show = false"/>
      <Button @click="create()" :disabled="!(newItem.name && newItem.defaultUnitId)" label="add" icon="pi pi-plus" />
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import { computed, ref, unref } from "vue";
import { useRecipeStore } from "@/stores/recipe.store";
const recipeStore = useRecipeStore()
const props = defineProps<{
  show: boolean,
}>()

const newItem = ref({
  name: '',
  defaultUnitId: ''
})
const emit = defineEmits(['update:show'])
const show = computed({
  get: () => props.show,
  set: (val: boolean) => emit("update:show", val)
});


const units = recipeStore.getUnits()

async function create() {
  await recipeStore.createItem(unref(newItem));
  newItem.value.name = ''
  newItem.value.defaultUnitId = ''
  show.value = false
}
</script>
