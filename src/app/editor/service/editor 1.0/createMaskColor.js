
import axios from "axios"
import { urlDB } from "../urlDB"

function createMaskColor(){
    const newMaskColor = async (image) => {
        const response = await axios.post(`${urlDB}/createMaskColor`,
        {imageBuffer: image})
        return response.data
    }
    return {newMaskColor}
}
export default createMaskColor