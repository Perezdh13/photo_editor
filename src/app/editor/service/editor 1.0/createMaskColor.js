
import axios from "axios"
import { urlDB } from "../urlDB"

function createMaskColor(){
    const newMaskColor = async (image, hsvValues) => {
        const response = await axios.post(`${urlDB}/createMaskColor`,
        {imageBuffer: image,
        colorHSV: hsvValues})
        return response.data
    }
    return {newMaskColor}
}
export default createMaskColor