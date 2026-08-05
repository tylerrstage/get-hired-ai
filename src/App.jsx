import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Header from './components/Header'
import ResumeUpload from './components/ResumeUpload'
import JobDesc from './components/JobDesc'
import Results from './components/Results'

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [resultVersion, setResultVersion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='app-page'>
      <NavBar
        onAnalyze={handleAnalyze}
        analyzeDisabled={!resumeFile || !jobDescription || isLoading}
        isLoading={isLoading}
      />
      <div className='app-container'>
        <Header />
        <div className='app-layout'>
          <div className='app-left animate-in animate-in-delay-1'>
            <ResumeUpload onFileSelect={setResumeFile} />
            <JobDesc value={jobDescription} onChange={setJobDescription} />
          </div>
          <div className='app-right animate-in animate-in-delay-2'>
            {error && (
              <p className='app-error' role='alert'>
                {error}
              </p>
            )}
            <Results key={resultVersion} result={analysisResult} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
