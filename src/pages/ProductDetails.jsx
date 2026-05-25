import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, CardMedia, Paper } from "@mui/material";
import productsRepository from "../repository/productsRepository";


const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState()
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        productsRepository.findById(id)
            .then((response) => {
                setNotFound(false)
                setProduct(response.data)
            })
            .catch((e) => {
                console.error(e)
                setNotFound(true)
            })
            .finally(() => setLoading(false))
    }, [id])

    if (notFound) {
        return (
            <Container sx={{ py: 5 }}>
                <Typography variant="h5">Product not found.</Typography>
                <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/")}>
                    Back to Products
                </Button>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 5 }} maxWidth="sm">
            {
                loading ?
                    <div>
                        Loading
                    </div>
                    :
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h4" sx={{ mt: 2 }}>{product.name}</Typography>
                        <Typography variant="h5" sx={{ my: 1 }}>${product.price}</Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>{product.description}</Typography>
                        <Button variant="contained" sx={{ mr: 1 }}>Add to Cart</Button>
                        <Button variant="outlined" onClick={() => navigate("/")}>Back</Button>
                    </Paper>
            }
        </Container>
    );
}

export default ProductDetails;