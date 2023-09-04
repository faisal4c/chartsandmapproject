import React from "react";
import './EditContact.css'
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Link ,useParams} from "react-router-dom";
import CreateContact from "../components/CreateContact.js";
import { contactContext } from "../Context Provider/ContactContext.js";
import EditContactComp from '../components/EditContactComp.tsx'
export default function EditContact() {
  let params=useParams();
  console.log(params);
  return (
    <div className="edit-page">
        <EditContactComp id={params.id}/>
    </div>
  );
}
