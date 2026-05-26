import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import categoriesRepository from "../repository/categoriesRepository";
import { Container, Typography, Button, Grid } from "@mui/material";


const CategoryList = () => {

    const [categories, setCategories] = useState([])
    const [notFound, setNotFound] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        categoriesRepository.listAll()
            .then((response) => {
                setCategories(response.data)
                setNotFound(false)
            })
            .catch((e) => console.error(e))
            .finally(() => setLoading(false))
    }, [])


    return (
        <Container sx={{ mt: 10 }}>
            {
                loading ?
                    <Container>
                        <Typography>
                            Loading...
                        </Typography>
                    </Container>
                    :
                    <Container>
                        {
                            notFound ?
                                <Container>
                                    <Typography>
                                        No Categories Found :(
                                    </Typography>
                                </Container>
                                :
                                <Container>
                                    {
                                        categories.map((category) => {
                                            return (
                                                <Typography>
                                                    {category.name}
                                                </Typography>
                                            );
                                        })
                                    }
                                </Container>
                        }
                    </Container>
            }
        </Container>
    );
}

export default CategoryList;