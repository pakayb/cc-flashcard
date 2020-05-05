import React, {useState} from "react";
import {storage,db} from "../firebase";
import firebase from "firebase";
import AvatarEditor from 'react-avatar-editor'


function Admin() {

    function uploadPicture(pictureDataUrl) {

// Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = pictureRef.putString(pictureDataUrl, "data_url");

// Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function(error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                }
            }, function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                });
            });
    }
    const [scale, setScale] = useState(1.2);
    const [name,setName] = useState("");
    const [location, setLocation] = useState("Budapest");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [funFact, setFunFact] = useState("");
    const [hasTwin, setHasTwin] = useState("");
    const [image, setImage] = useState(null);
    const [imageDataUrl, setImageDataUrl] = useState(null);
    const [editor, setEditor] = useState(null);

    const changeImageDataUrl = () => {
        setImageDataUrl(editor.getImageScaledToCanvas().toDataURL())};


    function handleSubmit(event){
        changeImageDataUrl();
        console.log(imageDataUrl);
        console.log(event);
        event.preventDefault();
        uploadPicture(imageDataUrl);

        const data = {"name":name,
            "location":location,
            "gender":gender,
            "role":role,
            "funfact":funFact,
            "hastwin":hasTwin,
            "picture":pictureRef.toString()
        };
        console.log(data);
        db.collection('employees').doc().set(data);

    }

    let storageRef = storage.ref();
    let pictureRef = storageRef.child('images/'.concat(Date.now().toString()));
    let photoEditor = null;

    function handleScale(e) {
        setScale(parseFloat(e.target.value))
    }


    if (image!=null) {
        photoEditor =
            <div>
            <AvatarEditor
                ref={setEditor}
                image={image}
                width={250}
                height={250}
                onMouseUp={changeImageDataUrl}
                onImageReady={changeImageDataUrl}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={scale}
                rotate={0}
                allowZoomOut={false}
            />
            <input type='range' value={scale} onChange={handleScale} min={0.5} max={2} step={0.1}/>
            </div>
    }


    return  (
<form onSubmit={handleSubmit}>
    <input type="text" placeholder="name" name="name" onChange={event => setName(event.target.value)} /><br/>
    <label>Location: <select name="location" onChange={event => setLocation(event.target.value)}>
        <option value="Budapest">Budapest</option>
        <option value="Miskolc">Miskolc</option>
    </select></label><br/>

    <label>Male: <input name="gender" type="radio" value="Male" onChange={event => setGender(event.target.value)} /></label>
    <label>Female: <input name="gender" type="radio" value="Female" onChange={event => setGender(event.target.value)} /></label><br/>
    <input type="text" placeholder="role" name="role" onChange={event => setRole(event.target.value)} /><br/>
    <input type="text" placeholder="funfact" name="funfact" onChange={event => setFunFact(event.target.value)} /><br/>

    <label>Has twin:   Yes<input name="hastwin" type="radio" value="Yes" onChange={event => setHasTwin(event.target.value)}/></label>
    <label>No<input name="hastwin" type="radio" value="No" onChange={event => setHasTwin(event.target.value)}/></label><br/>
    <label><input type='file'name='file' onChange={event => setImage(event.target.files.item(0))}/></label>
    {photoEditor}
        <button type="submit">Submit</button>
</form>
    )
}

export default Admin;