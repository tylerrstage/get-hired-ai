import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Header from './components/Header'
import ResumeUpload from './components/ResumeUpload'
import JobDesc from './components/JobDesc'
import AnalyzeButton from './components/AnalyzeButton'
import Results from './components/Results'

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
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
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='app-page'>
      <NavBar />
      <div className='app-container'>
        <Header />
        <div className='app-layout'>
          <div className='app-left'>
            <ResumeUpload onFileSelect={setResumeFile} />
            <JobDesc value={jobDescription} onChange={setJobDescription} />
          </div>
          <div className='app-right'>
            <div className='app-right-top'>
              <AnalyzeButton
                onClick={handleAnalyze}
                disabled={!resumeFile || !jobDescription || isLoading}
                isLoading={isLoading}
              />
            </div>
            {error && <p>{error}</p>}
            <Results result={analysisResult} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
