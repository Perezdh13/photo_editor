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
    setImageUrl(fileToUrl);
  };

  const openFileInput = () => {
    inputFileRef.current.click();
  };

  const handleDownload = () => {
   
  };

  const openSaveFile = () =>{
     saveFileRef.current.click();
  }

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
