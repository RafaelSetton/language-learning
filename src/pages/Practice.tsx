import { useEffect, useState } from "react";
import StatsBar from "../components/StatsBar";
import TagFilter from "../components/TagFilter";
import WordCard from "../components/WordCard";
import { RefreshCw } from "lucide-react";
import { useStoredVar } from "../hooks/storedVar";
import type { TagWords } from "../models/TagWords";
import type PracticeStats from "../models/Stats";
import { Button } from "../components/ui/button";

export default function Practice() {
  const [tagWords] = useStoredVar<TagWords>("tag-words", new Map())
  const [words] = useStoredVar<string[]>("words", [])
  const [tags] = useStoredVar<string[]>("tags", [])
  const [stats, setStats] = useStoredVar<PracticeStats>("stats", { currentStreak: 0, successRate: 0, totalPracticed: 0 })
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [validWords, setValidWords] = useState<string[]>(words)
  const [currentWord, setCurrentWord] = useState(words[0])

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const filteredWords = selectedTags.length > 0 ?
      words.filter(
        w => selectedTags.some(
          t => tagWords.get(t)?.get(w)
        )
      ) : words;
    setValidWords(filteredWords)
    setCurrentWordIndex(0);
  }, [tagWords, words, selectedTags])


  useEffect(() => {
    setCurrentWord(validWords[currentWordIndex])
  }, [validWords, currentWordIndex])

  const handleAnswer = (correct: boolean) => {
    setStats(({ currentStreak, successRate, totalPracticed }) => ({
      currentStreak: correct ? currentStreak + 1 : 0,
      successRate: (successRate * totalPracticed + Number(correct)) / (totalPracticed + 1),
      totalPracticed: totalPracticed + 1,
    }));
    setCurrentWordIndex((currentWordIndex + 1) % validWords.length)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {stats && <StatsBar stats={stats} />}

      <TagFilter
        tags={tags}
        selectedTags={selectedTags}
        onTagsChange={n => {
          setSelectedTags(n);
        }}
      />

      {words.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-muted-foreground">
            {selectedTags.length > 0
              ? "No words found with selected tags."
              : "No words available. Add some words first!"}
          </p>
        </div>
      ) : (
        currentWord && (
          <>
            <WordCard
              word={currentWord}
              onSuccess={() => handleAnswer(true)}
              onFail={() => handleAnswer(false)}
            />

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setCurrentWordIndex(0)}
                data-testid="button-reset-progress"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Word {currentWordIndex + 1} of {validWords.length}
            </div>
          </>
        )
      )}
    </div>
  );
}
