import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'primevue/resources/themes/vela-orange/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)
import PrimeVue from 'primevue/config';
import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Steps from "primevue/steps";
import Toolbar from "primevue/toolbar";
import SplitButton from "primevue/splitbutton";
import TabMenu from "primevue/tabmenu";
import Rating from "primevue/rating";
import VirtualScroller from "primevue/virtualscroller";
import SpeedDial from "primevue/speeddial";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Editor from "primevue/editor";
import Dialog from "primevue/dialog";
import AutoComplete from "primevue/autocomplete";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from 'primevue/confirmationservice';
import Dropdown from "primevue/dropdown";

app.use(PrimeVue);
app.use(createPinia())
app.use(router)
app.use(ConfirmationService);

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import InputNumber from "primevue/inputnumber";
import FileUpload from "primevue/fileupload";
library.add(faCarrot)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component("Card", Card);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Steps", Steps);
app.component("Toolbar", Toolbar);
app.component("SplitButton", SplitButton);
app.component("TabMenu", TabMenu);
app.component("Rating", Rating);
app.component("VirtualScroller", VirtualScroller);
app.component("SpeedDial", SpeedDial);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Editor", Editor);
app.component("Dialog", Dialog);
app.component("AutoComplete", AutoComplete);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Dropdown", Dropdown);
app.component("InputNumber", InputNumber);
app.component("FileUpload", FileUpload);

app.mount('#app')
