import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css';
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import store from './store'

loadFonts()

const app = createApp(App);
app.use(vuetify);
app.use(store);
app.use(router);
app.mount('#app');