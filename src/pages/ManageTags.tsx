import TagManager from "../components/TagManager";
import BulkTagAssignment from "../components/BulkTagAssignment";
import { useStoredVar } from "../hooks/storedVar";
import type { TagWords } from "../models/TagWords";
import { bulkAssignTags } from "../lib/utils";

export default function ManageTags() {
  const [tagWords, setTagWords] = useStoredVar<TagWords>("tag-words", new Map())
  const [words] = useStoredVar<string[]>("words", [])
  const [tags, setTags] = useStoredVar<string[]>("tags", [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Manage Tags</h1>
        <p className="text-muted-foreground mt-2">
          Create and organize tags for your vocabulary
        </p>
      </div>

      <TagManager
        tags={tags}
        onCreateTag={(name) => setTags([...tags, name])}
        onDeleteTag={(name) => {
          setTags(tags.filter(t => t !== name))
          tagWords.delete(name)
          setTagWords(tagWords)
        }}
      />

      <BulkTagAssignment
        words={words}
        tags={tags}
        onAssign={(words, tags) => {
          bulkAssignTags(tagWords, tags, words)
          setTagWords(tagWords)

        }}
      />
    </div>
  );
}
