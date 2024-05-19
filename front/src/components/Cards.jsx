import { data } from "autoprefixer";
import { AuthContext } from "contexts/AuthProvider";
import usePurchase from "hooks/usePurchase";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Cards = ({ item }) => {
  const {_id,name,image,category,price,countInStock}=item;
  const {user}=useContext(AuthContext);
  //console.log(user);

  const navigate=useNavigate();
  const location=useLocation();
  
    //when clicking buy Now button-fetch data from frontend
    const handleBuyNow = (item) => {
    
    //validation for if user and email correct(logged) can handleBuyNow funct() works
    if(user&&user?.email){
      
        const purchaseItem={
          productItemId:_id,
          name,
          quantity:1,
          image,
          price,
          email:user.email,
          orderItems: [_id]};
    
        //first we placed item it goes to backend.now we should retrieve that backend order item(backend posting part in frontend also)
        fetch("http://localhost:3001/purchase/add",{
            method:"POST",
            headers:{
              'content-type':'application/json'
            },
            body: JSON.stringify(purchaseItem)
        }).then(res=>res.json()).then(data=>{
          console.log(data)
        }).catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        })


        
          Swal.fire({
            position: "top-middle",
            icon: "success",
            title: "This item has been placed",
            showConfirmButton: false,
            timer: 1500
          });
        
     //validation for if user and email incorrect(logged) error diaplay as create an account
    }else{
      Swal.fire({
        title: "Please Login?",
        text: "Without an account can't be able to place items!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "signup Now!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup',{state:{from:location}})
        }
      });
    }
};

  return (
    <div className="flex md:flex-col mt-[23px] ml-[38px] gap-[82px] md:ml-0">
      <Link to={'/menu/$/{item._id}'}>
      </Link>
      <div className="flex flex-col justify-center w-full p-[11px] border border-solid white_A700_white_A700_00_border bg-gradient3 rounded-[16px]">
        <Link to={'/menu/$/{item._id}'}><img 
          src={item.image}
          alt={item.name}  
          className="hover:scale-105 transition-all duration-200 md:h-72"
        /></Link>
        <h6 className="mt-1.5" style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>{item.name}</h6>
        <h6 className="mt-[3px]" style={{ color: 'white', fontSize: '1.50rem', fontWeight: 'bold' }}>LKR.{item.price.toFixed(2)}</h6>
    


        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <div style={{ marginBottom: '30px' }}>
               <img src="images/img_group_5.svg" alt="brownies_four" className="h-[12px]" />
          </div>
        <div style={{ display: 'flex', gap: '10px' }}>

          <button className="hover:scale-105 transition-all duration-200 md:h-72" style={{ backgroundColor: '#852D6B', color: 'white',  padding: '16px 80px', borderRadius: '15px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }} onClick={()=>handleBuyNow(item)}>Buy Now</button>
    </div>
</div>

        
       
      </div>
    </div>
  );
};

export default Cards;








