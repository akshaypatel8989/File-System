import React, { useState } from 'react'

const NewApp = () => {
 const [formData, setFormData] =useState({
  name: '',
  email: '',
  password: ''
 })
 const handleChange = (e) => {
  setFormData({formData, [e.target.name]: e.target.value})

  }


const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("localhost:27017/Register_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData), 
      });

      const data = await res.json();
      console.log("Response:", data);
      alert("User registered successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };
  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <form onSubmit={onSubmit}>

        <label >Name:</label>
        <input type="text" name='name' value={formData.name} onChange={handleChange}   style={{ width: "100%", padding: 8, marginTop: 5 }}/><br/>

        <label>Email</label>
        <input type="email" name='email' value={formData.email} onChange={handleChange}   style={{ width: "100%", padding: 8, marginTop: 5 }}/><br/>
        
         <label>Password</label>
        <input type="password" name='password' value={formData.password} onChange={handleChange}   style={{ width: "100%", padding: 8, marginTop: 5 }}/><br/>

        <button type='submit' onClick={handleSubmit}  style={{
            width: "100%",
            padding: 10,
            background: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}>Submit</button>
      </form>



    </div>
  )
}

export default NewApp

