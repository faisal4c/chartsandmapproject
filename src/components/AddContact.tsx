import React from "react";
import './AddContact.css'
import { useState,useContext } from "react";
import { contactContext } from "../Context Provider/ContactContext";
export default function Contact() {
  const [showAddContact, setshowAddContact] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('');
  const {setContacts}=useContext(contactContext);

  const handleClick=(e)=>{
    e.preventDefault();
    if(firstName=='' || lastName=='' || status==''){
      window.alert("Enter All Details");
      return;
    }
    setContacts((prevValue)=>{
      const newValue=[...prevValue,{firstName,lastName,status,id:Math.random()}];
      return newValue;
    })
    setshowAddContact(false);
  }
  
  return (
    <div className="addContact">
      {showAddContact && (
        <form>
          <div>
            <label>First Name: </label>
            <input type="text" onChange={(e)=>{setFirstName(e.target.value)}}  required/>
          </div>
          <div>
            <label>Last Name: </label>
            <input type="text" onChange={(e)=>{setLastName(e.target.value)}}  required/>
          </div>
          <div>
            <label id='status'>Status: </label>
            <input type="radio" name='status' onClick={()=>{setStatus('active')}} /> <span>Active</span>
            <input type="radio" name='status' onClick={()=>{setStatus('inactive')}} /> <span>Inactive</span>
          </div>
          <button onClick={handleClick}>Save Contact</button>
        </form> 
      )}

      {
        !showAddContact &&

        <button className="create-contact" onClick={()=>{setshowAddContact(true)}}>Create Contact</button>

      }
    </div>
  );
}
