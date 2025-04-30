<script lang="ts" setup>
import Calculation from "@/helpers/Calculation.ts";
import {ref} from "vue";
const Calc = new Calculation();
import { v4 as uuidv4 } from 'uuid';
import type {Item} from "@/stores/tempItems.ts";
//@ts-ignore
import CurrencyInput from "@/components/CurrencyInput.vue";

Calc.create()

// @ts-ignore
const items = ref([])

const tempWorker = {
  name: '',
  hours: ''
}

const timeOut = ref(null)

const onDeleteItem = (id:string) => {
  if(!timeOut.value) {
    // @ts-ignore
    timeOut.value = setTimeout(() => {
    }, 500);
  }else{
    clearTimeout(timeOut.value);
    timeOut.value = null;
    items.value = items.value.filter((obj) => {
      return obj['id'] !== id;
    })
    Calc.removeItem(id)
  }
}

const tipSum = ref("00.00")

const addItem = () => {

  if (tempWorker.name == '' || tempWorker.hours == '')
    return;

  const item = {
    id: uuidv4(),
    name: tempWorker.name,
    workHours: tempWorker.hours
  }

  console.log(item)
  // @ts-ignore
  items.value.push(item)
  // @ts-ignore
  Calc.setItem(item)
  tempWorker.name = '';
  tempWorker.hours = '';
}

</script>

<template>
  <div class="pt-15 p-4">
    <RouterLink :to="'/'" class="flex flex-row items-center gap-2 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
        <path fill-rule="evenodd" d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z" clip-rule="evenodd" />
      </svg>
      Zurück
    </RouterLink>
    <div class="create-view__upper-container">
      <div class="p-2 rounded bg-slate-100 shadow-sm">
        <p class="font-black uppercase">Mitarbeiter hinzufügen</p>
        <div class="create-view__upper-container__form py-2 pb-3 flex flex-row gap-3">
          <div class="create-view__upper-container__form__input flex flex-col w-full min-w-[12.5rem]">
            <label for="workerName">Name</label>
            <input type="text" name="workerName" v-model="tempWorker.name" class="border px-3 py-2 rounded-md border-stone-300 outline-0">
          </div>
          <div class="create-view__upper-container__form__input flex flex-col w-25">
            <label for="workerHours">Stunden</label>
            <input type="number" name="workerHours" v-model="tempWorker.hours" class="border px-3 py-2 rounded-md border-stone-300 outline-0">
          </div>
        </div>
        <div class="create-view__upper-container__items flex flex-row gap-1 mt-2 flex-wrap">
          <div class="create-view__upper-container__items__item min-w-[3rem] h-[3rem] overflow-hidden relative flex items-center justify-center rounded-md shadow-sm p-2 bg-white" v-for="item in items" :key="item['id']">
            <button class="absolute w-full h-full opacity-0 transition-opacity transition-duration-300 focus:opacity-100 bg-red-500/60 flex justify-center items-center" @click="onDeleteItem(item['id'])">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-7 fill-white shadow-md">
                <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
              </svg>
            </button>
            <div class="flex flex-col">
              <p class="text-sm font-bold mb-1 leading-none" v-html="item['name']"></p>
              <span class="leading-none text-sm" v-html="'Stunden: ' + item['workHours']"></span>
            </div>
          </div>
          <div class="create-view__upper-container__items__item__add w-[3rem] h-[3rem] flex items-center justify-center bg-green-500 rounded-md shadow-sm" @click="addItem()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 color-stone-50">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      <div class="p-2 rounded bg-slate-100 shadow-sm mt-3">
        <div class="flex flex-row item-center justify-between">
          <p class="font-black uppercase">Trinkgeld</p>
          <button class="text-sm font-thin flex flex-row items-center gap-2 text-right">Münzen/Scheine auswählen <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 243.58" class="size-5"><path fill-rule="nonzero" d="M373.57 0 512 120.75 371.53 243.58l-20.92-23.91 94.93-83L0 137.09v-31.75l445.55-.41-92.89-81.02z"/></svg></button>
        </div>
        <CurrencyInput
            v-model="tipSum"
            :options="{ currency: 'EUR', precision: {min: 2},valueRange: {min: 0}, hideCurrencySymbolOnFocus: false, hideGroupingSeparatorOnFocus: false }"
            class="text-6xl font-black leading-none w-full bg-slate-200 outline-0 px-2 rounded mt-2"
        />
      </div>
    </div>
  </div>
</template>

