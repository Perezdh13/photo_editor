import { useRef, useState } from "react";

export default function useHandleFileUpload() {
  const inputFileRef = useRef(null);
  const saveFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);

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
