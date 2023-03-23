<template>
  <Toolbar>
    <template #start>
      <Button @click="back()" icon="pi pi-arrow-left" class="p-button-primary p-button-outlined"></Button>
    </template>

    <template #end>
      <Button icon="pi pi-search" class="mr-2" />
      <Button icon="pi pi-calendar" class="p-button-success mr-2" />
      <Button icon="pi pi-times" class="p-button-danger" />
    </template>
  </Toolbar>
  <main :style="{'height': contentHeight}">
    <RouterView></RouterView>
  </main>
  <div class="absolute bottom-0 w-full">
    <TabMenu :model="menuItems">
    </TabMenu>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";
import { onMounted, ref } from "vue";
import router from "@/router";
import type { MenuItem } from "primevue/menuitem";

const menuItems = ref<MenuItem[]>([])

const userStore = useUserStore();
userStore.getHouseholdAsync().then(household => {
menuItems.value.push(...[
  {
    label: 'home',
    icon: 'pi pi-fw pi-home',
    to: '/household/' + household.id + '/',
  },
  {
    label: 'calendar',
    icon: 'pi pi-fw pi-calendar'
  },
  {
    label: 'lists',
    icon: 'pi pi-fw pi-list'
  },
  {
    label: 'recipes',
    icon: 'pi pi-fw pi-book',
    to: '/household/' + household.id + '/recipes/'
  },
  {
    label: 'settings',
    icon: 'pi pi-fw pi-cog'
  }
])

});

let contentHeight = 'calc(100vh - 68px - 32px - 28.797px)'
onMounted(() => {
  requestAnimationFrame(() => {
    const headerHeight = document.querySelector(".p-toolbar")?.clientHeight;
    const footerHeight = document.querySelector(".p-tabmenu")?.clientHeight;
    contentHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`
  })
});

function back() {
  router.back();
}

</script>
