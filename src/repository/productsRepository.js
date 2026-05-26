import axiosInstance from "../axios/axios"


const productsRepository = {
    findAll: async () => {
        return axiosInstance.get("/products")
    },
    findById: async (id) => {
        return axiosInstance.get(`/products/${id}`)
    },
    delete: async (id) => {
        return axiosInstance.delete(`/products/${id}`)
    }
}


export default productsRepository;