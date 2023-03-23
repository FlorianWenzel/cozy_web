<template>
  <div class="flex justify-content-center align-items-center h-full min-h-screen">
    <Card style="max-width: 25rem; margin-bottom: 2em">
      <template #title>
      </template>
      <template #content>
        <div class="flex flex-column gap-2">
          <div class="p-inputgroup flex-column">
            <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-envelope"></i>
            </span>
              <InputText placeholder="email" v-model="email" aria-describedby="email-help" @input="passwordWrong = false" :class="{'p-invalid': takenEmails.includes(email) || passwordWrong, 'w-full': true}" />
            </div>
            <small v-if="takenEmails.includes(email)" id="email-help" class="p-error">email already taken</small>
            <small v-if="passwordWrong" id="email-help" class="p-error">wrong email or password</small>
          </div>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-key"></i>
            </span>
            <InputText type="password" placeholder="password" @input="passwordWrong = false" :class="{'p-invalid': passwordWrong}" v-model="password" />
          </div>
          <div class="p-inputgroup flex-column" v-show="signingUp">
            <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-key"></i>
            </span>
              <InputText type="password" placeholder="repeat password" aria-describedby="repeat-password-help" :class="{'p-invalid': !repeatPasswordValid(), 'w-full': true}" v-model="repeatPassword" />
            </div>
            <small v-if="!repeatPasswordValid()" id="repeat-password-help" class="p-error">passwords do not match.</small>
          </div>
          <div class="p-inputgroup">
            <Button
              :label="signingUp ? 'sign up' : 'login'"
              :disabled="signingUp && (!repeatPasswordValid() || takenEmails.includes(email))"
              @click="submit"
              class="ml-auto w-full"
            />
          </div>
        </div>
      </template>
      <template #footer v-if="signingUp">
        <div class="p-inputgroup flex flex-column gap-3 mt-3">
          already signed up?
          <Button label="login" @click="signingUp = false" class="p-button-secondary" />
        </div>
      </template>
      <template #footer v-else>
        <div class="p-inputgroup flex flex-column gap-3 mt-3">
          Not signed up yet?
          <Button label="sign up" @click="signingUp = true" class="p-button-secondary" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useSocketStore } from "@/stores/socket.store";
import router from "@/router";

const signingUp = ref(true);
const passwordWrong = ref(false);
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const takenEmails = ref<string[]>([]);
const socket = useSocketStore();
const submit = async () =>  {
  let response: any;
  if (signingUp.value) {
    response = await socket.emit('users/signup', { email: email.value, password: password.value });
  } else {
    response = await socket.emit('users/login', { email: email.value, password: password.value });
  }
  if(response === 'email_taken') {
    takenEmails.value.push(email.value);
    return;
  }
  if(response === 'invalid_credentials') {
    passwordWrong.value = true;
    return;
  }
  const { accessToken, refreshToken } = response as any;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  socket.setToken(accessToken);

  await router.push('/');
}

const repeatPasswordValid = () =>  {
  return repeatPassword.value === password.value;
}
</script>


