import React from 'react'
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Heading, Img, Button, Text, Input } from "../../components";
import Footer from "../../components/Footer";
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import usePurchase from "hooks/usePurchase";
import { useState } from 'react';
import Header from "../../components/adminNavbar"
import { useRef } from 'react';
import emailjs from '@emailjs/browser';


export default function ContactForm(){
    const form=useRef()
    

    const [searchBarValue1, setSearchBarValue1] = React.useState("");
    const [email, setEmail] = useState('');
  const [error, setError] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_xt1uahr', 'template_xn5vj3p', form.current, {
            publicKey: 'EH_GzmctJcJ30GF1e',
          })
          .then(
            () => {
              console.log('SUCCESS!');
              form.current.reset();  // Reset the form after successful submission
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
    };
    
    const handleChange = (e) => {
      setEmail(e.target.value);
      if (!/\S+@\S+\.\S+/.test(e.target.value)) {
        setError('Invalid email address');
      } else {
        setError('');
      }
    };
    return (
    <div>
        <div className="flex flex-col w-full gap-[5px] sm:gap-[5px] bg-gradient1">

        <Header/>
        
        <div className="w-full max-w-3xl px-10 space-y-6 card shrink-0 w-full max-w-xl shadow-2xl bg-base-300 px-4 py-7 mx-auto mt-10">
        <section className='bg-white dark:bg-gray-900'>
            <div className='py-8 lg:py-16 mx-auto max-w-screen-md'>
            <div className="flex justify-center items-center">
            <h4 className="font-semibold" style={{ color: '#852D6B', fontSize: '37px', whiteSpace: 'nowrap', marginBottom: '40px' }}>Contact with Client</h4>
            </div>  

                <form ref={form} action='#' className='space-y-8'>
                    <div>
                        <label
                         htmlFor="email"
                         className='flex self-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                         >
                           <span className="block text-lg font-bold text-gray-700 mb-2">Your Email</span>
                        </label>
                        <div className=" border rounded-md p-5  bg-gradient3 rounded-[16px]" style={{ marginBottom: '40px' }}>

                          {/*email validation*/}

                        <input 
                            type="email"
                            id="email"
                            name='user_email'
                            placeholder='username@gmail.com'
                            required
                            onChange={handleChange}
                            
                            >    
                        </input>
                        </div>

                        {error && <p className="text-blue-600 "style={{ fontSize: '16px' }}>{error}</p>}
                        <label 
                        htmlFor='subject'
                        className='flex self-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                         >
                           <span className="block text-lg font-bold text-gray-700 mb-2">Subject</span>
                        </label>

                        <div className=" border rounded-md p-5  bg-gradient3 rounded-[16px]" style={{ marginBottom: '40px' }}>
                        <input 
                            type='text'
                            id='subject'
                            name='subject'
                            placeholder='Let us know how can help'
                            required
                            >    
                        </input>
                        </div>


                        <label
                        htmlFor='message'
                        className='flex self-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                         >
                           <span className="block text-lg font-bold text-gray-700 mb-2">Reason for the rejection</span>
                        </label>

                        <div className="border rounded-md p-8 bg-gradient3 rounded-[16px]">
                        <textarea
                            id="message" 
                            rows="5"
                            name='message'
                            placeholder='Leave a comment...'
                            className="block p-2.5 text-red-700 font-bold italic w-full border-transparent outline-none"
                            required
                        ></textarea>
                        </div>


                        <div>
                        <button type="submit" onClick={sendEmail}
                        disabled={error === 'Invalid email address'} // Disable the button if error is 'Invalid email address'
                        className="mb-3" style={{ fontSize: '20px', marginTop: '30px', backgroundColor: '#852D6B', color: 'white', padding: '18px 18px', borderRadius: '15px', border: 'none', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#852D6B'}>
                            Send message
                        </button>
                        </div>


                    </div>

                </form> 

            </div>
        </section>
        </div>
    
        <Footer className="pl-[65px] pr-14 py-[65px] md:p-5 border border-solid white_A700_00_gray_600_00_border bg-gradient2" />
        </div>
    </div>);
}
