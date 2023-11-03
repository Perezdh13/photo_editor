import { useEffect, useRef, useState } from "react";

export default function useHandleFileUpload() {
  const inputFileRef = useRef(null);
  const saveFileRef = useRef(null);
  const [imageBase64, setImageBase64] = useState(null)
  const [imageData, setImageData] = useState(null)
 

  const handleFileUpload = (f) => {
    const selectedFile = f.target.files[0];
    setImageData(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
        setImageBase64(reader.result);
    };
    reader.readAsDataURL(selectedFile)
};



  const openFileInput = () => {
    inputFileRef.current.click();
  };

  const handleDownload = () => {
   
  };

  const saveFile = () =>{
   

      const content = imageData; 
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'image.png'; 
      document.body.appendChild(a);
      a.click();
  
      URL.revokeObjectURL(url);
     };
  

  useEffect(()=>{
    // const aiImageData = event =>{
    //   setImageUrl(event.detail)
    // }

    const eventImageBase64 = new CustomEvent("imageBase64", {
      detail: imageBase64
    })

    
    const eventImageData = new CustomEvent("imageData", {
      detail:imageData
    })
    // document.addEventListener('imageData',aiImageData)
    document.dispatchEvent(eventImageBase64)
    document.dispatchEvent(eventImageData)
  },[imageBase64,imageData])

  return {
    openFileInput,
    inputFileRef,
    saveFileRef,
    handleFileUpload,
    handleDownload,
    saveFile
  };
}
