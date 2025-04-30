import type { PiniaPluginContext } from 'pinia'
import { Preferences } from '@capacitor/preferences'

interface PersistOptions {
    key?: string
    includePaths?: string[]
}

declare module 'pinia' {
    export interface PiniaCustomProperties {
        $persist: () => Promise<void>
    }

    export interface DefineStoreOptionsBase<S, Store> {
        persist?: boolean | PersistOptions
    }
}

export function createCapacitorPersistPlugin() {
    return (context: PiniaPluginContext) => {
        const { store, options } = context
        const persistOption = options.persist

        if (!persistOption) return

        const key = typeof persistOption === 'object' && persistOption.key
            ? persistOption.key
            : `pinia-${store.$id}`

        const includePaths = typeof persistOption === 'object' && persistOption.includePaths
            ? persistOption.includePaths
            : null

        // Restore persisted state
        Preferences.get({ key }).then(({ value }) => {
            if (value) {
                try {
                    const parsed = JSON.parse(value)
                    store.$patch(parsed)
                } catch (error) {
                    console.error(`[CapacitorPersistPlugin] Failed to parse state for ${key}:`, error)
                }
            }
        })

        // Listen for changes and persist
        store.$subscribe((_mutation, state) => {
            const toPersist = includePaths
                ? includePaths.reduce((acc, path) => {
                    acc[path] = (state as any)[path]
                    return acc
                }, {} as Record<string, any>)
                : state

            Preferences.set({
                key,
                value: JSON.stringify(toPersist),
            })
        })

        // Add $persist method to store
        store.$persist = async () => {
            const state = store.$state
            const toPersist = includePaths
                ? includePaths.reduce((acc, path) => {
                    acc[path] = (state as any)[path]
                    return acc
                }, {} as Record<string, any>)
                : state

            await Preferences.set({
                key,
                value: JSON.stringify(toPersist),
            })
        }
    }
}