'use client'
import React, { useEffect, useState } from 'react';
import style from './ChatPanel.module.css';
import Image from 'next/image';
import CreateImage from '@/app/editor/service/editor 2.0/CreateImage';


export default function ChatPanel() {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isNewImageVisible, setIsNewImageVisible] = useState(false)
    const [isVariationImageVisible, setIsVariationImageVisible] = useState(false)
    const [prompt, setPrompt] = useState(null)
    const [image, setImage] = useState(null)
    const [processingImage, setProcessingImage] = useState(false)
    const [newImage, setNewImage] = useState(false)
    

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    }

    const toggleNewImageVisibility = () =>{
        setIsNewImageVisible(!isNewImageVisible)
    }

    const newApiImage = () => {
        CreateImage().getImage(prompt).then((data)=>{setImage(data)})
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
        <div className={style.container}>
            {isChatVisible === true ? (
                <div className={style.overlayDiv}>
                    <button className={style.closeButton} onClick={toggleChatVisibility}> close </button>
                    <seccion>
                        <p>Hola soy Aythen, en que puedo ayudarte?</p>
                        <ul>
                            <li className={style.li} onChange={((e)=>setPrompt(e.target.value))} onClick={toggleNewImageVisibility}> Quiero crear una foto</li>
                            <li className={style.li}> Quiero crear una foto parecida a la mia</li>
                            <li className={style.li}> Quiero eliminar un fondo</li>
                        </ul>
                    </seccion>
                    {isNewImageVisible ===true ?(
                    <section>
                        <p> Perfecto sobre que quieres que sea la imagen</p>
                        <textarea onChange={((e)=>setPrompt(e.target.value))}></textarea>
                        <button onClick={handleCreateImage}>Crear</button>
                    </section>
                    ):(null)}
                    {isVariationImageVisible === true ?(
                    <seccion>
                        <p> Vale, vamos a ver que se me ocurre!</p>
                    </seccion>
                    ):(null)}
                    
                </div>
            ) : (
                <Image
                    src='/logoAythen.png'
                    alt="Logo Aythen"
                    className={style.logo}
                    width={50}
                    height={50}
                    onClick={toggleChatVisibility}
                />
            )}

        </div>
    );
}
