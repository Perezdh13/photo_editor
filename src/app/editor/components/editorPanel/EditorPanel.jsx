'use client'
import HeadBar from '../headBar/HeadBAr'
import style from './EditorPanel.module.css'
import useHandleFileUpload from '../../hooks/useHandleFileSelection'
import { useEffect, useState } from 'react'
import Loader from '../loader/Loader'


export default function EditorPanel() {
  const [imageData, setImageData] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(90);
  const [isImage, setIsImage] = useState(false)
  const [processingImage, setProcessingImage] = useState(false)


  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 10);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel - 10);
  };

  useEffect(() => {
    const imageData = event => {
      setImageData(event.detail)
      if (event.detail) { setImageData((event.detail)) }

    }
    const processImage = event => {
      setProcessingImage(event.detail)
    }
    document.addEventListener('imageData', imageData)
    document.addEventListener('processImage', processImage)
  })

  return (
    <div className={style.container}>
      <div className={style.zoomButtons}>
        <HeadBar />
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
      {processingImage === true && imageData === null ? (
        <Loader />
      ) :
        <div className={style.imageContainer}>
          <img className={style.img} src={imageData} style={{ transform: `scale(${zoomLevel / 100})` }} />
        </div>
      }


    </div>

  );
}