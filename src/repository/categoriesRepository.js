import axiosInstance from "../axios/axios";

const categoriesRepository = {
    listAll: async () => {
        return await axiosInstance.get("/categories")
    }
}

export default categoriesRepository;