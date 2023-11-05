'use client'
import React, { useContext, useEffect, useState } from 'react';
import style from './ChatPanel.module.css';
import Image from 'next/image';
import CreateImage from '@/app/editor/service/editor 2.0/CreateImage';
import CreateVariable from '@/app/editor/service/editor 2.0/CreateVariable';
import { GlobalVariables } from '../../hooks/globalVariables';


export default function ChatPanel() {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isNewImageVisible, setIsNewImageVisible] = useState(false)
    const [isVariationImageVisible, setIsVariationImageVisible] = useState(false)
    const [prompt, setPrompt] = useState(null)
    const {image, setImage, processing, setProcessing} = useContext(GlobalVariables)
    

    console.log(image);

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    }

    const toggleNewImageVisibility = () => {
        setIsNewImageVisible(!isNewImageVisible)
    }

    const toggleVariationVisibility = () => {
        setIsVariationImageVisible(!isVariationImageVisible)
        setProcessing(true)
        newApiVariationImage()
    }

    const newApiImage = () => {
        CreateImage().getImage(prompt).then((data) => { setImage(data), setProcessing(false) })
    }

    const newApiVariationImage = () => {
        CreateVariable().getImageVariable(image).then((data) => { 
        setImage(data.data),
        setProcessing(false)
        })
    }

    const handleCreateImage = () => {
        setProcessing(true)
        newApiImage()
    }

    
    

    return (
        <div className={style.container}>
            {isChatVisible === true ? (
                <div className={style.overlayDiv}>
                    <button className={style.closeButton} onClick={toggleChatVisibility}> close </button>
                    <div>
                        <p>Hola soy Aythen, en que puedo ayudarte?</p>
                        <ul>
                            <li className={style.li} onChange={((e) => setPrompt(e.target.value))} onClick={toggleNewImageVisibility}> Quiero crear una foto</li>
                            <li className={style.li} onClick={toggleVariationVisibility}> Quiero crear una foto parecida a la mia</li>
                            <li className={style.li}> Quiero eliminar un fondo</li>
                        </ul>
                    </div>
                    {isNewImageVisible === true ? (
                        <div>
                            <p> Perfecto sobre que quieres que sea la imagen</p>
                            <textarea onChange={((e) => setPrompt(e.target.value))}></textarea>
                            <button onClick={handleCreateImage}>Crear</button>
                        </div>
                    ) : (null)}
                    {isVariationImageVisible === true ? (
                        <div>
                            <p> Vale, vamos a ver que se me ocurre!</p>
                        </div>
                    ) : (null)}

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
