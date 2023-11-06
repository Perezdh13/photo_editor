import { useContext, useEffect, useRef, useState } from "react";
import { GlobalVariables } from "./globalVariables";

export default function useHandleFileUpload() {
  const inputFileRef = useRef(null);
  const saveFileRef = useRef(null);
  const {image, setImage} = useContext(GlobalVariables)

  const handleFileUpload = (f) => {
    const selectedFile = f.target.files[0];
   

    const reader = new FileReader();
    reader.onloadend = () => {
        setImage(reader.result);
    };
    reader.readAsDataURL(selectedFile)
};



  const openFileInput = () => {
    inputFileRef.current.click();
  };

  const handleDownload = () => {
   
  };

  const saveFile = () =>{
   

      const content = image; 
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'image.png'; 
      document.body.appendChild(a);
      a.click();
  
      URL.revokeObjectURL(url);
     };
  

  

  return {
    openFileInput,
    inputFileRef,
    saveFileRef,
    handleFileUpload,
    handleDownload,
    saveFile
  };
}
