import { apiKey } from '@/utils/openAiKey';
//import { Configuration, OpenAIApi } from 'openai'
import OpenAI from 'openai';
import { useEffect, useState } from 'react';
// class CustomFormData extends FormData{
//   getHeaders(){
//     return{}
//   }
// }
// const configuration = new Configuration({
//     apiKey: apiKey,
//   formDataCtor: CustomFormData
//   });
// const openai = new OpenAIApi(configuration);
const openai = new OpenAI({
  apiKey:apiKey,
  dangerouslyAllowBrowser: true 
 })

export default function useVariationImage() {
    const [image, setImage] = useState(null)
    const [newImage,setNewImage ] = useState(null)
//   console.log(newImage);
//  console.log(image);
  
  
 
 
 const variationImage = async () => {
   try {
         const buffer = [image]
         buffer.name = 'image.png'
        console.log(buffer);
        const response = await openai.images.createVariation(
          image
       );
       console.log(response); 
        // const image_url = response.data[0].url;
        // setNewImage(image_url);
      } catch (error) {
        if(error.response){
          console.log(error.response.status);
          console.log(error.response.data);
        }else{
          console.log(error.message);
        }
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