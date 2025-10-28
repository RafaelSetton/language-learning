import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TagWords } from "../models/TagWords"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function bulkAssignTags(prev: TagWords, tags: string[], words: string[]) {
    console.log(prev)
    for (let tag of tags) {
        let line = prev.get(tag);
        if (line === undefined) {
            line = new Map()
            prev.set(tag, line)
        }
        for (let word of words)
            line.set(word, true)
    }
}