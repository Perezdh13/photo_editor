import axios from "axios"
import { urlDB } from "../urlDB"

function DeleteBackground(){
    const getImageWithoutBackground = async (image) => {
        const response = await axios.post(`${urlDB}/deleteBackground`, {imageBuffer:image})
        return response.data
    }
    return {getImageWithoutBackground}
}
export default DeleteBackground