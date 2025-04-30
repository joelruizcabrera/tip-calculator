import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createCapacitorPersistPlugin } from './helpers/capacitor-persist-plugin'

import StartingView from "@/views/StartingView.vue";
import CreateView from "@/views/CreateView.vue";

import {createMemoryHistory, createRouter} from "vue-router";

import App from './App.vue'

const routes = [
    {
        path: '/',
        component: StartingView
    },
    {
        path: '/create',
        component: CreateView
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

const app = createApp(App)
const pinia = createPinia()

pinia.use(createCapacitorPersistPlugin())

app.use(pinia)
app.use(router)

app.mount('#app')
