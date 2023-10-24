import style from './AiButton.module.css'
import { useEffect, useState } from 'react';
import CreateImage from '@/app/editor/service/editor 2.0/createImage';
import CreateVariable from '@/app/editor/service/editor 2.0/CreateVariable';
import { data } from 'autoprefixer';

export default function AiButton() {
    const [prompt, setPrompt] = useState(null)
    const [newImage, setNewImage] = useState(false)
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [imageVariable, setImageVariable] = useState(null)
    const [processingImage, setProcessingImage] = useState(false)

   
    console.log(imageVariable);
   
   

const newApiImage = () => {
  CreateImage().getImage(prompt).then((data)=>{setImage(data)})
}

const newApiImageVariable = () => {
    CreateVariable().getImageVariable().then((data)=>{setImageVariable})
}

const mouseOut = () => {
    setTimeout(() => {
        setDropdownVisible(false)
    }, 3000)
}    

const handleCreateImage = ()=>{
    setProcessingImage(true)
    newApiImage()
    setNewImage(false)
}

useEffect(()=>{
    
    const imageData = new CustomEvent("imageData", {
      detail:image
    })
    const processImage = new CustomEvent("processImage", {
        detail:processingImage
    })
 
    document.dispatchEvent(imageData)
    document.dispatchEvent(processImage)
  },[image,processingImage])

return (
        <>
            <button className={style.button} onClick={(() => setDropdownVisible(true))} >
                Ai Editor
            </button>
            {isDropdownVisible && (
                <div className={style.dropdownContent} onMouseOut={mouseOut}>
                    <a href="#" onClick={(()=>setNewImage(true))} >Crear nueva imagen</a>
                    <a href="#" >Modificar imagen</a>
                    <a href="#"onClick={(()=>newApiImageVariable())}>Crear una variante</a>
                </div>
            )}
            {newImage && (
                <div className={style.inputContainer}>
                <textarea onChange={((e)=>setPrompt(e.target.value))} className={style.textarea} type='text'/>
                <button onClick={handleCreateImage}>
                    Generar
                </button>
                </div>
            )}
        </>
    )
}