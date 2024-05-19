import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Text, Heading, Img } from "../../components";
import Footer from "../../components/Footer";
import usePurchase from "hooks/usePurchase";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "contexts/AuthProvider";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";
import { Email } from "@mui/icons-material";
import Header from "../../components/navbar"


//export default function MyorderPage() {
const MyorderPage=()=>{
  const [searchBarValue5, setSearchBarValue5] = React.useState("");

  //to display post purchases in this page.here used usePurchase hook
  const [purchase,refetch]=usePurchase();
  const [purchaseCount, setPurchaseCount] = useState(0);

  //to display user details below of the page->want get logged user details by user 
  const {user}=useContext(AuthContext)

  //to display updated purchase quantity
  const [purchaseItems,setPurchaseItems]=useState([])


  //calculate price when quantity changesin one product item
  const calculatePrice=(item)=>{
    return item.price*item.quantity
  }

  //handleIncrease function of + button
  const handleIncrease=(item)=>{
    fetch(`http://localhost:3001/purchase/${item.id}`//to backend connect with the frontend to + btn
    ,{
      method:"PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({quantity:item.quantity+1})
    }).then(res=>res.json()).then(data=>{
      
    //after update quantity as (+) it should displays as below new quantity
    const updatedPurchase=purchaseItems.map((purchaseItem)=>{
        if(purchaseItem.id===item.id){
          return {
            ...purchaseItem,
            quantity:purchaseItem.quantity+1//new quantity
          }
        }

        return purchaseItem;
      })
      refetch();
      setPurchaseItems(updatedPurchase);
    })
  }


  //handleDecrease function of - button
  const handleDecrease=(item)=>{
    //console.log(item.id)
    if(item.quantity>1){//validations - when item decreasing it cannot be go to the 0 as quantity of items to - btn

      fetch(`http://localhost:3001/purchase/${item.id}`//to backend connect with the frontend to - btn
      ,{
      method:"PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({quantity:item.quantity-1})
    })
    .then(res=>res.json()).then(data=>{
    
      //after update quantity as (-) it should displays as below new quantity
    const updatedPurchase=purchaseItems.map((purchaseItem)=>{
        if(purchaseItem.id===item.id){
          return {
            ...purchaseItem,
            quantity:purchaseItem.quantity-1//new quantity
          }
        }

        return purchaseItem;
      })
      refetch();
      setPurchaseItems(updatedPurchase);
    })
    }else{
      alert("item cannot be zero.Please order another item");
    }
    
  }
  
  //calculate sub Total price when changed many order items quantities in one order
  const purchaseSubTotal=purchase.reduce((total,item)=>{
      return total+calculatePrice(item)
  },0);

  const purchaseTotal=purchaseSubTotal;

  //how retrive the count of purchases to display in arrow
  useEffect(() => {
    fetch("http://localhost:3001/purchase/${user?.email}/count")
      .then((res) => res.json())
      .then((data) => {
        setPurchaseCount(data.count);
      })
      .catch((error) => {
        console.error("Error fetching purchase count:", error);
      });
  }, []);


  //handle delete button(what does when hit to del btn)
  const handleDelete=(item)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "Item will be delete from your Order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#852D6B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/purchase/${item.id}`//delete backend connected to this url to frontend
        ,{
          method:"DELETE"
        }).then(res=>res.json()).then(data=>{
            if(data.message === "Purchase item deleted successfully"){
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success"
              });
            }else{
              alert("deletion error"+ data.message)
            }
            
        }).catch(error => {
          console.error("Error deleting purchase");
          alert("deletion error: " + error.message);
        });
      }
    });
  }

  //handle search function
