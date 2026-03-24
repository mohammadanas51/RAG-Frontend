import { useEffect, useState } from "react";
import axios from "axios";
import Upload from "./components/Upload";
import DocumentList from "./components/DocumentList";
import AskQuestion from "./components/AskQuestions";

function App() {
  const [documents, setDocuments] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewingDocId, setViewingDocId] = useState(null);
  const [viewerError, setViewerError] = useState("");

  const fetchDocuments = async () => {
    try {
      const res = await axios.get("https://rag-backend-fjm7.onrender.com/api/documents");
      setDocuments(res.data);
    } catch (error) {
      console.error("Failed to fetch documents", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleViewDocument = async (doc) => {
    try {
      setViewerError("");
      setViewingDocId(doc._id);
      const res = await axios.get(`https://rag-backend-fjm7.onrender.com/api/documents/${doc._id}`);
      setSelectedDocument(res.data);
      setIsViewerOpen(true);
    } catch (error) {
      console.error("Failed to fetch document content", error);
      setViewerError("Unable to load document content. Please try again.");
    } finally {
      setViewingDocId(null);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-neutral-100 dark:bg-[#121212] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none premium-grid" />
      <div className="absolute top-[-8rem] left-[-6rem] w-[26rem] h-[26rem] bg-amber-500/10 dark:bg-amber-500/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10rem] right-[-5rem] w-[24rem] h-[24rem] bg-neutral-400/10 dark:bg-neutral-700/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-10 sm:px-8 sm:py-12">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 premium-gradient rounded-2xl flex items-center justify-center shadow-[0_14px_34px_rgba(0,0,0,0.45)] ring-1 ring-white/20">
              <span className="text-white font-bold text-xl tracking-tight">N</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                NeuralQuery
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">Private Knowledge Intelligence</p>
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white/90 dark:bg-[#1a1a1a] hover:bg-white dark:hover:bg-[#242424] transition-all shadow-md dark:shadow-[0_10px_28px_rgba(0,0,0,0.55)] hover:scale-105 active:scale-95 group backdrop-blur-xl"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 group-hover:rotate-12 transition-transform"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700 group-hover:-rotate-12 transition-transform"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
            )}
          </button>
        </header>

        <main className="space-y-8">
          <section className="glass-card p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3">
                <p className="text-xs uppercase tracking-[0.22em] text-amber-500 mb-3">Intelligence Workspace</p>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Ask grounded questions from your private documents
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Upload files, inspect original text, and run retrieval-powered Q&A with transparent citations.
                </p>
              </div>
              <div className="md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-3">
                <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-white/[0.03] p-3">
                  <p className="text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Indexed</p>
                  <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{documents.length}</p>
                </div>
              </div>
            </div>
          </section>

          {viewerError && (
            <div className="glass-card p-4 border border-rose-500/30 bg-rose-500/10 text-rose-200 text-sm">
              {viewerError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
            <div className="lg:col-span-4 space-y-6">
              <DocumentList
                documents={documents}
                onViewDocument={handleViewDocument}
                viewingDocId={viewingDocId}
              />
            </div>

            <div className="lg:col-span-8 space-y-6">
              <section className="glass-card p-3 sm:p-4 border-amber-500/35 shadow-[0_30px_70px_-35px_rgba(245,158,11,0.35)]">
                <AskQuestion />
              </section>
              <section className="opacity-95">
                <Upload refreshDocuments={fetchDocuments} />
              </section>
            </div>
          </div>
        </main>

        <footer className="mt-16 text-center text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} NeuralQuery Intelligence Systems • Crafted for clarity and speed</p>
        </footer>
      </div>

      {isViewerOpen && selectedDocument && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={() => setIsViewerOpen(false)}
          />
          <div className="relative z-10 w-full max-w-4xl max-h-[85vh] glass-card border-neutral-700">
            <div className="flex items-center justify-between p-5 border-b border-neutral-700">
              <div className="pr-4 overflow-hidden">
                <h3 className="text-base sm:text-lg font-semibold text-neutral-100 truncate">{selectedDocument.name}</h3>
                <p className="text-xs text-neutral-400">Full document content</p>
              </div>
              <button
                type="button"
                onClick={() => setIsViewerOpen(false)}
                className="px-3 py-1.5 text-sm rounded-lg border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all"
              >
                Close
              </button>
            </div>
            <div className="p-5 max-h-[65vh] overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-neutral-200">
              {selectedDocument.content || "No content available."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
