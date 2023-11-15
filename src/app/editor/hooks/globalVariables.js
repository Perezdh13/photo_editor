"use client"
import React,{createContext, useState} from "react";
export const GlobalVariables = createContext();

export const MyProvider = ({children}) => {
    const [image, setImage] = useState(null);
    const [processing, setProcessing] = useState(false)
    const [context, setContext] = useState(null)
    const [color, setColor] = useState('#FFFFFF')
    const [isColorSelect, setIsColorSelect] = useState(false)
    const [colorHSV, setColorHSV] = useState('#FFFFFF')

    return (
        <GlobalVariables.Provider value={{
            image, setImage,
            processing, setProcessing,
            context, setContext,
            color, setColor,
            isColorSelect, setIsColorSelect,
            colorHSV, setColorHSV}}>
            {children}
        </GlobalVariables.Provider>
    )
}