
import axios from "axios"
import { urlDB } from "../urlDB"

function createMaskColor(){
    const newMaskColor = async () => {
        const response = await axios.get(`${urlDB}/createMaskColor`)
        return response.data
    }
    return {newMaskColor}
}
export default createMaskColor