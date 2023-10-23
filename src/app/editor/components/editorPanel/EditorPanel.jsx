'use client'
import HeadBar from '../headBar/HeadBAr'
import style from './EditorPanel.module.css'
import useHandleFileUpload from '../../hooks/useHandleFileSelection'
import { useEffect, useState } from 'react'
import Loader from '../loader/Loader'


export default function EditorPanel(){
  const [file, setFile] = useState(null);
  const [imageData,setImageData] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(90);
  const [isImage,setIsImage] = useState(false)
  const [processingImage, setProcessingImage] = useState(false)

  console.log(imageData);
console.log(imageUrl)



// useEffect(()=>{
//   if(imageData){
//   setImageUrl(URL.createObjectURL(imageData))
//   }
// },[imageData])

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
    const processImage = event => {
      setProcessingImage(event.detail)
    }
   document.addEventListener('imageData',imageData)
   document.addEventListener('processImage',processImage)
  })
  
    return (
      <div className={style.container}>
        <div className={style.zoomButtons}>
        <HeadBar  /> 
          <button onClick={handleZoomIn}>Zoom In</button>
          <button onClick={handleZoomOut}>Zoom Out</button>
        </div>
          {processingImage === true && imageUrl === null ? (
          <Loader/>           
          ):
          <div className={style.imageContainer}>
          <img className={style.img} src={imageUrl}  style={{ transform: `scale(${zoomLevel / 100})` }}/>
          </div>   
          }
          
          
        </div>
    
    );
  }