import { apiKey } from '@/utils/openAiKey';
import { Configuration, OpenAIApi } from 'openai'
import { useEffect, useState } from 'react';

const configuration = new Configuration({
    apiKey: apiKey,
  });
const openai = new OpenAIApi(configuration);

export default function useGenerateImage(prompt) {
  
  const [image, setImage] = useState(null);


  const generateImage = async () => {
    try {
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      const image_url = response.data.data[0].url;
      setImage(image_url);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  useEffect(() => {
    const imageUrl = new CustomEvent("imageUrl", {
      detail: image,
    });
    document.dispatchEvent(imageUrl);
  }, [image]);

  return  generateImage;
}
