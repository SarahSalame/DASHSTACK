import axios from 'axios'
import React, { useState } from 'react'
import "./CreatItems.css"
import { useNavigate } from 'react-router-dom'

const CreatItems = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  }

  const navigate = useNavigate()

  const sendData = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (image) formData.append('image', image);

    axios.post("https://vica.website/api/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token")
      }
    })
    .then(res => {
      console.log(res.data)
      navigate("/dashboard")
    })
    .catch(err => console.log(err))
  }

  return (
    <section id="creatItems">
      <h1>Add Product</h1>
      <form onSubmit={sendData} className='container'>
        <div className="add-inputs">
          <div className="input-container">
            <label htmlFor="ProductName">Product Name</label>
            <input 
              type="text"
              name='ProductName' 
              id='ProductName' 
              placeholder='Product Name'  
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="Price">Price</label>
            <input 
              type="text" 
              name='Price' 
              id='Price' 
              placeholder='Price'  
              onChange={event => setPrice(event.target.value)}
            />
          </div>
          <div className="submit-container">
            <button type="submit" className="ManageProductBtn">Save</button>
          </div>
        </div>

        <div className="file">
          <div 
            className="image-upload-box" 
            onClick={() => document.getElementById("image").click()}
          >
            {image ? (
              <img 
                src={URL.createObjectURL(image)} 
                alt="image Preview" 
                className="preview-image" 
              />
            ) : (
              <img 
                src="https://sarahsalame.github.io/DASHSTACK/assets/images/Upload-icon.png" 
                alt="Upload Icon" 
                className="upload-image" 
              />
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

export default CreatItems
