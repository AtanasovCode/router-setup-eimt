import axiosInstance from "../axios/axios";


const manufacturersRepository = {
    findAll: async () => {
        return await axiosInstance.get("/manufacturers")
    }
}

export default manufacturersRepository;