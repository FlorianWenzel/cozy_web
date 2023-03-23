<template>
  <Card class="relative w-full h-full overflow-scroll bg-black-alpha-50 ">
    <template #header>
      <div
        v-if="!editing"
        class="recipe-card-image"
        style="background-image: url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
      >
      </div>
      <FileUpload
        v-else
        name="demo[]"
        @upload="onUpload($event)"
        @select="onUpload($event)"
        @before-upload="onUpload($event)"

        accept="image/*"
        :maxFileSize="10000000">
        <template #content>
          <ul v-if="uploadedFiles && uploadedFiles[0]">
            <li v-for="file of uploadedFiles[0]" :key="file">{{ file.name }} - {{ file.size }} bytes</li>
          </ul>
        </template>
        <template #empty>
          <p>Drag and drop files to here to upload.</p>
        </template>
      </FileUpload>
    </template>
    <template #title>
      <InputText v-if="editing" v-model="recipe.name" @change="updateRecipe()"></InputText>
      <span v-else>{{ recipe.name }}</span>
    </template>
    <template #subtitle>
      <div class="flex">
        <Rating v-model="recipe.rating" :key="recipe.rating" :readonly="!editing" :stars="5" :cancel="false" @change="updateRecipe()"/>
        <span class="ml-auto">{{dayjs(recipe.createdAt).format('DD.MM.YYYY')}}</span>
      </div>
    </template>
    <template #content>
      <div class="flex flex-column gap-3">
        <div>
          <h3>description</h3>
          <Editor v-if="editing" v-model="recipe.description" editorStyle="height: 250px" @text-change="updateRecipe()">
            <template v-slot:toolbar>
                    <span class="ql-formats">
                        <select class="ql-header">
                            <option selected></option>
                            <option value="1">Heading</option>
                            <option value="2">Subheading</option>
                        </select>
                        <button class="ql-bold"></button>
                        <button class="ql-italic"></button>
                        <button class="ql-underline"></button>
                        <button class="ql-strike"></button>
                    </span>
            </template>
          </Editor>
          <p v-else v-html="recipe.description"></p>
        </div>
        <div>
          <h3>ingredients</h3>
          <RecipeItemsTable :recipe="recipe" :edit="editing" />
        </div>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { useRecipeStore } from "@/stores/recipe.store";
import router from "@/router";
import RecipeItemsTable from "@/components/RecipeItemsTable.vue";
import { ref } from "vue";

const recipeStore = useRecipeStore();

const recipeId = router?.currentRoute?.value?.params?.recipeId as string;
let recipe = ref<any>({});
const editing = ref(false);

if(recipeId === 'new') {
  recipe.value = await recipeStore.newRecipe();
  editing.value = true;
} else {
  recipe = recipeStore.getRecipe(recipeId);
}

if(router?.currentRoute?.value?.query?.edit === 'true') {
  editing.value = true;
}

function updateRecipe() {
  recipeStore.updateRecipe(recipe.value);
}

let uploadedFiles: any = [];
function onUpload(eve: any){
  const event = eve.originalEvent;
  const [fileToUpload] = (event.target as HTMLInputElement).files as FileList;

  const reader = new FileReader()
  reader.onload = ((ev) => {
    const binary = ev.target!.result as ArrayBuffer;
    recipeStore.uploadImage(recipe.value.id, binary);
  });
  reader.readAsArrayBuffer(fileToUpload);
}

</script>

