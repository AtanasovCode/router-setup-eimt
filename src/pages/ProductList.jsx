import { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import instance from "../axios/axios";
import ProductCard from "../components/ProductCard"


const ProductList = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        instance.get("/products")
            .then((response) => setProducts(response.data))
            .catch((e) => console.error(e))
    }, [])

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Our Products
            </Typography>
            {
                products.length > 0 ? (
                    <Grid container spacing={3}>
                        {products.map((product) => (
                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <div>
                        No Products Found :(
                    </div>
                )
           }
        </Container>
    );
}

export default ProductList;