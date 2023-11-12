import Image from 'next/image'
import colorSelect from './../../../../../../public/assets/colorSelect.png'
import iconMaskColor from '../../../../../../public/assets/iconMaskColor.png'
import style from './maskColorButton.module.css'
import { useContext, useState } from 'react';
import createMaskColor from '@/app/editor/service/editor 1.0/createMaskColor';
import { GlobalVariables } from '@/app/editor/hooks/globalVariables';
import { NEXT_BUILTIN_DOCUMENT } from 'next/dist/shared/lib/constants';
// import { BlockPicker, SketchPicker } from 'react-color';

export default function MaskColorButton() {
  const { image, setImage } = useContext(GlobalVariables)
  const [mask, setMask] = useState(null)
  const [context, setContext] = useState(null)
  const [isClikedCreateMask, setIsClikedCreateMask] = useState(false)
  const [color, setColor] = useState(null)
  console.log(color);

  const handleCreateMask = () => {
    setIsClikedCreateMask(!isClikedCreateMask)
  }

  const handleSelectMask = () => {
    createMaskColor().newMaskColor(image).then((data) => setImage("data:image/png;base64," + data))
  }

  
  const pickColor = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const pixel = context.getImageData(x, y, 1, 1).data;
    const rgba = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
    setColor(rgba);
  };

  return (
    <>
      <button src={iconMaskColor} className={style.button} onClick={handleCreateMask}> Crear una mascara</button>
      {isClikedCreateMask === true ? (
      <div className={style.maskBar}>
        <Image 
          src={colorSelect}
          alt='color select'
          width={30}
          className={style.imageButton}
          />
      </div>) : (null)}
      
    </>
  )
}