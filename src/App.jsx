import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@mui/material'

// Routes:
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import Navbar from './pages/Navbar'
import CategoryList from './pages/CategoryList'




function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<CategoryList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
