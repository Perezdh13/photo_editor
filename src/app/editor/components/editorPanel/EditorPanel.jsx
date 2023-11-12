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
  const {image,setimage, processing, setProcessing, context, setContext} = useContext(GlobalVariables)
  const [color,setColor] = useState("#5524e7")

  

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 10);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel - 10);
  };

  const pickColor = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const pixel = context.getImageData(x, y, 1, 1).data;
    const rgba = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
    setColor(rgba);
  };

  return (
    <div className={style.container}>
      <div className={style.zoomButtons}>
        <HeadBar />
        <button className={style.button}onClick={handleZoomIn}>+</button>
        <button className={style.button} onClick={handleZoomOut}>-</button>
      </div>
      {processing === true ? (
        <Loader />
      ) :
        <div className={style.imageContainer}>
          <img className={style.img} onClick={pickColor} src={image} style={{ cursor:'crosshair', transform: `scale(${zoomLevel / 100})` }} />
        </div>
      }
<div>
        <p>Selected Color:</p>
        <div style={{ width: '50px', height: '50px', backgroundColor: color }}></div>
        <p>{color}</p>
      </div>

    </div>

  );
}