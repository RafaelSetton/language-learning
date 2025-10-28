import React, { useState } from "react";

export function useStoredVar<T>(storeKey: string, defaultValue: T) {
    const [state, setState] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(storeKey);
            if (stored === null) return defaultValue;
            const parsed = JSON.parse(stored, (_key, value) => {
                if (value && value.__type === 'Map') {
                    return new Map(value.value);
                }
                return value;
            });
            return parsed;
        } catch {
            return defaultValue;
        }
    });

    const setStateWrapper = (value: React.SetStateAction<T>) => {
        setState(prev => {
            const newValue = typeof value === "function" ? (value as (p: T) => T)(prev) : value;

            const replacer = (_key: string, value: any) => {
                if (value instanceof Map) {
                    return { __type: 'Map', value: Array.from(value.entries()) };
                }
                return value;
            };
            localStorage.setItem(storeKey, JSON.stringify(newValue, replacer));

            return newValue;
        });
    }

    return [state, setStateWrapper] as const;
}