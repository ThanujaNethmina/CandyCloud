import React, { useEffect, useRef, useState } from "react";
import useAuth from "hooks/useAuth";
import useAxiosSecure from "hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaBan, FaTrashAlt } from "react-icons/fa";
import { data } from "autoprefixer";
import Footer from "../../components/Footer";
import { Text, Heading, Img, Input } from "../../components";
import { GiConfirmed } from "react-icons/gi";
import Swal from 'sweetalert2';
import {useReactToPrint} from "react-to-print"
import { object } from "prop-types";
import { CloseSVG } from "assets/images";
import Header from "../../components/adminNavbar"

const ManagePurchases = () => {
  const [searchBarValue5, setSearchBarValue5] = React.useState("");
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search,setSearch] =useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [noResults,setNoResults]=useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  

  const { refetch, data: purchases = [] } = useQuery({
    queryKey: ["purchases"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/payments/all");
        return res.data;
      } catch (error) {
        console.error("Error fetching payment details:", error);
        return [];
      }
    },
  });

  //console.log(purchases);
  const handleConfirm = async (item) => {
    try {
      console.log(item);
      const res = await axiosSecure.patch(`/payments/${item._id}`);
      console.log(res.data);
      Swal.fire({
        position: "top-middle",
        icon: "success",
        title: "Payment confirmed!",
        showConfirmButton: false,
        timer: 1500
      });
      refetch()
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };
  
  //generate payment report
  const ComponentsRef=useRef();
  const handlePrint=useReactToPrint({
      content:()=>ComponentsRef.current,
      DocumentTitle:"Payment Report",
      onafterprint:()=>alert("payment report successfully download!")
  })

  //handle search function
const handleChange = (e) => {
  if (e.target) {
    setSearchBarValue5(e.target.value);
  } else {
    console.error("Event target is undefined or null:", e);
  }
};
  
  const filteredPurchases = purchases.filter(item =>
    item.email.toLowerCase().includes(search.toLowerCase())
  );

  
  //handle Rejection 
  const handleReject = (item) => {
    Swal.fire({
      title: "Are you sure to reject?",
      text: "order cannot approve again!",
        html: `
        <div style="display: flex; justify-content: space-between; align-items: center;">
        <input 
        type="text" 
        id="rejectionReason" 
        placeholder="Reason for rejection" 
        class="swal2-input"
        style="margin-bottom: 10px; width: 60%;  border: 1px solid #852D6B; border-radius: 10px; background-color: white; color: #FF6289;"
      />
      <button 
      id="button" 
      class="swal2-confirm" 
      style="width: 45%; padding:10px; border-radius: 10px; background-color: #FF6289; color: white;">
        Ask Substitutions
      </button>
      </div>

      <input 
        type="file" 
        id="fileInput" 
        class="swal2-file"
        style="margin-bottom: 10px; width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"
      />`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#852D6B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Extract rejection reason from input field
        const rejectionReason = document.getElementById("rejectionReason").value;
         
        // Here you can upload the selected file (selectedFile) using FormData
         const formData = new FormData();
         formData.append("file", selectedFile);

         // Send a POST request to update the payment status and save the rejection reason
         fetch(`http://localhost:3001/payments/${item.transitionId}/reject`, {
        method: "POST",
        body: JSON.stringify({ reason: rejectionReason }),
        headers: {
          "Content-Type": "application/json"
          }
        })

        //fetch(`http://localhost:3001/payments/${item.transitionId}`, {
          //method: "DELETE",
          //body: formData
        //})
        .then(res => res.json())
      .then(data => {
        // Once the payment is rejected and reason is saved, update the status to "rejected"
        return fetch(`http://localhost:3001/payments/${item.transitionId}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "Rejected" }),
          headers: {
            "Content-Type": "application/json"
          }
        });
      })
        .then(res => res.json())
        .then(data => {
            refetch();
            Swal.fire({
              title: "Rejected!",
              text: "Order has been rejected.",
              icon: "success"
            });
            
            // Navigate to another page
            window.location.href = "/ContactForm"; 

        }).catch(error => {
          console.error("Error rejecting purchase");
        });
      }
    });
  }
  
  
  
  return (

    <div className="w-full bg-gradient1">
  
  
  <Header/>

{/* Search bar */}       
<div className="flex items-center justify-end" style={{ marginRight: '10rem' }}>
    <div className="relative flex items-center">
        <input
            type="text"
            placeholder="Search by Email..."
            size="sm"
            variant="outline"
            shape="round"
            color="white_A700_white_A700_00"
            name="Search"
            className="flex items-center justify-end pr-12 border border-solid white_A700_white_A700_00_border bg-gradient rounded-[10px] px-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontSize: '18px', borderWidth: '1.5px', borderColor: '#FFFFFF'}}
        />
        <img src="images/img_search.svg" alt="search_one" className="absolute right-4 h-[30px]" />
    </div>
</div>



<div className="flex flex-col items-center mb-8">
            <Heading size="13xl" as="h1">
              Manage All <span className="ttext" style={{ color: "#852D6B", letterSpacing: "2.5px",fontStyle:"bold" }}> Orders!</span>
            </Heading>
            </div>

  <div className="flex justify-center space-x-4 mb-8">
  <div className="w-1/4 px-4 space-y-3 ">
    <div className="border rounded-md p-10 bg-gradient3 rounded-[16px]">
      <h4 className="font-semibold" 
      style={{ 
        color: '#852D6B', 
        fontSize: '37px', 
        whiteSpace: 'nowrap', 
        marginBottom: '30px' }}>All Orders</h4>
      <p style={{ fontSize: '20px', whiteSpace: 'nowrap' }}> Total Number of Orders : <span style={{ fontWeight: 'bold',color:'#852D6B' }}>{purchases.length}</span></p>
    </div>
  </div>

  <div className="w-1/4 px-4 space-y-3">
    <div className="border rounded-md p-10 bg-gradient3 rounded-[16px]">
      <h4 className="font-semibold" style={{ color: '#852D6B', fontSize: '37px', whiteSpace: 'nowrap', marginBottom: '30px' }}>Order Report</h4>
      <button
  onClick={handlePrint}
  className="btn btn-ghost btn-xs"
  style={{
    backgroundColor: '#852D6B',
    color: 'white',
    borderRadius: '10px',
    width: '200px',
    height: '30px', 
    fontSize: '20px', 
    lineHeight: '30px', 
    border: 'none',
    cursor: 'pointer', 
    boxShadow: '0 2px 4px rgba(1, 1, 1, 0.6)', 
    transition: 'background-color 0.3s ease', 
  }}
  onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'}
  onMouseOut={(e) => e.target.style.backgroundColor = '#852D6B'}
>
  Generate Report
</button>

    </div>
  </div>
</div>


    <div ref={ComponentsRef}>     
    <div className="flex justify-center">
      <div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-gradient3 rounded-lg mb-10">
                <tr>
                  <th className="px-10 py-6" style={{ fontSize: '28px', color: '#852D6B'}}>
                    #
                  </th>
                  <th className="px-10 py-6" style={{ fontSize: '28px', color: '#852D6B'}}>
                    User
                  </th>
                  <th className="px-10 py-6" style={{ fontSize: '28px', color: '#852D6B' }}>
                    Transition Id
                  </th>
                  <th className="px-10 py-6" style={{ fontSize: '28px', color: '#852D6B' }}>
                    Total Amount
                  </th>
                  <th className="px-10 py-6" style={{ fontSize: '28px', color: '#852D6B' }}>
                    Status
                  </th>
                  <th className="px-5 py-6" style={{ fontSize: '28px', color:'#957DAD' }}>
                    Confirm Order
                  </th>
                  <th className="px-5 py-6" style={{ fontSize: '28px', color: '#957DAD' }}>
                    Rejection
                  </th>
                </tr>
              </thead>

              <tbody style={{ fontWeight: 'Bold', fontSize: '17px' }}>
                {filteredPurchases.map((item, index) => (
                <React.Fragment key={index}>
                  <tr className={index >= 1 && index % 2 !== 0 ? "bg-gradient3" : ""}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{item.email}</td>
                    <td className="text-gray-500">{item.transitionId}</td>
                    <td className="text-center">{item.price?.toFixed(2)}</td>
                    <td className={item.status === "Rejected" ? "text-red-600" : "text-green-600"}>{item.status}</td>
                    <td className="text-center">
                {item.status === "Order Accepted and Confirmed" ? (
            <button
              to="/contact"
              className="btn btn-ghost btn-xs"
              style={{ backgroundColor: '#C70039 ', 
              color: 'white',
              borderRadius: '10px', 
              fontWeight: 'Bold',
                width: '150px',   
                height: '30px',   
                fontSize: '15px', 
                lineHeight: '20px', }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#C70039'}
            >
              Order Accepted
            </button>
          ) : (
            <button
              onClick={() => handleConfirm(item)}
              to="/contact"
              className="btn btn-ghost btn-xs"
              style={{ backgroundColor: '#852D6B',
                color: 'white',
                borderRadius: '10px',  
                height: '30px',   
                fontSize: '20px', 
                lineHeight: '20px'
               }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#852D6B'}
            >
              <GiConfirmed />
            </button>
          )}
        </td>


        <td className="text-center">
          <button
           onClick={() => handleReject(item)}
            to="/contact"
            className="btn btn-ghost btn-xs"
            style={{ 
            backgroundColor: '#8B0000', 
            color: 'white', 
            borderRadius: '10px',
            height: '30px',   
            fontSize: '15px', 
            lineHeight: '20px'
          }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#8B0000'}
          >
            <FaBan />
          </button>
            </td>
          </tr>
        </React.Fragment>
      ))}
  	</tbody>

              </table>
            </div>
          </div>
        </div>
    </div>
    </div>  


      <Footer className="mt-[90px] pl-[65px] pr-14 py-[65px] md:p-5 border border-solid white_A700_00_gray_600_00_border bg-gradient2" />
    </div>
  
  );
};

export default ManagePurchases;