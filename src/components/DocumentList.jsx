function DocumentList({ documents, onViewDocument, viewingDocId }) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M8 7h6" /><path d="M8 11h8" /></svg>
          <h2 className="text-lg font-semibold dark:text-white">Knowledge Base</h2>
        </div>
        <span className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
          {documents.length} Indexed
        </span>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-8 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-white/30 dark:bg-white/[0.02]">
          <p className="text-sm text-neutral-400 italic">No documents indexed yet.</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="flex items-center justify-between p-3 rounded-xl bg-neutral-50/80 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/5 hover:border-amber-500/40 transition-all group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                <span className="text-sm font-medium dark:text-neutral-200 truncate">{doc.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <button
                  type="button"
                  onClick={() => onViewDocument(doc)}
                  className="text-xs px-2.5 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-amber-500/60 hover:text-amber-500 transition-all"
                >
                  {viewingDocId === doc._id ? "Opening..." : "View"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentList;
