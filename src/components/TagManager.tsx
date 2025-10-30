import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Trash2, Plus } from "lucide-react";

interface TagManagerProps {
  tags: string[];
  onCreateTag: (name: string) => void;
  onDeleteTag: (name: string) => void;
}

export default function TagManager({ tags, onCreateTag, onDeleteTag }: TagManagerProps) {
  const [newTagName, setNewTagName] = useState("");

  const handleCreate = () => {
    if (newTagName.trim()) {
      onCreateTag(newTagName.trim());
      setNewTagName("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Tag</h2>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="e.g., Verbs, Common, Advanced"
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              data-testid="input-new-tag"
            />
          </div>
          <Button onClick={handleCreate} data-testid="button-create-tag" className="hover:bg-gray-300">
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">All Tags</h2>
        {tags.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No tags yet. Create your first tag above.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {tags.map(tag => (
              <div
                key={tag}
                className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg"
                data-testid={`tag-item-${tag}`}
              >
                <span className="font-medium">{tag}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteTag(tag)}
                  className="text-destructive rounded-4xl hover:bg-red-400"
                  data-testid={`button-delete-tag-${tag}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
