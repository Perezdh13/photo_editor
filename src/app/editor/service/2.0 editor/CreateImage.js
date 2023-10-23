import axios from "axios"
import { urlDB } from "../urlDB"


function CreateImage() {
    const getImage = async (prompt) => { 
      const response = await axios.get(`${urlDB}/newImage?prompt=${prompt}`);
      return response.data;
    };
  
    return { getImage };
  }
  
export default CreateImage