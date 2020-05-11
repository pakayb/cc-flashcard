import React, {useState} from "react";
import './card-style.css'
import {storage} from "../firebase";

function Card(props) {
    const [image, setImage] = useState("");
    if (props.picture!==undefined){let pictureUrl = props.picture;
    storage.refFromURL(pictureUrl).getDownloadURL().then(url=> setImage(url));}

    const flip = (event) => {
        console.log('asd');
        let element = event.currentTarget;
        console.log(element);
        if (element.className ==="card"){
            if (element.style.transform=="rotateY(180deg)"){element.style.transform = "rotateY(0deg)"}
            else{element.style.transform = "rotateY(180deg)"}
        }
    };



    return (
        <div className='container'>
            <div className='card' onClick={flip}>
        <div className=' text-center' >
            <div className='overflow front'>
                <img id={props.id} alt={props.id} src={image} className='card-img-top'></img>
                <img alt='codecool logo' src="https://journey.code.cool/static/assets/codecool_logo.png" className='card-img-bottom'/>
            </div>
            <div className='card-body text-dark back'>
                <h4 className='card-title'>{props.name}</h4>
                <div className='card-text text-secondary'>
                    <p>Role: {props.role}</p>
                    <p>Location: {props.location}</p>
                    <p>Gender: {props.gender}</p>
                    <p>Funfact: {props.funFact}</p>
                    <p>Has twin? {props.hasTwin}</p>
                </div>
            </div>
        </div>
            </div>
        </div>
    );
}

export default Card;