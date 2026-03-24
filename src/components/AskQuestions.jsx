import { useState } from "react";
import axios from "axios";

function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creditError, setCreditError] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setCreditError(false);
    try {
      const response = await axios.post("https://rag-backend-fjm7.onrender.com/api/ask", { question });
      setResult(response.data);
    } catch (error) {
      console.error("Failed to fetch answer", error);
      if (error.response && error.response.status === 429) {
        setCreditError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
          <h2 className="text-lg font-semibold dark:text-white">AI Assistant</h2>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Ask focused questions to get grounded answers from your indexed knowledge.</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            className="premium-input flex-1 w-full"
            placeholder="Ask anything about your documents..."
          />
          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="premium-button flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Query</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>
              </>
            )}
          </button>
        </div>
      </div>

      {creditError && (
        <div className="glass-card p-6 border-l-4 border-l-amber-500 bg-amber-500/5 animate-in fade-in duration-300">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold dark:text-white">Credits Exhausted</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                You've reached the usage limit for the external AI APIs.
                Please wait a few hours or check your API quotas to continue.
              </p>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="glass-card p-8 border-l-4 border-l-amber-500 overflow-hidden relative">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500 mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-amber-500" />
              Response
            </h3>
            <p className="text-lg leading-relaxed dark:text-neutral-100 font-medium">
              {result.answer}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2 px-2">
              <span className="w-4 h-[1px] bg-neutral-300 dark:bg-neutral-700" />
              Verify Sources
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {result.sources.map((source, index) => (
                <div
                  key={index}
                  className="glass-card p-5 bg-white/40 dark:bg-neutral-900/30 border-neutral-100 dark:border-white/5 hover:border-amber-500/20 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                      SOURCE {index + 1}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-mono">
                      {(source.score * 100).toFixed(1)}% match
                    </span>
                  </div>
                  <p className="text-sm dark:text-neutral-300 italic line-clamp-3 leading-relaxed">
                    "{source.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AskQuestion;
