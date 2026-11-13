import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
          &lt;/&gt;
        </div>
        <div>
          <h1 className="text-xs font-bold text-slate-100 tracking-wider uppercase font-mono">
            VAULT // Dev Snippet Library
          </h1>
          <p className="text-[10px] text-slate-400 font-mono">
            TYPESCRIPT CODE REPOSITORY
          </p>
        </div>
      </div>
      <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
        Status: <strong>Operational</strong>
      </div>
    </header>
  );
};
