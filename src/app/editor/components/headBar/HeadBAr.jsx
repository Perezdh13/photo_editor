
import style from './HeadBar.module.css'
import FileButton from './fileButton/FileButton';
import AiButton from './aiButton/AiButton';
import BackgrounRemoveButton from './backgroundRemoveButton/BackgroundRemoveButton';

export default function HeadBar() {
    
   
    

    return (
        <div className={style.bar}>
            <FileButton/>    
            <AiButton/>
            <BackgrounRemoveButton/>
        </div>
    )
}