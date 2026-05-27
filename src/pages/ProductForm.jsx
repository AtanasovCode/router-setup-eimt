import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoriesRepository from "../repository/categoriesRepository";
import manufacturersRepository from "../repository/manufacturersRepository";
import productsRepository from "../repository/productsRepository";
import {
    Container,
    Typography,
    TextField,
    Box,
    MenuItem,
    Button
} from "@mui/material";


const ProductForm = () => {

    const { id } = useParams()
    const editMode = Boolean(id)

    const [product, setProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        category_id: '',
        manufacturer_id: ''
    })
    const [categories, setCategories] = useState([])
    const [manufacturers, setManufacturers] = useState([])
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        Promise.all([
            categoriesRepository.listAll(),
            manufacturersRepository.listAll(),
            ...(editMode ? [productsRepository.findById(id)] : [])
        ])
            .then(([categoriesResponse, manufacturersResponse, productsResponse]) => {
                setCategories(categoriesResponse.data)
                setManufacturers(manufacturersResponse.data)

                if (editMode && productsResponse) {
                    const { name, price, quantity, category, manufacturer } = productsResponse.data
                    setProduct({
                        name,
                        price,
                        quantity,
                        category_id: category?.id ?? '',
                        manufacturer_id: manufacturer?.id ?? ''
                    })
                }

                setNotFound(false)
            })
            .catch((e) => {
                console.error(e)
                setNotFound(true)
            })
            .finally(() => setLoading(false))
    }, [id])


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


    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            name: product.name,
            price: parseFloat(product.price) || 0,
            quantity: parseInt(product.quantity) || 0,
            category_id: parseInt(product.category_id),
            manufacturer_id: parseInt(product.manufacturer_id)
        }

        try {
            await productsRepository.update(payload, id)
            navigate("/")
        }
        catch (e) {
            console.error(e)
            setNotFound(true)
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
                                <Box
                                    component="form"
                                    onSubmit={editMode ? handleUpdate : handleSubmit}
                                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                                >
                                    <Typography variant="h4" sx={{ mb: 2 }}>
                                        Product Form
                                    </Typography>
                                    <TextField
                                        name="name"
                                        label="Product Name"
                                        value={product.name}
                                        variant="filled"
                                        type="text"
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        name="price"
                                        label="Price"
                                        value={product.price}
                                        variant="filled"
                                        type="number"
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        name="quantity"
                                        label="Quantity"
                                        value={product.quantity}
                                        variant="filled"
                                        type="number"
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        name="category_id"
                                        label="Category"
                                        select
                                        value={product.category_id}
                                        onChange={handleChange}
                                        variant="filled"
                                        required
                                    >
                                        {
                                            categories.map((cat) => {
                                                return (
                                                    <MenuItem key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                    </TextField>
                                    <TextField
                                        name="manufacturer_id"
                                        label="Manufacturer"
                                        select
                                        value={product.manufacturer_id}
                                        variant="filled"
                                        onChange={handleChange}
                                        required

                                    >
                                        {
                                            manufacturers.map((man) => {
                                                return (
                                                    <MenuItem key={man.id} value={man.id}>
                                                        {man.name}
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                    </TextField>
                                    <Button type="submit" variant="contained">
                                        {
                                            editMode ? "Update" : "Submit"
                                        }
                                    </Button>
                                </Box>
                        }
                    </Box>
            }
        </Container>
    );
}

export default ProductForm;