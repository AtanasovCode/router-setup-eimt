import { useState } from 'react'
import './App.css'
import { AppBar, Toolbar, Typography } from '@mui/material'
import ProductList from './oages/ProductList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            E-shop
          </Typography>
        </Toolbar>
      </AppBar>
      <ProductList />
    </>
  );
}

export default App;
