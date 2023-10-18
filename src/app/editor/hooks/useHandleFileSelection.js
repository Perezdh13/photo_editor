import { useEffect, useRef, useState } from "react";

export default function useHandleFileUpload() {
  const inputFileRef = useRef(null);
  const saveFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileUpload = (e) => {
    const { files } = e.target;
    setSelectedFile(files[0]);
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
    const imageFile = new CustomEvent("imageFile",{
      detail:selectedFile
    })
    document.dispatchEvent(URL.createObjectURL(imageFile))
  },[selectedFile])

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
