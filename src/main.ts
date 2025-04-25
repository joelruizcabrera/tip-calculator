import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

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

app.use(createPinia())
app.use(router)

app.mount('#app')
