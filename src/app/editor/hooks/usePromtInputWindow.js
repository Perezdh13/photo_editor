import { useEffect, useState } from "react";

export default function usePromtInputWindow() {
  const [inputValue, setInputValue] = useState(null);


  const openWindow = () => {
    setInputValue(null)
    const popUpWindow = window.open(
      "",
      "MiVentanaEmergente",
      "width=400,height=200"
    );
     popUpWindow.document.body.innerHTML = '';

    const input = popUpWindow.document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Introduce texto");

    const closeButton = popUpWindow.document.createElement("button");
    closeButton.textContent = "Crear imagen";
    closeButton.style.backgroundColor = "blue";
    closeButton.style.color = "white";
    closeButton.addEventListener("click", () => {
      // Cierra la ventana emergente cuando se hace clic en el botón
      popUpWindow.close();
    });

    input.addEventListener("input", (e) => {
      setInputValue(e.target.value);
    });

    popUpWindow.document.body.appendChild(input);
    popUpWindow.document.body.appendChild(closeButton);
  };

  useEffect(() => {
    const promtValue = new CustomEvent("promtValue", {
      detail: inputValue,
    });
    document.dispatchEvent(promtValue);
  }, [inputValue]);

  return openWindow;
}


