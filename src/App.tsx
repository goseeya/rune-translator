import './App.css'
import { RuneTranslator } from './components/RuneTranslator/RuneTranslator'

function App() {

  return (
    <>
      <h1>Rune Translator</h1>
      <div className="card">
        <RuneTranslator />
      </div>
      <div className='read-about-runes'>
        <a href='https://www.worldhistory.org/runes/'>
          Click to learn more about runes
        </a>
      </div>
    </>
  )
}

export default App
