
import style from './HeadBar.module.css'
import FileButton from './fileButton/FileButton';

export default function HeadBar() {
   
    return (
        <div className={style.bar}>
            <FileButton/>    
        </div>
    )
}