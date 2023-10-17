import useHandleFileUpload from "@/app/editor/hooks/useHandleFileSelection";
import { useState } from "react";
import style from './FileButton.module.css'

export default function FileButton() {
    const { selectedFile, openFileInput, inputFileRef, handleFileUpload } = useHandleFileUpload()
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
        <>
            <input
                style={{ display: "none" }}
                accept=".png,jpeg"
                ref={inputFileRef}
                onChange={handleFileUpload}
                type="file"
            />
            <button className={style.button} onClick={(() => setDropdownVisible(true))} >
                Archivo
            </button>
            {isDropdownVisible && (
                <div className={style.dropdownContent} onMouseOut={mouseOut}>
                    <a href="#" onClick={onButtonClick}>Abrir</a>
                    <a href="#">Guardar</a>
                    <a href="#">Guardar como ...</a>
                </div>
            )}
        </>
    )
}