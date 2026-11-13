import React, { useState } from "react";
import { INITIAL_SNIPPETS } from "./data/initialSnippets";
import type { Snippet } from "./types/snippet";
import { Header } from "./components/Header";
import { SnippetGrid } from "./components/SnippetGrid";

export const App: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>(INITIAL_SNIPPETS);

  const handleAddSnippet = (
    newSnippetData: Omit<Snippet, "id" | "createdAt">,
  ) => {
    const newSnippet: Snippet = {
      id: `snp-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      ...newSnippetData,
    };
    setSnippets((prev) => [newSnippet, ...prev]);
  };

  const handleDeleteSnippet = (id: string) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono flex flex-col selection:bg-emerald-500 selection:text-white">
      <Header />
      <SnippetGrid
        onAddSnippet="{handleAddSnippet}"
        onDeleteSnippet="{handleDeleteSnippet}"
        snippets="{snippets}"
      />
    </div>
  );
};

export default App;
