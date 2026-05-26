import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import manufacturersRepository from "../repository/manufacturersRepository";


const ManufacturerList = () => {

    const [manufacturers, setManufacturers] = useState([])
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(true)

    useEffect(() => {
        manufacturersRepository.listAll()
            .then((response) => {
                setManufacturers(response.data)
                setNotFound(false)
            })
            .catch((e) => console.error(e))
            .finally(() => setLoading(false))
    }, [])

    return(
        <Container sx={{ mt: 10 }}>
            {
                loading ?
                <Typography>
                    Loading...
                </Typography>
                :
                <Container>
                    {
                        notFound ? 
                        <Typography>
                            Manufacturers not found :(
                        </Typography>
                        :
                        <Container>
                            {
                                manufacturers.map((manufacturer) => {
                                    return (
                                        <Typography>
                                            {manufacturer.name}
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

export default ManufacturerList;