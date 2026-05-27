import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import categoriesRepository from "../repository/categoriesRepository";
import manufacturersRepository from "../repository/manufacturersRepository";
import productsRepository from "../repository/productsRepository";
import { Container, Typography, TextField, Box } from "@mui/material";


const ProductForm = () => {

    const [product, setProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        category_id: '',
        manufacturer_id: ''
    })
    const [categories, setCategories] = useState([])
    const [categoryID, setCategoryID] = useState()
    const [manufacturers, setManufacturers] = useState([])
    const [manufacturerID, setManufacturerID] = useState()
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        Promise.all([
            categoriesRepository.listAll(),
            manufacturersRepository.listAll()
        ])
            .then(([categoriesResponse, manufacturersResponse]) => {
                setCategories(categoriesResponse.data)
                setManufacturers(manufacturersResponse.data)
                setNotFound(false)
            })
            .catch((e) => {
                console.error(e)
                setNotFound(true)
            })
            .finally(() => setLoading(false))
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            name: product.name,
            price: parseFloat(product.price),
            quantity: parseInt(product.quantity),
            category_id: parseInt(product.category_id),
            manufacturer_id: parseInt(product.manufacturer_id)
        }

        try {
            await productsRepository.create(payload)
            navigate("/")
        }
        catch (e) {
            console.error(e)
        }
        finally {
            setLoading(false)
        }
    }




    return (
        <Container maxWidth="sm">
            {
                loading ?
                    <Typography>Loading...</Typography>
                    :
                    <Box>
                        {
                            notFound ?
                                <Typography>
                                    Error trying to fetch data :(
                                </Typography>
                                :
                                <Box component="form" onSubmit={handleSubmit}>
                                    <Typography variant="h4" sx={{ mb: 2 }}>
                                        Product Form
                                    </Typography>
                                    <TextField
                                        name="name"
                                        label="Product Name"
                                        variant="outlined"
                                        type="text"
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        sx={{ 
                                            borderRadius: "12px",
                                            padding: "5px",
                                        }}
                                    />

                                </Box>
                        }
                    </Box>
            }
        </Container>
    );
}

export default ProductForm;