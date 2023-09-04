import React from "react";
import './EditContact.css'
import { useParams} from "react-router-dom";
import EditContactComp from '../components/EditContactComp.tsx'
export default function EditContact() {
  let params=useParams();
  return (
    <div className="edit-page">
        <EditContactComp id={params.id}/>
    </div>
  );
}
