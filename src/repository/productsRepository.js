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
    },
    create: async (productCreate) => {
        return axiosInstance.post("/products", productCreate)
    },
    update: async (productUpdate, id) => {
        return axiosInstance.put(`/products/${id}`, productUpdate, id)
    }
}


export default productsRepository;