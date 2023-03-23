<template>
        <DataTable :value="props.recipe.recipeEntries"
                   dataKey="id"
                   v-model:filters="filters"
                   filterDisplay="menu"
                   :globalFilterFields="['name','country.name','representative.name','status']"
                   responsiveLayout="scroll">
          <template #header>
              <span class="p-input-icon-left w-full">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="search" class="w-full" />
              </span>
          </template>
          <Column field="item.name" header="ingredient" sortable>
            <template #body="{data: entry}">
              {{entry.item.name}}
            </template>
          </Column>
          <Column field="name" header="amount" sortable>
            <template #body="{data:entry}">
              {{entry.amount}}{{entry.unit.abbreviation}}
            </template>
          </Column>
          <Column header="" v-if="edit" >
            <template #body="{data:entry}">
              <Button @click="deleteEntry(entry)" icon="pi pi-times" class="p-button-danger p-button-rounded" />
            </template>
          </Column>
        </DataTable>
        <div class="flex justify-content-center pt-3">
          <Button v-if="edit" class="p-button-icon p-button-rounded" icon="pi pi-plus" @click="openNewEntryDialog()" />
        </div>
        <RecipeEntryDialog v-if="edit" v-model:visible="showRecipeEntryDialog" :recipe-id="recipe.id"></RecipeEntryDialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import RecipeEntryDialog from "@/components/RecipeEntryDialog.vue";
import { useRecipeStore } from "@/stores/recipe.store";

const props = defineProps<{
  recipe: any,
  edit: boolean
}>()

const showRecipeEntryDialog = ref(false);

function openNewEntryDialog() {
  showRecipeEntryDialog.value = true;
}

function deleteEntry(entry: any) {
  useRecipeStore().deleteRecipeEntry(entry.id);
}

const filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
  'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
  'country.name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
  'representative': {value: null, matchMode: FilterMatchMode.IN},
  'date': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
  'balance': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
  'status': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
  'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
  'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
},);
</script>
