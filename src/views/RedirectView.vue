<template>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user.store";
import router from "@/router";

const userStore = useUserStore();
const household: any = await userStore.getHouseholdAsync();
console.log(household)
if(!household.id){
  router.push('/welcome-wizard')
}else {
  router.push(`/household/${household.id}/`)
}
</script>
