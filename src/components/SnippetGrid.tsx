import React, { useState } from "react";
import type { Snippet, Language } from "../types/snippet";

interface SnippetGridProps {
  snippets: Snippet[];
  onAddSnippet: (snippet: Omit<Snippet, "id" | "createdAt">) => void;
  onDeleteSnippet: (id: string) => void;
}

const languageColors: Record<Language, string> = {
  TypeScript: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Python: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  SQL: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  React: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  Docker: "bg-sky-500/10 text-sky-400 border-sky-500/30",
};

export const SnippetGrid: React.FC<SnippetGridProps> = ({
  snippets,
  onAddSnippet,
  onDeleteSnippet,
}) => {
  const [search, setSearch] = useState("");
  const [selectedLang, setSelectedLang] = useState<string>("All");
  const [showModal, setShowModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState<Language>("TypeScript");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const filteredSnippets = snippets.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchesLang = selectedLang === "All" || s.language === selectedLang;
    return matchesSearch && matchesLang;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onAddSnippet({
      title,
      language,
      code,
      description,
      tags: tags.length ? tags : [language],
    });
    setTitle("");
    setCode("");
    setDescription("");
    setTagsInput("");
    setShowModal(false);
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-8 space-y-6 flex flex-col font-mono">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
        <input
          type="text"
          placeholder="Search snippets by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
        />

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {["All", "TypeScript", "Python", "SQL", "React", "Docker"].map(
            (lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 rounded-xl text-xs transition-colors border ${
                  selectedLang === lang
                    ? "bg-emerald-600 border-emerald-500 text-white font-bold"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {lang}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-950/50"
        >
          + New Snippet
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Create New Code Snippet
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-100 text-xs"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Snippet Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Express Error Handling Middleware"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e: any) => setLanguage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="TypeScript">TypeScript</option>
                    <option value="Python">Python</option>
                    <option value="SQL">SQL</option>
                    <option value="React">React</option>
                    <option value="Docker">Docker</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Express, Middleware"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief note on what this snippet does..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Code Block
                </label>
                <textarea
                  rows={6}
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Paste your code snippet here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-emerald-300 focus:outline-none resize-none font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs bg-emerald-600 text-white font-bold hover:bg-emerald-500"
                >
                  Save Snippet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Snippets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {filteredSnippets.map((snp) => (
          <div
            key={snp.id}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${languageColors[snp.language] || "bg-slate-800 text-slate-300"}`}
                >
                  {snp.language}
                </span>
                <button
                  onClick={() => onDeleteSnippet(snp.id)}
                  className="text-slate-500 hover:text-rose-400 text-xs transition-colors"
                  title="Delete Snippet"
                >
                  ✕
                </button>
              </div>
              <h3 className="text-xs font-bold text-slate-100">{snp.title}</h3>
              <p className="text-[11px] text-slate-400">{snp.description}</p>
            </div>

            {/* Code Box */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 relative group">
              <button
                onClick={() => handleCopy(snp.id, snp.code)}
                className="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded text-[10px] transition-colors"
              >
                {copiedId === snp.id ? "✓ Copied!" : "Copy"}
              </button>
              <pre className="text-[11px] text-emerald-300 overflow-x-auto pr-12 font-mono">
                <code>{snp.code}</code>
              </pre>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
              <div className="flex gap-1">
                {snp.tags.map((t, i) => (
                  <span
                    key={i}
                    className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <span>{snp.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredSnippets.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-xs">
          No snippets found matching your query.
        </div>
      )}
    </div>
  );
};
