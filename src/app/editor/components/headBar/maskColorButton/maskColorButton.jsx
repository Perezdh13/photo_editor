import Image from 'next/image'
import colorSelect from './../../../../../../public/assets/colorSelect.png'
import iconMaskColor from '../../../../../../public/assets/iconMaskColor.png'
import style from './maskColorButton.module.css'
import { useContext, useMemo, useState } from 'react';
import createMaskColor from '@/app/editor/service/editor 1.0/createMaskColor';
import ellipseIcon from '../../../../../../public/assets/ellipse.png'
import lassoIcon from '../../../../../../public/assets/lasso.png'
import paintIcon from '../../../../../../public/assets/paint.png'
import palleteIcon from '../../../../../../public/assets/palette.png'
import contrastIcon from '../../../../../../public/assets/contrast.png'


import { GlobalVariables } from '@/app/editor/hooks/globalVariables';
import { SketchPicker as Picker } from 'react-color';
import ActionButton from '../actionButton/ActionButton';

export default function MaskColorButton() {
  const { image, setImage } = useContext(GlobalVariables)
  const { color, setColor } = useContext(GlobalVariables)
  const { isColorSelect, setIsColorSelect } = useContext(GlobalVariables)
  const { colorHSV, setColorHSV } = useContext(GlobalVariables)

  const [mask, setMask] = useState(null)
  const [context, setContext] = useState(null)
  const [isClikedCreateMask, setIsClikedCreateMask] = useState(false)
  const [isPickerVisible, setIsPickerVisible] = useState(false)
  const [maskImage, setMaskImage] = useState(null)
  const [resultImage, setResultImage] = useState(null)


  console.log(maskImage);

  const handleCreateMask = () => {
    setIsClikedCreateMask(!isClikedCreateMask)
  }

  const handleColorSelect = () => {
    setIsColorSelect(!isColorSelect)
  }

  const handleSelectMask = () => {
    if (maskImage === null) {
      createMaskColor().newMaskColor(image, colorHSV).then((data) => {
        setImage("data:image/png;base64," + data.Mask),
        setMaskImage("data:image/png;base64," + data.Mask),
        setResultImage("data:image/png;base64," + data.Result)
      })
    } else {
      const targetImage = image === resultImage ? maskImage : resultImage;
      setImage(targetImage);
    }
  }

  const handlePickerVisible = () => {
    setIsPickerVisible(!isPickerVisible)
  }

  function setColorPicker(colorData) {
    const { r, g, b, a } = colorData.rgb;
    const rgba = `rgba(${r},${g},${b},${a})`;
    setColor(rgba);

    const colorhsv = (colorData.hsv)
    const scaleH = Math.round(colorhsv.h)
    const scaleS = Math.round(colorhsv.s * 255)
    const scaleV = Math.round(colorhsv.v * 255)

    const formatColorHSV = `${scaleH},${scaleS},${scaleV}`
    setColorHSV([scaleH,scaleS,scaleV])
  }
  console.log(colorHSV);


  return (
    <>
      <button src={iconMaskColor} className={style.button} onClick={handleCreateMask}> Crear una mascara</button>
      {isClikedCreateMask === true ? (
        <div className={style.maskBar}>

          <ActionButton src={colorSelect} alt='color select' width={30} onClick={handleColorSelect} popupText="Selector color" />

          <ActionButton src={paintIcon} alt='color select' width={30} popupText="Cambiar color" />

          {/* <ActionButton src={lassoIcon} alt='color select' width={30} popupText="" /> */}

          <ActionButton src={ellipseIcon} alt='color select' width={30} popupText="Mascara Elipse" />

          <ActionButton src={contrastIcon} alt='color select' width={30} onClick={handleSelectMask} popupText="Contraste" />

          <ActionButton src={palleteIcon} alt='color select' width={30} onClick={handlePickerVisible} popupText="Paleta de color" />

          <div className={style.colorSelect} style={{ backgroundColor: color }} />

        </div>) : (null)}
      {isPickerVisible === true ? (
        <section>
          <Picker color={color} onChange={setColorPicker} className={style.picker} />
        </section>
      ) : (null)}

    </>
  )
}