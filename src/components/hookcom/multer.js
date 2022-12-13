import React, { useState } from "react";
import axios from "axios";


function Multer (){
      
    const [upload, setUpload] = useState([]);
    const handleChange = (e)=>{
        setUpload(e.target.files[0])
        console.log(upload)
    }

    const uploader =()=>{
        const formdata = new FormData();
        formdata.append('file', upload);
        formdata.append('data', { name: 'bala' })

       console.log("formData", formdata)
     axios.post('http://localhost:3030/api/v4/upload/upload', formdata,{
        headers:{"Content-Type": "multipart/form-data"}}).then((res) => {
        console.log("res", res)
      }).catch((error) => {
        console.log(error)
    })
    }

    return(
        <>
         <input type="file" name="upload_file" onChange={handleChange} />
         <button type='buitton' onClick={uploader}>UPLOAD</button>
        </>
    )
}

export default Multer;