import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
//import productImage from '../assets/shop.png';

export default function ProductCard({ product }) {
    return (
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1" sx={{ my: 1 }}>${product.price}</Typography>
                <Button variant="contained" fullWidth sx={{ mt: 1 }}>
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
}