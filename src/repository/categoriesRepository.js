import axiosInstance from "../axios/axios";


const categoriesRepository = {
    findAll: async () => {
        return await axiosInstance.get("/categories")
    }
}

export default categoriesRepository;