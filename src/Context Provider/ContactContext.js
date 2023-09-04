import { createContext, useContext, useState } from "react";

const contactContext=createContext();

const ContactProvider=({children})=>{
    const [contacts,setContacts]=useState([]);
    return(
        <contactContext.Provider value={{contacts,setContacts}}>
        {children}
        </contactContext.Provider>
    )

}



export {ContactProvider,contactContext}