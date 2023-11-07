import Image from 'next/image'
import iconMaskColor from '../../../../../../public/assets/iconMaskColor.png'
import style from './maskColorButton.module.css'
import { useState } from 'react';
import createMaskColor from '@/app/editor/service/editor 1.0/createMaskColor';

export default function MaskColorButton(){
    const [mask,setMask] = useState(null)
    console.log(mask);

    const handleSelectMask = () =>{
       createMaskColor().newMaskColor().then((data)=>setMask(data))
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