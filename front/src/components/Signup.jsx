//clicking signup or when creating a new account

import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import {FaFacebook, FaGoogle} from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom";
import {FaGithub} from "react-icons/fa"
import Modal from './Modal';
import { AuthContext } from 'contexts/AuthProvider';


const Signup=()=>{
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();{/*from importing react-hook-form set up sign up component as with input fields*/}

    //create user to crete an account and login
    const {createUser,login}=useContext(AuthContext);
    
    //redirect to HomeOrderPage or specifying page after login
    const location=useLocation();
    const navigate=useNavigate();
    const from=location.state?.from?.pathname||"/HomePageOrder";

      const onSubmit = (data) => {
        const email=data.email;
        const password=data.password;
        createUser(email,password).then((result) => {
            // Signed up 
            const user = result.user;
            alert("Account creation Successfully done!")
            document.getElementById("my_modal_5").close()
            navigate(from,{replace:true})
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      }

    return(
        <div className='max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20'>
            <div className="modal-action flex flex-col justify-center mt-0">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">{/*handlesubmit is from importing react-hook-form*/}
                    <h3 className="font-bold text-lg mb-4">Create an Account</h3>

                    {/*email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
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
                    {/*error*/}

                    {/*login btn*/}
                    <div className="form-control mt-6">
                        <input type="submit" value="Signup" className="hover:scale-105 transition-all duration-200 md:h-72" style={{ width: '400px', backgroundColor: '#852D6B', color: 'white', padding: '12px 24px', borderRadius: '15px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }} />
                    </div>
                    <p className="text-center my-10">
                   Have an account?{"  "}
                    <button className="underline text-blue-500 ml-1"
                    onClick={()=>document.getElementById("my_modal_5").showModal()}
                    >
                    Login
                    </button>{"  "}
                    </p>

                    <Link
                    to="/"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>{/*close button upper in component
                    
                    and link used to when close where goes*/}

                     {/*close button upper in the login component*/}
                     <button 
                    htmlFor="my_modal_5"
                    onClick={()=>document.getElementById("my_modal_5").close()}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                    </button>

                </form>
                {/*social login*/}
                <div className="text-center space-x-3 mb-4">
                    <button className="btn btn-circle hover:bg-purple hover:text-white" style={{backgroundColor: '#852D6B',color: 'white',padding: '12px 16px',borderRadius: '30px'}}> 
                        <FaGoogle/>
                    </button>
                    <button className="btn btn-circle hover:bg-purple hover:text-white" style={{backgroundColor: '#852D6B',color: 'white',padding: '12px 16px',borderRadius: '30px'}}>
                        <FaGithub />
                    </button>
                    <button className="btn btn-circle hover:bg-purple hover:text-white" style={{backgroundColor: '#852D6B',color: 'white',padding: '12px 16px',borderRadius: '30px'}}>
                        <FaFacebook/>
                    </button>
                </div>
            </div>
            <Modal/>{/*go to login component(modal.jsx)*/}
        </div>
    )
}

export default Signup