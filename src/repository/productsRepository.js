import axiosInstance from "../axios/axios"


const productsRepository = {
    findAll: async () => {
        return axiosInstance.get("/products")
    },
    findById: async () => {
        return axiosInstance.get(`/products/${id}`)
    }
}


export default productsRepository;