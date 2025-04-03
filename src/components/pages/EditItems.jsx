import axios from 'axios'
 import React, { useEffect, useState } from 'react'
 import "./CreatItems.css"
 import { useNavigate, useParams } from 'react-router-dom'

const EditItems = () => {
      const [name,setName]=useState("")
      const [price,setPrice]=useState("")
      const [image,setImage]=useState(null)
      const [defaultData,seteDefaultData]=useState({})
 
      const handleFileChange = (event) => {
         const file = event.target.files[0];
         if (file) {
             setImage(file); 
         }
     }
     const navigate=useNavigate()
     const params=useParams()
     useEffect(()=>{
        axios.get(`https://vica.website/api/items/${params.id}`,
            {
                headers:{
                    Accept: "application/json",
                    Authorization:localStorage.getItem("token"),
                }
            }).then(res=>{
                setName(res.data.name)
                setPrice(res.data.price)
                seteDefaultData(res.data)
            })
            .catch(err=>console.log(err))
     },[])
     const sendData=(event)=>{
         event.preventDefault();
         axios.post(`https://vica.website/api/items/${params.id}`,{
             name,
             price,
             image,
             "_method" :"PUT",
         },{
             headers:{
                 "Content-Type":"multipart/form-data",
                 Authorization:localStorage.getItem("token")
             }
         }
         ).then(res=>{
             console.log(res.data)
             navigate("/dashboard")
     })
         .catch(err=>console.log(err))
     }
   return (
     <section id="creatItems">
     <h1>Edit Product</h1>
     <form onSubmit={sendData} className='container'>
     <div className="add-inputs">
     <div className="input-container">
             <label htmlFor="ProductName">Product Name</label>
             <input type="text"
                 name='ProductName' 
                 id='ProductName' 
                 placeholder='Product Name'  
                 onChange={event=>setName(event.target.value)}
                 defaultValue={defaultData?.name}
                 />
         </div>
         <div className="input-container">
             <label htmlFor="Price">Product Name</label>
             <input type="text" 
             name='Price' 
             id='Price' 
             placeholder='Price'  
             onChange={event=>setPrice(event.target.value)}
             defaultValue={defaultData?.price}
             />
         </div>
         <div className="submit-container">
                 <button type="submit" className="ManageProductBtn">Save</button>
         </div>
     </div>
        <div className="file">
        <div className="image-upload-box" onClick={() => document.getElementById("image").click()}>
    {image ? (
        <img src={URL.createObjectURL(image)} alt="image Preview" className="preview-image" />
    ) : defaultData?.image_url ? (
        <img src={defaultData.image_url} alt="Old Image" className="preview-image" />
    ) : (
        <img src="/assets/images/Upload-icon.png" alt="Upload Icon" className="upload-image" />
    )}
</div>

               <input
                 type="file"
                 id="image"
                 accept="image/*"
                 onChange={handleFileChange}
                 style={{ display: "none" }}
               />
        </div>
     </form>
     </section>
   )
 }


export default EditItems