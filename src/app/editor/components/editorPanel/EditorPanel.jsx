'use client'
import HeadBar from '../headBar/HeadBAr'
import style from './EditorPanel.module.css'
import useHandleFileUpload from '../../hooks/useHandleFileSelection'
import { useContext, useEffect, useState } from 'react'
import Loader from '../loader/Loader'
import { GlobalVariables } from '../../hooks/globalVariables'


export default function EditorPanel() {
  const [imageData, setImageData] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(90);
  const [isImage, setIsImage] = useState(false)
  const [processingImage, setProcessingImage] = useState(false)
  const {image,setimage, processing, setProcessing} = useContext(GlobalVariables)


  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 10);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel - 10);
  };

 

  return (
    <div className={style.container}>
      <div className={style.zoomButtons}>
        <HeadBar />
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
      {processing === true ? (
        <Loader />
      ) :
        <div className={style.imageContainer}>
          <img className={style.img} src={image} style={{ transform: `scale(${zoomLevel / 100})` }} />
        </div>
      }


    </div>

  );
}