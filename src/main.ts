import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initialize } from './firebase'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
initialize();
const app = createApp(App);
app.use(VueTippy, {
    defaultProps: { placement: 'left', allowHTML: true },
  });
  app.use(
    Vue3Toasity,
    {
      autoClose: 5000,
    } as ToastContainerOptions,
  )
app.use(router)
app.mount('#app')
