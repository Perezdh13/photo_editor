import useHandleFileUpload from "@/app/editor/hooks/useHandleFileSelection";
import { useState } from "react";
import style from './FileButton.module.css'

export default function FileButton() {
    const { selectedFile, openFileInput, inputFileRef,saveFileRef, handleFileUpload,handleDownload, openSaveFile,saveFile } = useHandleFileUpload()
    const [isDropdownVisible, setDropdownVisible] = useState(false);


    const openButton = () => {
        openFileInput();
    };

    const saveButton=()=>{
        saveFile();
    }
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
                    <a href="#" onClick={openButton}>Abrir</a>
                    <a href="#" onClick={saveButton}>Guardar</a>
                    <a href="#">Guardar como ...</a>
                </div>
            )}
        </>
    )
}