import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { ArrowRight } from "lucide-react";

interface BulkTagAssignmentProps {
  words: string[];
  tags: string[];
  onAssign: (words: string[], tags: string[]) => void;
}

export default function BulkTagAssignment({ words, tags, onAssign }: BulkTagAssignmentProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleWord = (wordId: string) => {
    if (selectedWords.includes(wordId)) {
      setSelectedWords(selectedWords.filter(id => id !== wordId));
    } else {
      setSelectedWords([...selectedWords, wordId]);
    }
  };

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleAssign = () => {
    console.log(selectedWords, selectedTags)
    if (selectedWords.length > 0 && selectedTags.length > 0) {
      onAssign(selectedWords, selectedTags);
      setSelectedWords([]);
      setSelectedTags([]);
    }
  };

  return (
    <div className="bg-card border rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Bulk Tag Assignment</h2>

      <div className="grid md:grid-cols-3 gap-4 items-center">
        <div>
          <Label className="font-semibold mb-2 block">Select Words</Label>
          <div className="space-y-2 max-h-64 overflow-auto border rounded-lg p-3">
            {words.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No words available
              </p>
            ) : (
              words.map(word => (
                <label
                  key={word}
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer"
                  data-testid={`word-select-${word}`}
                >
                  <Checkbox
                    checked={selectedWords.includes(word)}
                    onCheckedChange={() => toggleWord(word)}
                  />
                  <span className="text-sm font-mono">{word}</span>
                </label>
              ))
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {selectedWords.length} selected
          </p>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-8 h-8 text-muted-foreground" />
        </div>

        <div>
          <Label className="font-semibold mb-2 block">Select Tags</Label>
          <div className="space-y-2 max-h-64 overflow-auto border rounded-lg p-3">
            {tags.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No tags available
              </p>
            ) : (
              tags.map(tag => (
                <label
                  key={tag}
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer"
                  data-testid={`tag-assign-${tag}`}
                >
                  <Checkbox
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  <span className="text-sm">{tag}</span>
                </label>
              ))
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {selectedTags.length} selected
          </p>
        </div>
      </div>

      <Button
        onClick={handleAssign}
        disabled={selectedWords.length === 0 || selectedTags.length === 0}
        className="w-full mt-6"
        data-testid="button-assign-tags"
      >
        Assign Tags to Selected Words
      </Button>
    </div>
  );
}
