import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Item {
    id: string,
    name: string,
    workHours: number
}

export const useTempItemsStore = defineStore('tempItems', {
    state: () => {
        return {
            itemsList: [] as Item[],
            item: null as Item|null
        }
    },
    persist: {
        key: 'app-temp_items',
        includePaths: ['itemsList', 'item'],
    },
    actions: {
        setItem(item:Item) {
            this.itemsList.push(item)
        },
        removeItem(id:string) {
            this.itemsList = this.itemsList.filter((obj) => {
                return obj['id'] !== id;
            })
        }
    },
    getters: {
        getItems: (state) => {
            return state.itemsList
        }
    }
})