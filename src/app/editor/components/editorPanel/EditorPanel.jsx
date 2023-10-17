'use client'
import HeadBar from '../headBar/HeadBAr'
import style from './EditorPanel.module.css'
import useHandleFileUpload from '../../hooks/useHandleFileSelection'
import { useEffect, useState } from 'react'
import Foto from '../../assets/gunther.png'

export default function EditorPanel(){
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null)
    const [zoomLevel, setZoomLevel] = useState(100);
   
    const handleFileChange = (newFile) => {
      setFile(newFile);
    };

    const handleZoomIn = () => {
      setZoomLevel(zoomLevel + 10);
    };
  
    const handleZoomOut = () => {
        setZoomLevel(zoomLevel - 10);     
    };

    useEffect(()=>{
      const imageData = event =>{
        setImageUrl(event.detail)
      }
      document.addEventListener('imageUrl',imageData)
    })

  
    return (
      <div className={style.container}>
        <div className={style.zoomButtons}>
        <HeadBar  /> 
          <button onClick={handleZoomIn}>Zoom In</button>
          <button onClick={handleZoomOut}>Zoom Out</button>
        </div>
        <div className={style.imageContainer}>
          <img className={style.img} src={imageUrl}  style={{ transform: `scale(${zoomLevel / 100})` }}/>
        </div>      
        </div>
    
    );
  }