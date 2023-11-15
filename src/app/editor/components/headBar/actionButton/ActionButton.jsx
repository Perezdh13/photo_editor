import React, { useState } from 'react';
import Image from 'next/image'
import style from './ActionButton.module.css'

export default function ActionButton({ src, alt, width, onClick, popupText }){
  const [isHovered, setHovered] = useState(false);

  return (
    <div className={style.imageContainer} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <div className={style.buttonWrapper}>
      <Image src={src} alt={alt} width={width} className={style.imageButton} onClick={onClick} />
      {isHovered && <div className={style.popup}>{popupText}</div>}
    </div>
  </div>
  );
};
