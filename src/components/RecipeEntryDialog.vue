<template>
  <Dialog header="add ingredient to recipe"
          v-model:visible="visible"
          :modal="true"
          :breakpoints="{'960px': '75vw', '640px': '90vw'}"
          :style="{width: '50vw'}"
  >
    <div>
      <label for="stacked">ingredient</label>
      <div class="flex gap-1">
        <div class="flex-grow-1">
          <AutoComplete
            v-model="selectedItem"
            :suggestions="filteredItems"
            @complete="searchItems"
            @change="setItemAndUnitId()"
            @blur="displayError()"
            :virtualScrollerOptions="{ itemSize: 38 }"
            optionLabel="name"
            optionValue="id"
            dropdown
            aria-describedby="selectItemHelp"
            :class="{'p-invalid': errorDisplayed, 'w-full': true}"
          />
        </div>
        <Button icon="pi pi-plus" @click="isShowingNewItemDialog = true" class="p-button-help" />
      </div>
      <div class="flex flex-column gap-1 mt-3" v-if="unitAbbreviation">
        <label for="stacked">amount</label>
        <InputNumber
          inputId="stacked"
          v-model="newEntry.amount"
          showButtons
          class="w-full"
          buttonLayout="horizontal"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          decrementButtonClass="p-button-secondary"
          incrementButtonClass="p-button-secondary"
          :suffix="unitAbbreviation"
        />
      </div>
      <small v-if="errorDisplayed" id="selectItemHelp" class="p-error">please select an ingredient from the list</small>
    </div>
    <template #footer>
      <Button @click="visible = false" label="cancel" icon="pi pi-times"  class="p-button-text p-button-secondary"/>
      <Button :disabled="!itemSelectionValid || !newEntry.amount " @click="addEntry()" label="add" icon="pi pi-plus" />
    </template>
    <EditItemDialog :show="isShowingNewItemDialog" @update:show="val => isShowingNewItemDialog = val"></EditItemDialog>
  </Dialog>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import EditItemDialog from "@/components/EditItemDialog.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRecipeStore } from "@/stores/recipe.store";
import type { Ref } from "@vue/reactivity";

const props = defineProps<{
  visible: boolean,
  recipeId: string
}>()
const emit = defineEmits(['update:visible'])
const visible = computed({
  get: () => props.visible,
  set: (val: boolean) => emit("update:visible", val)
});

const newEntry = ref({
  itemId: '',
  unitId: '',
  recipeId: '',
  amount: 0
})

const recipeStore = useRecipeStore();
const items = recipeStore.getItems();

let isShowingNewItemDialog = ref(false)

const filteredItems = ref([...items.value]);

const selectedItem: Ref<any> = ref(null);

const unitAbbreviation = computed(() => {
  if(!selectedItem.value || typeof selectedItem.value === 'string') return '';
  return recipeStore.getUnits().value.find(u => u.id === selectedItem.value.defaultUnitId)?.abbreviation || '';
})

let itemSelectionValid = true;
function setItemAndUnitId() {
  errorDisplayed.value = false;
  if(typeof selectedItem.value === 'string') {
    itemSelectionValid = false;
    return;
  }
  newEntry.value.itemId = selectedItem.value.id;
  newEntry.value.unitId = selectedItem.value.defaultUnitId;
  itemSelectionValid = true;
}

let errorDisplayed = ref(false);
function displayError() {
  if(!itemSelectionValid) {
    errorDisplayed.value = true;
  }
}
function searchItems(event: any) {
  const query = event.query;
  filteredItems.value = items.value.filter((item: any) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });
}

function addEntry() {
  newEntry.value.recipeId = props.recipeId;
  recipeStore.addEntry(newEntry.value);
  visible.value = false;
}

</script>
