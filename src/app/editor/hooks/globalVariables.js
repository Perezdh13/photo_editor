"use client"
import React,{createContext, useState} from "react";
export const GlobalVariables = createContext();

export const MyProvider = ({children}) => {
    const [image, setImage] = useState(null);
    const [processing, setProcessing] = useState(false)

    return (
        <GlobalVariables.Provider value={{image, setImage, processing, setProcessing}}>
            {children}
        </GlobalVariables.Provider>
    )
}