import { useState } from "react";
import axios from "axios";

function Upload({ refreshDocuments }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [quotaError, setQuotaError] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setQuotaError(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("https://rag-backend-fjm7.onrender.com/api/upload", formData);
      setFile(null);
      refreshDocuments();
    } catch (error) {
      console.error("Upload failed", error);
      if (error.response && error.response.status === 429) {
        setQuotaError(true);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
        <h2 className="text-lg font-semibold dark:text-white">Upload Context</h2>
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">Add files to enrich retrieval quality.</p>

      <div className="relative group">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className={`
          border-2 border-dashed rounded-xl p-8 transition-all duration-300 flex flex-col items-center justify-center gap-3
          ${file
            ? 'border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10'
            : 'border-neutral-300 dark:border-neutral-700 hover:border-amber-500/30 hover:bg-neutral-50 dark:hover:bg-white/[0.03]'}
        `}>
          <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            {file ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M20 6 9 17l-5-5" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium dark:text-neutral-200">
              {file ? file.name : 'Click or drag file to upload'}
            </p>
            <p className="text-xs text-neutral-400 mt-1">PDF, TXT, or DOCX up to 10MB</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="premium-button w-full flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>Index Document</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
          </>
        )}
      </button>

      {quotaError && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 text-xs animate-in fade-in duration-300">
          <div className="flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12" y1="16" y2="16" /></svg>
            <p>Indexing limit hit (Hugging Face). Please try again later.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
