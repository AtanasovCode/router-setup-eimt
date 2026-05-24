import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard"
import products from "../data/products";


const ProductList = () => {
    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Our Products
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ProductList;