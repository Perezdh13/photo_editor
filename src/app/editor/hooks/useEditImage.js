import { apiKey } from '@/utils/openAiKey';
import { Configuration, OpenAIApi } from 'openai'
import { useEffect, useState } from 'react';

const configuration = new Configuration({
    apiKey: apiKey,
  });
const openai = new OpenAIApi(configuration);
export default function useEditImage(){
    const [image, setImage] = useState(null)

    const editImage = async () =>{

    }
    useEffect(() => {
        const imageUrl = new CustomEvent("imageUrl", {
          detail: image,
        });
        document.dispatchEvent(imageUrl);
      }, [image]);
}