<template>
  <RouterLink :to="recipe.id" class="w-full flex justify-content-center">
    <Card class="recipe-card relative">
      <template #header>
        <div class="recipe-speed-dial">
          <SpeedDial
            :model="speedDialOptions"
            :radius="120"
            direction="down-left"
            hide-icon="pi pi-times"
            show-icon="pi pi-bars"
            button-class="p-button-secondary"
            type="quarter-circle"
            @click="event => event.preventDefault()"
          >
          </SpeedDial>
        </div>
        <div class="recipe-card-image" style="background-image: url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)">
        </div>
      </template>
      <template #title>
        {{ props.recipe.name }}
      </template>
      <template #subtitle>
        <div class="flex">
          <Rating :modelValue="props.recipe.rating" :readonly="true" :stars="5" :cancel="false" />
          <span class="ml-auto">{{dayjs(props.recipe.createdAt).format('DD.MM.YYYY')}}</span>
        </div>
      </template>
    </Card>
  </RouterLink>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import router from "@/router";
import { useUserStore } from "@/stores/user.store";
import { useRecipeStore } from "@/stores/recipe.store";
import { useConfirm } from "primevue/useconfirm";

const props = defineProps<{
  recipe: any
}>()

const household = useUserStore().getHousehold();
const recipeStore = useRecipeStore();

const speedDialOptions = [
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    class: 'p-button-danger',
    command: ({ originalEvent: event }: any) => {
      event.preventDefault();
      event.stopPropagation();
      confirmDelete();
    }
  },
  {
    label: 'add',
    icon: 'pi pi-cart-plus',
    command: () => {
    }
  },
  {
    label: 'edit',
    icon: 'pi pi-pencil',
    command: () => {
      router.push(`/household/${household.id}/recipes/${props.recipe.id}?edit=true`)
    }
  },
  {
    label: 'share',
    icon: 'pi pi-upload',
    command: () => {
      router.push('fileupload');
    }
  },
]

const confirm = useConfirm();
function confirmDelete() {
  confirm.require({
    message: 'do you want to delete this recipe?',
    header: `delete "${props.recipe.name}"`,
    acceptLabel: 'delete',
    rejectLabel: 'cancel',
    accept: () => {
      recipeStore.deleteRecipe(props.recipe.id);
    },
    reject: () => {
    }
  });
}

</script>
