import { useStoredVar } from "../hooks/storedVar";
import { type TagWords } from "../models/TagWords";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";

interface WordCardProps {
  word: string;
  onSuccess: () => void;
  onFail: () => void;
}

export default function WordCard({ word, onSuccess, onFail }: WordCardProps) {
  const [tagWords] = useStoredVar<TagWords>("word-tags", new Map());
  const tags = Array.from(tagWords.keys()).filter(k => tagWords.get(k)?.get(word))
  return (
    <div className="bg-card border rounded-xl p-16 shadow-lg text-center space-y-8">
      <div className="font-mono text-5xl font-bold" data-testid="text-current-word">
        {word}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
              data-testid={`tag-display-${tag}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-4 justify-center pt-8">
        <Button
          size="lg"
          variant="outline"
          onClick={onFail}
          className="px-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          data-testid="button-fail"
        >
          <X className="w-5 h-5 mr-2" />
          Failed
        </Button>
        <Button
          size="lg"
          onClick={onSuccess}
          className="px-8 bg-green-600 hover:bg-green-700"
          data-testid="button-success"
        >
          <Check className="w-5 h-5 mr-2" />
          Correct
        </Button>
      </div>
    </div>
  );
}
