import { apiKey } from '@/utils/openAiKey';
import { Configuration, OpenAIApi } from 'openai'
import { useEffect, useState } from 'react';

const configuration = new Configuration({
    apiKey: apiKey,
  });
const openai = new OpenAIApi(configuration);


export default function useVariationImage() {
    const image = 'https://wwwhatsnew.com/wp-content/uploads/2018/08/Las-mejores-paginas-web-para-descargar-imagenes-sin-derecho-de-autor.jpg'
     const [newImage,setNewImage ] = useState(null)
  console.log(image);
 
  
  const buffer = [image]
  buffer.name = "image.png"
        console.log(buffer);
  
  const variationImage = async () => {
     if(image){
       try {
        
        const response = await openai.createImageVariation(
          buffer,
          1,
          "1024x1024"      
        );
        const image_url = response.data.data[0].url;
        setNewImage(image_url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }else{
      console.error("Imagen no tiene un valor")
    }
    };
    useEffect(() => {
      const imageUrl = new CustomEvent("imageUrl", {
        detail: newImage,
      });
      document.dispatchEvent(imageUrl);
    }, [newImage]);
  
    useEffect(()=>{
      const imageData = event =>{
        setImage(event.detail)
      }
      document.addEventListener('imageData',imageData)
    })
  
    return  variationImage;
  }