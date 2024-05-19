
//Login component popup page

import { AuthContext } from "contexts/AuthProvider";
import usePurchase from "hooks/usePurchase";
import { Result } from "postcss";
import React, { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form"
import {FaFacebook, FaGithub, FaGoogle} from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom";

const Modal=()=>{
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm(); {/*from importing react-hook-form set up login component as with input fields*/}

    //Enable authenticating using gmail acccount from AuthProvider.jsx- signup and login
    const {signUpWithGmail,login}=useContext(AuthContext);

    //when username,password incorrect
    const [errorMessage,setErrorMessage]=useState("");
    
    //redirect to HomeOrderPage or specifying page after login
    const location=useLocation();
    const navigate=useNavigate();
    const from=location.state?.from?.pathname||"/HomePageOrder";

    //login-Enable authenticating in 21st line(when entering username and pw do-only login)
    const onSubmit = (data) => {
        const email=data.email;
        const password=data.password;
        //console.log(email,password)
        login(email,password).then((result)=>{
          const user=result.user;
          alert("login successfull");
          document.getElementById("my_modal_5").close()
          navigate(from,{replace:true})
        }).catch((error)=>{
          const errorMessage=error.message;
          setErrorMessage("provide a correct email and password")//when username,password incorrect-24 line set
        })
    };

    //google sign in-Enable authenticating using gmail acccount in 21st line(when clicking google circle whole things do-only sign up)
    const handleLogin=()=>{
      signUpWithGmail().then((result)=>{
        const user=result.user;
        alert("Login successfull!");
        document.getElementById("my_modal_5").close()
          navigate(from,{replace:true})
      }).catch((error)=>console.log(error))
    }

    return(
    <dialog id="my_modal_5"
        className="modal modal-middle sm:modal-middle"
        style={{
            position: 'fixed', top: '0', left: '0', width: '100%',
            height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: '999', justifyContent: 'center', alignItems: 'center'
        }}>
        <div className="modal-box" style={{
            backgroundColor: '#fff', padding: '20px', borderRadius: '10px', position: 'fixed',
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
        }}>
            <div className="modal-action flex flex-col justify-center mt-0">{/*login form */}
              {/*login form */}
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">{/*handlesubmit is from importing react-hook-form*/}
                    <h3 className="font-bold text-lg mb-4">Please Login!</h3>
                   
                    {/*email */}
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        {/*email input field */}
                        <div className="form-control border border-gray-300 rounded">
                        <input type="email" 
                        placeholder="email" 
                        className="input input-bordered" 
                        required 
                        {...register("email")}/>
                    </div>
                    </div>

                    {/*password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                         {/*password input field */}
                        <div className="form-control border border-gray-300 rounded">
                        <input type="password" 
                        placeholder="password" 
                        className="input input-bordered"
                        required 
                        {...register("password")}
                        />
                        </div>
                        <label className="label">
                            <label htmlFor="forgotPassword" className="text-sm mt-1 text-blue-500 hover:underline cursor-pointer">Forgot password?</label>
                        </label>
                    </div>


                    {/*error when error msg displays in incorrect un,pw */}
                    {
                        errorMessage ? <p className="text-red-500 text-xs italic">{errorMessage}</p> : ""
                    }

                    {/*login btn*/}
                    <div className="form-control mt-4">
                        <input type="submit" value="Login" className="hover:scale-105 transition-all duration-200 md:h-72" style={{ width: '400px', backgroundColor: '#852D6B', color: 'white', padding: '12px 24px', borderRadius: '15px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }} />
                    </div>

                    <p className="text-center my-10">Donot have an account?
                    {/*sign up word clicking and go another component*/}
                    <Link to="/signup" className="underline text-blue-500 ml-1">
                        Signup Now
                    </Link>{" "}
                    </p>
                    {/*close button upper in the login component*/}
                    <button 
                    htmlFor="my_modal_5"
                    onClick={()=>document.getElementById("my_modal_5").close()}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                    </button>
                </form>

                {/*social login*/}
                <div className="text-center space-x-3 mb-15">
                    <button className="btn btn-circle hover:bg-purple hover:text-white" onClick={handleLogin} style={{backgroundColor: '#852D6B',color: 'white',padding: '12px 16px',borderRadius: '30px'}}>
                        <FaGoogle/>
                    </button>
                    <button className="btn btn-circle hover:bg-purple hover:text-white" style={{backgroundColor: '#852D6B',color: 'white',padding: '12px 16px',borderRadius: '30px'}}>
                        <FaGithub/>
                    </button>
                    <button className="btn btn-circle hover:bg-purple hover:text-white" style={{backgroundColor: '#852D6B',color: 'white',padding: '12px 16px',borderRadius: '30px'}}>
                        <FaFacebook/>
                    </button>
                </div>
            </div>
        </div>
    </dialog>
    )
    }
export default Modal;






