import Image from 'next/image'
import colorSelect from './../../../../../../public/assets/colorSelect.png'
import iconMaskColor from '../../../../../../public/assets/iconMaskColor.png'
import style from './maskColorButton.module.css'
import { useContext, useMemo, useState } from 'react';
import createMaskColor from '@/app/editor/service/editor 1.0/createMaskColor';
import ellipseIcon from '../../../../../../public/assets/ellipse.png'
import lassoIcon from '../../../../../../public/assets/lasso.png'
import paintIcon from '../../../../../../public/assets/paint.png'
import { GlobalVariables } from '@/app/editor/hooks/globalVariables';
import { SketchPicker as Picker } from 'react-color';

export default function MaskColorButton() {
  const { image, setImage } = useContext(GlobalVariables)
  const [mask, setMask] = useState(null)
  const [context, setContext] = useState(null)
  const [isClikedCreateMask, setIsClikedCreateMask] = useState(false)
  const { color, setColor } = useContext(GlobalVariables)
  const [isPickerVisible, setIsPickerVisible] = useState(false)
  console.log(color);

  const handleCreateMask = () => {
    setIsClikedCreateMask(!isClikedCreateMask)
  }

  const handleSelectMask = () => {
    createMaskColor().newMaskColor(image).then((data) => setImage("data:image/png;base64," + data))
  }

  const handlePickerVisible = () => {
    setIsPickerVisible(!isPickerVisible)
  }

  function setColorPicker(colorData) {
    const { r, g, b, a } = colorData.rgb; 
    const rgba = `rgba(${r},${g},${b},${a})`; 
    setColor(rgba);
   }


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
          <Image
            src={paintIcon}
            alt='color select'
            width={30}
            className={style.imageButton}
          />
          <Image
            src={lassoIcon}
            alt='color select'
            width={30}
            className={style.imageButton}
          />
          <Image
            src={ellipseIcon}
            alt='color select'
            width={30}
            className={style.imageButton}
          />
          <div className={style.colorSelect} style={{ backgroundColor: color }} onClick={handlePickerVisible} />

        </div>) : (null)}
      {isPickerVisible === true ? (
        <section>
          <Picker color={color} onChange={setColorPicker} className={style.picker} />
        </section>
      ) : (null)}

    </>
  )
}