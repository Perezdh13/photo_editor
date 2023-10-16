'use client'
import { useRef, useState } from 'react';

export default function useHandleFileUpload  ()  {

  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
   


  const handleFileUpload = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];

      setSelectedFile(files[0]);
    }
  };

  const openFileInput = () => {
    inputFileRef.current.click();
  };

  return {
    selectedFile,
    openFileInput,
    inputFileRef,
    handleFileUpload,
  };
};

 
