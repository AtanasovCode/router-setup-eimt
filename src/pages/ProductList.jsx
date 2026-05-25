import { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import productsRepository from "../repository/productsRepository";
import ProductCard from "../components/ProductCard"


const ProductList = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        productsRepository.findAll()
            .then((response) => setProducts(response.data))
            .catch((e) => console.error(e))
            .finally(() => setLoading(false))
    }, [])

    return (
        <Container sx={{ py: 5 }}>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
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
                    </div>
                )
            }
        </Container>
    );
}

export default ProductList;