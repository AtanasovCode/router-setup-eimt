import { Typography } from "@mui/material";
import ProductCard from "../components/ProductCard"

const ProductList = () => {
    return (
        <div>
            <Typography variant="h2" sx={{ mb: 4 }}>
                Product List
            </Typography>
            <ProductCard />
        </div>
    );
}

export default ProductList;