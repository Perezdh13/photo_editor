
import style from './HeadBar.module.css'
import FileButton from './fileButton/FileButton';
import MaskColorButton from './maskColorButton/maskColorButton';

export default function HeadBar() {
   
    return (
        <div className={style.bar}>
            <FileButton/>    
            <MaskColorButton/>
        </div>
    )
}