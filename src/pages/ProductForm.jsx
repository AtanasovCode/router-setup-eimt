import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import categoriesRepository from "../repository/categoriesRepository";
import manufacturersRepository from "../repository/manufacturersRepository";
import productsRepository from "../repository/productsRepository";
import { Container, Typography } from "@mui/material";


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
            })
            .catch((e) => console.error(e))
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
        <Container sx={{ mt: 10 }}>
            {
                loading ?
                    <Typography>Loading...</Typography>
                    :
                    <Container>
                        <Typography variant="h2" sx={{ m: 4 }}>
                            Product Form
                        </Typography>
                    </Container>
            }
        </Container>
    );
}

export default ProductForm;