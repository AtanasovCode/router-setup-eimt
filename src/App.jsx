import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@mui/material'

// Routes:
import ProductList from './oages/ProductList'
import ProductDetails from './oages/ProductDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            E-shop
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
