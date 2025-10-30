import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TagWords } from "../models/TagWords"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function bulkAssignTags(prev: TagWords, tags: string[], words: string[]) {
    console.log(prev)
    for (const tag of tags) {
        let line = prev.get(tag);
        if (line === undefined) {
            line = new Map()
            prev.set(tag, line)
        }
        for (const word of words)
            line.set(word, true)
    }
}


export const today = () => Math.floor(Date.now() / (1000 * 60 * 60 * 24));
