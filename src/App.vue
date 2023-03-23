<template>
  <ConfirmDialog></ConfirmDialog>
  <Suspense>
    <RouterView />
  </Suspense>
</template>
<script lang="ts" setup>
import { RouterView } from "vue-router";
import { useSocketStore } from "@/stores/socket.store";
import router from "@/router";

const socket = useSocketStore()
socket.emit('users/refresh', localStorage.getItem('refreshToken'))
  .then((response: any) => {
  if(typeof response === 'string') {
    router.push('/sign-up')
    return;
  }

  const { accessToken, refreshToken } = response;
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
  socket.setToken(accessToken);
})

</script>
