import { useContext, useEffect, useRef, useState } from "react";
import { GlobalVariables } from "./globalVariables";

export default function useHandleFileUpload() {
  const inputFileRef = useRef(null);
  const saveFileRef = useRef(null);
  const {image, setImage,context, setContext} = useContext(GlobalVariables)
 


const handleFileUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      setContext(ctx);
      setImage(canvas.toDataURL());
    };
    img.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
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
