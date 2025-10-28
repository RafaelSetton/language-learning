import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface BulkWordInputProps {
  tags: string[];
  selectedTags: string[];
  onTagsChange: (tagIds: string[]) => void;
  onSubmit: (words: string[]) => void;
}

export default function BulkWordInput({
  tags,
  selectedTags,
  onTagsChange,
  onSubmit
}: BulkWordInputProps) {
  const [inputText, setInputText] = useState("");

  const words = inputText
    .split('\n')
    .map(w => w.trim())
    .filter(w => w.length > 0);

  const handleSubmit = () => {
    if (words.length > 0) {
      onSubmit(words);
      setInputText("");
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(id => id !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="bulk-input" className="text-lg font-semibold">
          Add Words (one per line)
        </Label>
        <Textarea
          id="bulk-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="hablar&#10;comer&#10;vivir&#10;estudiar"
          className="mt-2 min-h-64 font-mono"
          data-testid="input-bulk-words"
        />
        <p className="text-sm text-muted-foreground mt-2">
          {words.length} word{words.length !== 1 ? 's' : ''} ready to add
        </p>
      </div>

      {tags.length > 0 && (
        <div>
          <Label className="text-lg font-semibold">Assign Tags (optional)</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium transition-colors
                    ${isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }
                  `}
                  data-testid={`tag-select-${tag}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={words.length === 0}
        size="lg"
        className="w-full"
        data-testid="button-add-all-words"
      >
        Add All Words ({words.length})
      </Button>

      {words.length > 0 && (
        <div className="bg-muted rounded-lg p-4 max-h-96 overflow-auto">
          <h3 className="font-semibold mb-2">Preview:</h3>
          <div className="space-y-1">
            {words.map((word, idx) => (
              <div key={idx} className="text-sm flex items-center justify-between p-2 bg-background rounded">
                <span className="font-mono">{word}</span>
                {selectedTags.length > 0 && (
                  <div className="flex gap-1">
                    {selectedTags.map(tagId => {
                      const tag = tags.find(t => t === tagId);
                      return tag ? (
                        <span key={tag} className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">
                          {tag}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
