import { useState } from "react";
import { useNavigate } from "react-router-dom";
import categoriesRepository from "../repository/categoriesRepository";
import manufacturersRepository from "../repository/manufacturersRepository";
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
    const [manufacturers, setManufacturers] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const handleChange((e) => {
        setProducts({...product, [e.target.name]: e.target.value})
    })

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


    return (
        <Container></Container>
    );
}