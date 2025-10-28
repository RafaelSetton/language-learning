import { useState } from "react";

export function useStoredVar<T>(storeKey: string, defaultValue: T) {
    const [state, setState] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(storeKey);
            return stored ? JSON.parse(stored) as T : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    const setStateWrapper = (newValue: T) => {
        localStorage.setItem(storeKey, JSON.stringify(newValue));
        setState(newValue);
    }

    return [state, setStateWrapper] as const;
}