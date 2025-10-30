import React, { useState } from "react";

function loadData<T>(storeKey: string): T | null {
    const stored = localStorage.getItem(storeKey);
    if (stored === null) return null;
    const parsed = JSON.parse(stored, (_key, value) => {
        if (value && value.__type === 'Map') {
            return new Map(value.value);
        }
        return value;
    });
    return parsed;
}

function storeData<T>(storeKey: string, data: T) {
    const replacer = (_key: string, value: any) => {
        if (value instanceof Map) {
            return { __type: 'Map', value: Array.from(value.entries()) };
        }
        return value;
    };
    localStorage.setItem(storeKey, JSON.stringify(data, replacer));

    return data;
}

export function useStoredVar<T>(storeKey: string, defaultValue: T) {
    const [state, setState] = useState<T>(loadData(storeKey) ?? defaultValue);

    const setStateWrapper = (value: React.SetStateAction<T>) => {
        setState(prev => {
            const newValue = typeof value === "function" ? (value as (p: T) => T)(prev) : value;

            return storeData(storeKey, newValue)
        });
    }

    return [state, setStateWrapper] as const;
}