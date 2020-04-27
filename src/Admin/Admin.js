import React from "react";
import {useForm} from "react-hook-form";
import {storage,db} from "../firebase";
import firebase from "firebase";

function Admin() {

    function uploadPicture(picture) {

// Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = pictureRef.put(picture);

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
                    downloadUrl = downloadURL
                });
            });
    }
    const {register, handleSubmit,errors} = useForm();
    const onsubmit = data =>{
        if (data.file!=undefined){uploadPicture(data.file.item(0));}
        data.picture = pictureRef.toString();
        console.log(data);
        data.file = null;
        db.collection('employees').doc().set(data);
        //console.log(data);
        //console.log(data.file.item(0))
    };

    let storageRef = storage.ref();
    const pictureDest ='images/'.concat(Date.now().toString());
    let pictureRef = storageRef.child('images/'.concat(Date.now().toString()));
    let downloadUrl = "";
    return  (
<form onSubmit={handleSubmit(onsubmit)}>
    <input type="text" placeholder="name" name="name" ref={register({required: true, maxLength: 80})} /><br/>
    <label>Location: <select name="location" ref={register({ required: true })}>
        <option value="Budapest">Budapest</option>
        <option value="Miskolc">Miskolc</option>
    </select></label><br/>

    <label>Male: <input name="gender" type="radio" value="Male" ref={register({ required: true })}/></label>
    <label>Female: <input name="gender" type="radio" value="Female" ref={register({ required: true })}/></label><br/>
    <input type="text" placeholder="role" name="role" ref={register({required: true})} /><br/>
    <input type="text" placeholder="funfact" name="funfact" ref={register} /><br/>

    <label>Has twin:   Yes<input name="hastwin" type="radio" value="Yes" ref={register}/></label>
    <label>No<input name="hastwin" type="radio" value="No" ref={register}/></label><br/>
    <label><input type='file'name='file' ref={register}/></label>
        <button type="submit">Submit</button>
</form>
    )
}

export default Admin;