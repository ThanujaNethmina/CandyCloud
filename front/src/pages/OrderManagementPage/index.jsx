import React from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Text, Heading, Img, Input } from "../../components";
import Footer from "../../components/Footer";
import useAuth from "hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Header from "../../components/navbar"

export default function OrderManagementPagePage() {
  const [searchBarValue5, setSearchBarValue5] = React.useState("");
  const { user } = useAuth();
  const { refetch, data: payments = [] } = useQuery({
    queryKey: ["purchases", user?.email],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:3001/payments?email=${user?.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch payment details");
        }
        const data = await response.json();
        return data;
        //return res.json();
      } catch (error) {
        console.error("Error fetching payment details:", error);
        return [];
      }
  },
});

//console.log(payments)
const formatDate=(createdAt)=>{
  const createdAtDate=new Date(createdAt)
  return createdAtDate.toLocaleDateString()
}


//handle search function
const handleChange = (e) => {
  if (e.target) {
    setSearchBarValue5(e.target.value);
  } else {
    console.error("Event target is undefined or null:", e);
  }
};

const filteredPayments = payments.filter(item =>
  formatDate(item.createdAt).includes(searchBarValue5)
);


  return (
    <>
      <Helmet>
        <title>Dasuni's Application2</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>


      <div className="w-full bg-gradient1 section container">
      
      <Header/>


      {/*search bar displayment*/}
      
      <div className="flex md:flex-col items-end mb-[18px] ml-[78px] md:ml-0 flex-1 justify-end" style={{ marginRight: '10rem' }}>
              <Input
                size="sm"
                variant="outline"
                shape="round"
                color="white_A700_white_A700_00"
                name="search"
                placeholder={`Search by Order Date...`}
                value={searchBarValue5}
                onChange={(e) => setSearchBarValue5(e)}
                suffix={
                  searchBarValue5?.length > 0 ? (
                    <CloseSVG onClick={() => setSearchBarValue5("")} height={29} width={26} fillColor="#ffffffff" />
                  ) : (
                    <Img src="images/img_search.svg" alt="search" className="cursor-pointer" />
                  )
                }
                className="w-[32%] md:w-full text-white-A700_e5 font-semibold !rounded-[10px] ml-auto"
              />


      </div>


            <div className="flex flex-col items-center mb-8">
            <Heading size="13xl" as="h1">
              Track All <span className="ttext" style={{ color: "#852D6B", letterSpacing: "2.5px",fontStyle:"bold" }}> Orders!</span>
            </Heading>
            </div>

            <div className="flex justify-center">

            {/*table for the order management page*/}
            <div>
            <div>
            <div className="overflow-x-auto ">
              <table className="table">
    
    
              <thead className="p-[13px] border border-solid white_A700_white_A700_00_border bg-gradient3 rounded-[5px] mb-8">
      
        <tr>
        <th className="px-10 py-6" style={{ marginLeft: '-1px' }}>
        <Heading size="5xl" as="h5" className="!text-pink-900" style={{ fontWeight: 'bold'}}>
                  #
        </Heading>
        </th>
        <th className="px-12 py-6">
        <Heading size="5xl" as="h5" className="!text-pink-900" style={{ fontWeight: 'bold'}}>
                  Ordered Date
        </Heading>
        </th>
        <th className="px-10 py-6" > 
        <Heading size="5xl" as="h5" className="!text-pink-900" style={{ fontWeight: 'bold'}}>
                  Trasition Id
        </Heading>
        </th>
        <th className="px-16 py-6">
        <Heading size="5xl" as="h5" className="!text-pink-900" style={{ fontWeight: 'bold'}}>
                  Total Amount
        </Heading>
        </th>
        <th className="px-10 py-6"> 
        <Heading size="5xl" as="h5" className="!text-pink-900" style={{ fontWeight: 'bold'}}>
                  Status
        </Heading>
        </th>
        <th className="px-10 py-6" >
        <Heading size="5xl" as="h6" className="!text-pink-900" style={{ fontWeight: 'bold'}}>
                  Action
        </Heading>
        </th>
      </tr>
      
    </thead>

    
    <tbody className="mt-60" style={{ fontSize: '19px' }}>
  {filteredPayments.map((item, index) => (
    <React.Fragment key={index}>
      <tr className={index >= 1 && index % 2 !== 0 ? "bg-gradient3" : ""} style={{fontWeight: 'bold'}}>
        <td className="text-center" style={{ paddingLeft: '20px' }}>{index + 1}</td>
        <td className="text-center">{formatDate(item.createdAt)}</td>
        <td className="text-center self-start !text-gray-600_01 " style={{fontStyle: 'normal', fontFamily: 'Arial'}}>{item.transitionId}</td>
        <td style={{fontWeight: 'semi-bold',paddingLeft: '100px'}}>
          <div style={{ display: 'flex', alignItems: 'center'}}>{item.price.toFixed(2)}</div>
        </td>
        <td className="!text-green-A700" style={{fontWeight: 'bold'}}>{item.status}</td>
        <td className="text-center">
          <Link to="/contact" 
            className="btn btn-ghost btn-xs"  
            style={{
              backgroundColor: '#852D6B',
              color:'white',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#852D6B'}
          >
            contact
          </Link>
        </td>
        <div className="h-[2px] bg-white-A700" />
      </tr>
    </React.Fragment>
  ))}
</tbody>

          
          </table>
          </div>
           </div>
            </div>
            </div>

        <Footer className="mt-[90px] pl-[65px] pr-14 py-[65px] md:p-5 border border-solid white_A700_00_gray_600_00_border bg-gradient2" />
      </div>
    </>
  );
}
