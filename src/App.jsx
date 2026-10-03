import { useState } from 'react'
import './App.css'
import Logo from './components/Logo'
import Header from './components/Header'
import ResumeUpload from './components/ResumeUpload'
import JobDesc from './components/JobDesc'
import AnalyzeButton from './components/AnalyzeButton'
import Results from './components/Results'

// "input" -> "leaving" (intake fading out) -> "results"
const VIEW_INPUT = "input";
const VIEW_LEAVING = "leaving";
const VIEW_RESULTS = "results";

// Keep in sync with --motion-duration-exit in index.css. A timer is used
// rather than animationend, which never fires if the tab isn't painting.
const EXIT_ANIMATION_MS = 320;

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [resultVersion, setResultVersion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState(VIEW_INPUT);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jobDescription);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.detail ?? `Request failed: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResult(data);
      setResultVersion((v) => v + 1);
      setView(VIEW_LEAVING);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setTimeout(() => setView(VIEW_RESULTS), reduceMotion ? 0 : EXIT_ANIMATION_MS);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setView(VIEW_INPUT);
    window.scrollTo({ top: 0 });
  };

  const showResults = view === VIEW_RESULTS;

  return (
    <div className='app-page'>
      <Logo />
      <main className={`app-main ${showResults ? "app-main--wide" : ""}`}>
        {showResults ? (
          <Results key={resultVersion} result={analysisResult} onReset={handleReset} />
        ) : (
          <section className={`intake ${view === VIEW_LEAVING ? "intake--leaving" : ""}`}>
            <Header />
            <div className='intake-grid animate-in animate-in-delay-1'>
              <ResumeUpload file={resumeFile} onFileSelect={setResumeFile} />
              <JobDesc value={jobDescription} onChange={setJobDescription} />
            </div>
            <div className='intake-actions animate-in animate-in-delay-2'>
              {error && (
                <p className='app-error' role='alert'>
                  {error}
                </p>
              )}
              <AnalyzeButton
                onClick={handleAnalyze}
                disabled={!resumeFile || !jobDescription.trim() || isLoading}
                isLoading={isLoading}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
