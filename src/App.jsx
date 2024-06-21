import { useState } from "react"
import Navbar from "./Components/Navbar"
import NewsItem from "./Components/NewsItem"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Favorite from "./Components/Favorite"

function App() {

  const [category, setCategory] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <Router>
        <Navbar setCategory={setCategory} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Navigate to={`/category/${category}`} />} />
          <Route path="/category/:category" element={category === 'favorites' ? <Favorite /> : <NewsItem category={category} searchQuery={searchQuery} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
