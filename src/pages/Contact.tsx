import React from "react";
import './Contact.css'
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Link,useNavigate} from "react-router-dom";
import CreateContact from "../components/CreateContact.js";
import AddContact from "../components/AddContact.tsx";
import { contactContext } from "../Context Provider/ContactContext.js";
export default function Contact() {
  const [showAddContact, setshowAddContact] = useState(true);
  const {contacts,setContacts}=useContext(contactContext);
  const navigate=useNavigate();

  const handleEdit=(id)=>{
    navigate(`/editcontact/${id}`)
  }
  const handleDelete=(id)=>{
    setContacts((prevValue)=>{
      let newValue=[...prevValue];
      newValue=newValue.filter((elem)=>{
        return elem.id!=id;
      })
      return newValue;
    })
  }
  return (
    <div className="contact-page-wrapper">
      <AddContact />
      <div className="contact-list">
        {
          contacts && contacts?.length>0?
          contacts.map((elem)=>(
            <div className='contact' key={elem.id}>
              <div>First Name: <span>{elem.firstName}</span></div>
              <div>Last Name: <span>{elem.lastName}</span></div>
              <div>Status: <span>{elem.status}</span></div>
              <button onClick={()=>{handleEdit(elem.id)}}>Edit</button>
              <button onClick={()=>{handleDelete(elem.id)}}>Delete</button>
            </div>
          ))
          :
          <div>No Contact Exists</div>
        }
      </div>
    </div>
  );
}
