import { useEffect, useRef, useState } from "react";

export default function useHandleFileUpload() {
  const inputFileRef = useRef(null);
  const saveFileRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileUpload = (e) => {
    const { files } = e.target;
    const fileToUrl = URL.createObjectURL(files[0])
    setSelectedFile(files)
   //setImageUrl(files[0])
     setImageUrl(fileToUrl);
  };

  const openFileInput = () => {
    inputFileRef.current.click();
  };

  const handleDownload = () => {
   
  };

  const openSaveFile = () =>{
    
      const content = imageUrl; 
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
    const urlImage = new CustomEvent("imageUrl",{
      detail:imageUrl
    })
    const imageData = new CustomEvent("imageData", {
      detail:imageUrl
    })
    document.dispatchEvent(urlImage)
    document.dispatchEvent(imageData)
  },[selectedFile,imageUrl])

  return {
    selectedFile,
    openFileInput,
    inputFileRef,
    saveFileRef,
    handleFileUpload,
    handleDownload,
    openSaveFile
  };
}
