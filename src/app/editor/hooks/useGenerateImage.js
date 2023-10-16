import { apiKey } from '@/utils/openAiKey';
import { Configuration, OpenAIApi } from 'openai'
import { useEffect, useState } from 'react';

const configuration = new Configuration({
    apiKey: apiKey,
  });
const openai = new OpenAIApi(configuration);

export default function useGenerateImage() {
  const [image, setImage] = useState(null);


  const generateImage = async () => {
    try {
      const response = await openai.createImage({
        prompt: "un logotipo de una empresa que se dedica a la creacion de displays y accesorios para simracing y vehiculos de competicion. el nombre de la empresa es: PRZ performance",
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
