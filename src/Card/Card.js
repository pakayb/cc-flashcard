import React, {useState} from "react";
import './card-style.css'
import {storage} from "../firebase";

function Card(props) {
    const [image, setImage] = useState("");
    let storageRef = storage.ref();
    let downloadUrl = storageRef.child('images/image0.jpg').getDownloadURL().then(url=> setImage(url));
    return (
        <div className='card text-center'>
            <div className='overflow'>
                <img id={props.id} alt={props.id} src={image} className='card-img-top'></img>
            </div>
            <div className='card-body text-dark'>
                <h4 className='card-title'>{props.name}</h4>
                <p className='card-text text-secondary'>
                    <p>Role: {props.role}</p>
                    <p>Location: {props.location}</p>
                    <p>Gender: {props.gender}</p>
                    <p>Funfact: {props.funFact}</p>
                    <p>Has twin? {props.hasTwin}</p>
                </p>
            </div>
        </div>
    );
}

export default Card;