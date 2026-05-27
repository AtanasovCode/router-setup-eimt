import { useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './theme'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'

// Routes:
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import Navbar from './pages/Navbar'
import CategoryList from './pages/CategoryList'
import ManufacturerList from './pages/ManufacturerList'
import ProductForm from './pages/ProductForm'




function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Container sx={{ mt: 15 }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/manufacturers" element={<ManufacturerList />} />
            <Route path="/new-product" element={<ProductForm />} />
            <Route path="/edit-product/:id" element={<ProductForm />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
