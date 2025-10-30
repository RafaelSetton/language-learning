import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export default function TagFilter({ tags, selectedTags, onTagsChange }: TagFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const selectAll = () => {
    onTagsChange(tags);
  };

  const clearAll = () => {
    onTagsChange([]);
  };

  if (tags.length === 0) return null;

  return (
    <div className="bg-card border rounded-xl p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full"
        data-testid="button-toggle-filter"
      >
        <span className="font-semibold text-lg">Filter by Tags</span>

        <ChevronDown className={`w-5 h-5 ${isExpanded ? "rotate-180" : ""} transition`} />

      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={selectAll}
              data-testid="button-select-all-tags"
              className="hover:bg-gray-300"
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              data-testid="button-clear-all-tags"
              className="hover:bg-gray-300"
            >
              Clear All
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            {tags.map(tag => (
              <label
                key={tag}
                className="flex items-center gap-2 px-3 py-2 rounded-full border cursor-pointer hover:bg-gray-300 transition-colors"
                data-testid={`tag-filter-${tag}`}
              >
                <Checkbox
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => toggleTag(tag)}
                />
                <span className="text-sm font-medium">{tag}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
