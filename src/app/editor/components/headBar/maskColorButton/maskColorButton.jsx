import Image from 'next/image'
import iconMaskColor from '../../../../../../public/assets/iconMaskColor.png'
import style from './maskColorButton.module.css'
import { useContext, useState } from 'react';
import createMaskColor from '@/app/editor/service/editor 1.0/createMaskColor';
import { GlobalVariables } from '@/app/editor/hooks/globalVariables';

export default function MaskColorButton(){
    const {image,setImage} = useContext(GlobalVariables)
    const [mask,setMask] = useState(null)
    console.log(mask);

    const handleSelectMask = () =>{
       createMaskColor().newMaskColor(image).then((data)=>setImage("data:image/png;base64," + data))
    }

    return(
        <>
        <Image
                    src={iconMaskColor}
                    alt="icono mascara de color"
                    className={style.button}
                    width={30}
                    height={30}
                    onClick={handleSelectMask}
                />
               
        </>
    )
}