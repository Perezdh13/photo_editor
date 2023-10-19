import { useState } from 'react';
import style from './BackgroundRemoveButton.module.css'

export default function BackgrounRemoveButton(){
const [dataPy, setDataPy] = useState(null)
console.log(dataPy);
const removePy = () => {
    fetch('http://127.0.0.1:5000/hola', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text(); // Obtener el contenido de la respuesta como texto
        } else {
          throw new Error('La solicitud no fue exitosa');
        }
      })
      .then((data) => {
        setDataPy(data); // Guardar la respuesta en el estado dataPy
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

    return(
        <>
        <button onClick={removePy}> Eliminar fondo </button>
        </>
    )
}