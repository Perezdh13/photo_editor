const { default: axios } = require("axios")
const { urlDB } = require("../urlDB")

function CreateVariable(){
    const getImageVariable = async () => {
        const response = await axios.get(`${urlDB}/createVariable`)
        return response.data
    };
    return {getImageVariable}
}

export default CreateVariable