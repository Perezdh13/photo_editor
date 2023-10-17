'use client'
import { apiKey } from '@/utils/openAiKey';
import { Configuration, OpenAIApi } from 'openai'
import { useEffect, useState } from 'react';

const configuration = new Configuration({
    apiKey: apiKey,
  });
const openai = new OpenAIApi(configuration);

export default function useVariationImage(prompt) {
  
    const [image, setImage] = useState(null);
    const [newImage,setNewImage ] = useState(null)
  console.log(image);
  console.log(newImage);
  
  
    const variationImage = async () => {
      try {
      
        const response = await openai.createImageVariation(
          fs.createReadStream(image),
          1,
          "1024x1024"      
        );
        const image_url = response.data.data[0].url;
        setNewImage(image_url);
      } catch (error) {
        console.error("Error fetching image:", error);
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
      document.addEventListener('imageUrl',imageData)
    })
  
    return  variationImage;
  }