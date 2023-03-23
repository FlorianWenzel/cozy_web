<template>
  <div class="flex justify-content-center align-items-center h-full min-h-screen">
    <Card style="min-width: 20rem; max-width: 25rem; margin-bottom: 2em">
      <template #title >
          let's get started
      </template>
      <template #content v-if="stage === 0">
        <div class="flex flex-column gap-2">
          <p>what's your name?</p>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText placeholder="bilbo" v-model="username" />
          </div>
        </div>
      </template>
      <template #content v-if="stage === 1">
        <div class="flex flex-column gap-2">
          <p>what should your household be called?</p>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-home"></i>
            </span>
            <InputText placeholder="dragon's lair" v-model="householdName" />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex">
          <Button
            v-if="!stage"
            :disabled="!username"
            class="ml-auto mr-auto w-5"
            icon="pi pi-arrow-right"
            @click="stage++"
          />
          <Button
            v-if="stage"
            class="p-button-secondary w-5"
            icon="pi pi-arrow-left"
            @click="stage--"
          />
          <Button
            v-if="stage"
            :disabled="!householdName"
            class="ml-auto w-5"
            icon="pi pi-check"
            @click="submit"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>

import { ref } from "vue";
import { useSocketStore } from "@/stores/socket.store";
import router from "@/router";

const stage = ref(0);
const householdName = ref("");
const username = ref("");
const socket = useSocketStore();
async function submit(){
  await socket.emit('users/set-username', {username: username.value });
  await socket.emit('households/create', { name: householdName.value });
  router.push('/');
}

</script>


