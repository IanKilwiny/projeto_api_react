import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './css/App.css'
import './css/Home.css'
import Home from './components/Home'
import PostDetail from './components/PostDetail'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photo/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  )
}

export default App
