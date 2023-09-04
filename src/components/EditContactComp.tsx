import React, { useEffect } from "react";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { contactContext } from "../Context Provider/ContactContext";
export default function Contact({id}) {
  const [showAddContact, setshowAddContact] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('');
  const {contacts,setContacts}=useContext(contactContext);
  const navigate=useNavigate();

  const handleClick=async (e)=>{
    e.preventDefault();
    setContacts((prevValue)=>{
        let newValue=[...prevValue];
        for(let i=0;i<newValue.length;i++){
            if(newValue[i].id==id){
                newValue[i].firstName=firstName;
                newValue[i].lastName=lastName;
                newValue[i].status=status;
            }
        }
        return newValue;
    })
    navigate('/contact');
  }

  useEffect(()=>{
    contacts.forEach(elem => {
        if(elem.id==id){
            setFirstName(elem.firstName);
            setLastName(elem.lastName);
            setStatus(elem.status);
        }
    });
  },[contacts])
  
  return (
    <div className="addContact">
      {showAddContact && (
        <form>
          <div>
            <label>Edit First Name: </label>
            <input type="text" onChange={(e)=>{setFirstName(e.target.value)}} value={firstName}/>
          </div>
          <div>
            <label>Edit Last Name: </label>
            <input type="text" onChange={(e)=>{setLastName(e.target.value)}} value={lastName}/>
          </div>
          <div>
            <label id='status'>New Status: </label>
            <input type="radio" name='status' onClick={()=>{setStatus('active')}} value={status}/> <span>Active</span>
            <input type="radio" name='status' onClick={()=>{setStatus('inactive')}} value={status}/> <span>Inactive</span>
          </div>
          <button onClick={handleClick}>Save Editted Contact</button>
        </form>
      )}
    </div>
  );
}
