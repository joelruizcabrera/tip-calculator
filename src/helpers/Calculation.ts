import { v4 as uuidv4 } from 'uuid';
import {useTempItemsStore} from "@/stores/tempItems.ts"
import type {Item} from "@/stores/tempItems.ts";
export default class Calculation {
    id: string|null;
    items: never[];
    store;
    constructor() {
        this.id = null
        this.items = []
        this.store = useTempItemsStore();
    }
    create(): string {
        this.id = uuidv4();
        this.items = [];
        if (this.store.getItems.length === 0) {
            this.items = [];
        } else {
            // @ts-ignore
            this.items = this.store.getItems
        }
        return this.id;
    }
    setItem(item:Item) {
        this.store.setItem(item)
        // @ts-ignore
        this.items.push(item)
    }
    removeItem(id:string) {
        this.items = this.items.filter((obj) => {
            return obj['id'] !== id;
        })
        this.store.removeItem(id)
    }
    getItems() {
        return this.items
    }
}