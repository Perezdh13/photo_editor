'use client'
import { useRef, useState } from 'react';
import style from './HeadBar.module.css'
import useHandleFileUpload from '../../hooks/useHandleFileSelection';
import usePromtInputWindow from '../../hooks/usePromtInputWindow';
import useGenerateImage from '../../hooks/useGenerateImage';

export default function HeadBar() {
    const generateImage = useGenerateImage()
    const openWindow = usePromtInputWindow()
    const { selectedFile, openFileInput, inputFileRef, handleFileUpload } = useHandleFileUpload()
    const file = selectedFile
    const [inputValue, setInputValue] = useState(''); // Agregar un estado para el valor del input

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    
    const onButtonClick = () => {
        openFileInput();
    };


    const mouseOut = () => {
        setTimeout(() => {
            setDropdownVisible(false)
        }, 3000)
    }

    return (
        <div className={style.bar}>
            <input
                style={{ display: "none" }}
                accept=".png,jpeg"
                ref={inputFileRef}
                onChange={handleFileUpload}
                type="file"
            />
            <div>
                <button className={style.button} onClick={(() => setDropdownVisible(true))} >
                    Archivo
                </button>
                <button className={style.button} onClick={openWindow} >
                    Generar imagen
                </button>
                <button className={style.button} onClick={generateImage} >
                    Generar imagen api
                </button>
                {isDropdownVisible && (
                    <div className={style.dropdownContent} onMouseOut={mouseOut}>
                        <a href="#" onClick={onButtonClick}>Abrir</a>
                        <a href="#">Guardar</a>
                        <a href="#">Guardar como ...</a>
                    </div>
                )}
            </div>

        </div>
    )
}