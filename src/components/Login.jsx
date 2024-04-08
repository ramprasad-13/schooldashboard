import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [email,setEmail]= useState('');
  const [otp,setOtp]= useState('');
  axios.defaults.withCredentials = true;

  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
  }

  const handleOtpChange = (e)=>{
    setOtp(e.target.value);
  }

  const sendotp = async()=>{
    //sending otp here
    try {
      //console.log("trying to send otp to",email); for checking
      const data={
        email:email
      }
      const res = await axios.post(`https://schoolbackend-one.vercel.app/login`,data)
      console.log(res.data)

      //If an error messsage is already present clear it
      const errormessage='';
      const errorMsg =document.getElementById('error-msg')
      errorMsg.style.display= 'block';
      errorMsg.innerHTML=errormessage;

      //show otp field and login button
      const otpfield = document.getElementById('otp-field')
      otpfield.style.display= 'block';


    } catch (error) {
      const errormessage= error.response.data.message;
      const errorMsg =document.getElementById('error-msg')
      errorMsg.style.display= 'block';
      errorMsg.innerHTML=errormessage;
    }
  }

  const handlelogin = async(e)=>{
    try {
    //check email and otp to login
    e.preventDefault();
      const data={
        email:email,
        otp:otp
      }
      const res = await axios.post(`https://schoolbackend-one.vercel.app/verify`,data);
      console.log(res.data)

      //If an error messsage is already present clear it
      const errormessage='';
      const errorMsg =document.getElementById('error-msg')
      errorMsg.style.display= 'block';
      errorMsg.innerHTML=errormessage;

      //show otp field and login button
      const otpfield = document.getElementById('otp-field')
      otpfield.style.display= 'block';
    } catch (error) {
      const errormessage= error.response.data.message;
      const errorMsg =document.getElementById('error-msg')
      errorMsg.style.display= 'block';
      errorMsg.innerHTML=errormessage;
    }
  }


  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <h1>Login</h1>
      <form onSubmit={handlelogin}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={handleEmailChange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <button type="button" className='btn btn-primary mt-2' onClick={sendotp}>Send Otp</button>

        <div id="otp-field" style={{display:'none'}}>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Otp</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="******" value={otp} onChange={handleOtpChange}/>
        </div>
        <button type="submit" className="btn btn-primary mt-2">Login</button>
        </div>

        <div><p id='error-msg' style={{display:'none'}}></p></div>
      </form>
    </div>
  )
}
