import './App.css'
import NavBar from './components/NavBar'
import Header from './components/Header'
import ResumeUpload from './components/ResumeUpload'
import JobDesc from './components/JobDesc'
import AnalyzeButton from './components/AnalyzeButton'
import Results from './components/Results'


function App() {

  return (
    <div className='app-page'>
      <NavBar />
      <div className='app-container'>
        <Header />
        <div className='app-layout'>
          <div className='app-left'>
            <ResumeUpload />
            <JobDesc />
          </div>
          <div className='app-right'>
            <div className='app-right-top'>
              <AnalyzeButton />
            </div>
            <Results />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