const handleChange = (e) => {
  if (e.target) {
    setSearchBarValue5(e.target.value);
  } else {
    console.error("Event target is undefined or null:", e);
  }
};



  return(
    <div className="w-full bg-gradient1 section container">

          <Header/>

            <div className="flex flex-col items-center mb-8">
            <Heading size="13xl" as="h1">
            Orders
            </Heading>
            </div>

  {/*page setting to center*/}
  <div className="mx-auto max-w-6xl px-1">
  <div className="flex justify-center">


  {/*table for the order page-order quantity ,del table*/}
    <div>
    <div className="overflow-x-auto ">
    <table className="table">
    {/* head */}
    
    <thead className="p-[30px] border border-solid white_A700_white_A700_00_border bg-gradient3 rounded-[16px] ">
      
      {/*#,Product...row*/}
      <tr>
        <th className="px-20 py-3">
        <Heading size="3xl" as="h5" className="!text-gray-600_01" style={{ fontSize: '2rem' }}>
                  #
        </Heading>
        </th>
        <th className="px-16 py-3">
        <Heading size="3xl" as="h5" className="!text-gray-600_01" style={{ fontSize: '2rem' }}>
                  Product
        </Heading>
        </th>
        <th className="px-16 py-3"> 
        <Heading size="3xl" as="h5" className="!text-gray-600_01" style={{ fontSize: '2rem' }}>
                  ItemName
        </Heading>
        </th>
        <th className="px-14 py-3">
        <Heading size="3xl" as="h5" className="!text-gray-600_01" style={{ fontSize: '2rem' }}>
                  Quantity
        </Heading>
        </th>
        <th className="px-20 py-4"> 
        <Heading size="3xl" as="h5" className="!text-gray-600_01" style={{ fontSize: '2rem' }}>
                  Price
        </Heading>
        </th>
        <th className="px-16 py-3">
        <Heading size="3xl" as="h6" className="!text-gray-600_01" style={{ fontSize: '2rem' }}>
                  Action
        </Heading>
        </th>
      </tr>
      
    </thead>

    
    <tbody>
        {/*purchased item retrieving - use--> purchase.map */}
            {purchase.map((item, index) => (
              <tr key={index} style={{fontWeight: 'bold',fontSize:'22px'}}>
                <td className="text-center">{index + 1}</td> {/*1,2 first col */}
                  <>
                    <td className="text-center">
                      
                        <div className="avatar">
                          <div className="mask mask-squircle w-40 h-40 flex justify-center items-center">
                            <img 
                            src={item.image} //images-2nd col
                            alt=""/>
                          </div>
                      </div>
                    </td>
                    <td className="text-center" style={{fontWeight: 'bold'}}>{item.name}</td>{/*item name-3rd col*/}
                    <td style={{fontWeight: 'bold'}}>

                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        {/* - btn*/}
                    <button
                        className="btn btn-xs"
                        style={{
                          backgroundColor: '#852D6B',
                          color: 'white',
                          padding: '20px 30px',
                          border: 'none',
                          borderRadius: '15px',
                          fontWeight: 'bold',
                          fontSize: '24px' ,
                          transition: 'background-color 0.2s',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          lineHeight: '1px'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#852D6B'}
                        onClick={() => handleDecrease(item)}
                      > -
                      </button>

                      <input type="number" value={item.quantity}  onChange={()=>console.log(item.quantity)} //item quantity-4th col
                          style={{ marginLeft: '30px', marginRight: '5px',fontWeight:"bold"}} />

                      {/* + btn*/}
                      <button className="btn btn-xs"
                      style={{
                        backgroundColor: '#852D6B', 
                        color: 'white', 
                        padding: '20px 30px', 
                        borderRadius: '15px', 
                        border: 'none', 
                        transition: 'background-color 0.2s',
                        cursor: 'pointer', 
                        fontWeight: 'bold' ,
                        fontSize: '24px' ,
                        marginRight: '10px',
                        whiteSpace: 'nowrap',
                        lineHeight: '1px' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#852D6B'}
                        onClick={() => handleIncrease(item)}>
                        +
                        </button>
                    </div>


                    </td>
                    <td className="text-center" style={{fontWeight: 'bold'}}>Rs.{calculatePrice(item).toFixed(2)}</td>
           <td className="text-center">

 {/*del btn-5th col*/}
<button
    className="btn btn-ghost btn-xs"  
    style={{
      backgroundColor: 'white',
      color:'#852D6B',
      borderRadius: '30px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'}
      onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
      onClick={() => handleDelete(item)}
  >
    <FaTrash style={{ fontSize: '1.5em' }} />
  </button>

                </td>
                  </>
                
              </tr>
            ))}
          </tbody>
    
   
   


  </table>
  </div>

    </div>
    
    </div>





    <div className="flex justify-center">
{/* Customer details */}
<div className="my-12 flex flex-col md:flex-row justify-between items-start">
  {/* Customer Details Column */}
  <div className="flex">
  {/* Customer Details Column */}
  <div className="w-1/2 px-4 space-y-3">
    <h3 className="font-medium" style={{ fontWeight: 'Extra Bold',color: '#852D6B',fontSize: '35px'}}>Customer Details</h3>
    <p style={{ marginTop: '30px',fontSize: '20px' ,fontWeight: 'light'}}>Name : {user?.displayName || "Guest"}</p>
    <p style={{ marginTop: '10px',fontSize: '20px' ,fontWeight: 'lght'}}>Email : {user?.email || "Not provided"}</p>
  </div>
  {/* Shopping Items Column */}
  <div className="w-1/2 px-4 space-y-3 ml-20">
    <h3 className="font-medium" style={{ fontWeight: 'Extra Bold',color: '#852D6B',fontSize: '35px'}}>Shopping Items</h3>
    <p style={{ marginTop: '30px',fontSize: '20px' ,fontWeight: 'light'}}>Total Items : {purchase.length}</p>
    <p style={{ marginTop: '15px',fontSize: '20px' ,fontWeight: 'lght'}}>Total Price  : {purchaseTotal.toFixed(2)}</p>

    <Link to='/payment'>
    <button className="mb-4" style={{fontSize: '24px',marginTop: '50px', backgroundColor: '#852D6B', color: 'white', padding: '18px 100px', borderRadius: '15px', border: 'none', cursor: 'pointer', fontWeight: 'bold' , whiteSpace: 'nowrap' }}
    onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'}
    onMouseOut={(e) => e.target.style.backgroundColor = '#852D6B'}>
    Proceed to Checkout
    </button>
    </Link>
    
  </div>
</div>

</div>
</div>
</div>
<Footer className="mt-[30px] pl-[65px] pr-14 py-[65px] md:p-5 border border-solid white_A700_00_gray_600_00_border bg-gradient2" />


    </div>
  )
}
export default MyorderPage;


























          