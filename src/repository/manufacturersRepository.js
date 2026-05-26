import axiosInstance from "../axios/axios";


const manufacturersRepository = {
    listAll: async () => {
        return await axiosInstance.get("/manufacturers")
    }
}

export default manufacturersRepository;