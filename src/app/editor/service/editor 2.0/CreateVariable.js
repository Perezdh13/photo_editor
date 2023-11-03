import axios from "axios";
import { urlDB } from "../urlDB";

function CreateVariable() {
    const getImageVariable = async (image) => {       
        console.log(image);
        const response = await axios.post(`${urlDB}/createVariable`, {imageBuffer:image} );
        return response;        
    };
    
    return { getImageVariable };
}

export default CreateVariable;
