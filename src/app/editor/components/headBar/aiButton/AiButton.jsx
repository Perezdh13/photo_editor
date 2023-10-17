import useGenerateImage from '@/app/editor/hooks/useGenerateImage'
import style from './AiButton.module.css'
import { useState } from 'react';
import useVariationImage from '@/app/editor/hooks/useVariationImage';

export default function AiButton() {
    const [prompt, setPrompt] = useState(null)
    const [newImage, setNewImage] = useState(false)
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const generateImage = useGenerateImage(prompt)
    const createVariationImage = useVariationImage()



const mouseOut = () => {
    setTimeout(() => {
        setDropdownVisible(false)
    }, 3000)
}    

const handleCreateImage = ()=>{
    generateImage()
    setNewImage(false)
}

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