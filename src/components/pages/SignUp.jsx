import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [first_name,setFirstName]=useState("")
    const [Last_name,setLastName]=useState("")
    const [user_name,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [password_confirmation,setPasswordConfirmation]=useState("")
    const [profile_image,setProfileImage]=useState("")
    const navigate=useNavigate();

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          setProfileImage(file); 
      }
  }
  const [errors, setErrors] = useState({});
    const sendData=(event)=>{
        event.preventDefault();
        const newErrors = {};

        if (password.length < 8) {
          newErrors.password = "The password field must be at least 8 characters.";
        }
      
        if (password !== password_confirmation) {
          newErrors.password_confirmation = "Passwords do not match.";
        }
      
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors); 
          return;
        }

       const data=new FormData()
       data.append("first_name",first_name)
       data.append("last_name", Last_name); 
       data.append("user_name", user_name);
       data.append("email",email)
       data.append("password",password)
       data.append("password_confirmation",password_confirmation)
       data.append("profile_image",profile_image)
        fetch("https://vica.website/api/register" ,{
            method:"POST",
            headers:{
                Accept:"application/json",
            },
            body:data
        }).then(res=>res.json())
        .then(res => {
          if (res.errors) {
              setErrors(res.errors)
          } else {
              localStorage.setItem("token", "Bearer " + res.data.token)
              localStorage.setItem("user_name", res.data.user.user_name); 
              localStorage.setItem("profile_image", res.data.user.profile_image_url);

              console.log("Stored user_name:", localStorage.getItem("user_name"));
              console.log("Stored profile_image:", localStorage.getItem("profile_image"));
              navigate("/dashboard")
          }
      })
        .catch(err=>console.log(err))
    }
  return (
    <>
  <div className="auth-form">
        <div className="form-title">
          <h3>Sign up</h3>
          <p>Creat a account to continue</p>
        </div>
        <form onSubmit={sendData}>
          <div className="form-inputs">
            <div className='row-inputs'>
            <div className="input-container">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" id="firstName" placeholder="First Name"
              onChange={event=>setFirstName(event.target.value)}
              />
            </div>
            <div className='input-container'>
            <label htmlFor="LastName">Last Name</label>
              <input type="text" name="LastName" id="LastName" placeholder="Last Name"
              onChange={event=>setLastName(event.target.value)}/>
            </div>
            <div className="input-container">
  <label htmlFor="user_name">Username</label>
  <input
    type="text"
    name="user_name"
    id="user_name"
    placeholder="Username"
    onChange={event => setUserName(event.target.value)}
  />
</div>
            </div>
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={event=>setEmail(event.target.value)}
                />
                  {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
            <div className="row-inputs">
              <div className="input-container">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  onChange={event=>setPassword(event.target.value)
                  }
                />
                  {errors.password && <p className="error-text">{errors.password}</p>}
              </div>
              <div className="input-container">
                <label htmlFor="confirm">Confirm </label>
                <input
                  type="password"
                  name="confirm"
                  id="confirm"
                  placeholder="********"
                  onChange={event =>setPasswordConfirmation(event.target.value)}
                />
                {errors.password_confirmation && <p className="error-text">{errors.password_confirmation}</p>}
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="profile_image">Profile Image</label>
              <div className="image-upload-box" onClick={() => document.getElementById("profile_image").click()}>
                {profile_image ? (
                <img src={profile_image ? URL.createObjectURL(profile_image) : "assets/images/Upload-icon.png"} 
                alt="Profile Preview" 
                className="preview-image" />
                ) : (
                  <img src="assets/images/Upload-icon.png" alt="Upload Icon" className="upload-image" />
                )}
              </div>
              <input
                type="file"
                id="profile_image"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          <div className="submit-container">
            <button type="submit" className="submit-btn">Sign Up</button>
            <span>Already have an account?<Link to="/">Sign In </Link></span> 
          </div>
          </div>
        </form>
    </div>
</>
)
}

export default SignUp
