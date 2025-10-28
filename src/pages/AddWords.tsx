import { useState } from "react";
import BulkWordInput from "../components/BulkWordInput";
import { useStoredVar } from "../hooks/storedVar";
import type { TagWords } from "../models/TagWords";
import { bulkAssignTags } from "../lib/utils";

export default function AddWords() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagWords, setTagWords] = useStoredVar<TagWords>("tag-words", new Map())
  const [words, setWords] = useStoredVar<string[]>("words", [])
  const [tags] = useStoredVar<string[]>("tags", [])

  const handleSubmit = (newWords: string[]) => {
    setWords(Array.from(new Set([...words, ...newWords])))
    bulkAssignTags(tagWords, selectedTags, newWords)
    setTagWords(tagWords)
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Words</h1>
        <p className="text-muted-foreground mt-2">
          Add multiple words at once, one per line
        </p>
      </div>

      <BulkWordInput
        tags={tags}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
