import style from './AiButton.module.css'
import { useEffect, useState } from 'react';
import CreateImage from '@/app/editor/service/2.0 editor/createImage';

export default function AiButton() {
    const [prompt, setPrompt] = useState(null)
    const [newImage, setNewImage] = useState(false)
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [processingImage, setProcessingImage] = useState(false)

    console.log(image);
    console.log(prompt);
   

const newApiImage = () => {
  CreateImage().getImage(prompt).then((data)=>{setImage(data)})
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
                    <a href="#"onClick={(()=>createVariationImage())}>Crear una variante</a>
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