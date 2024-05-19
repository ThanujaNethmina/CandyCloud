//hooks used for get data from getPurchaseByEmail and display in the project(backend connection to frontend)

import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "contexts/AuthProvider";
import { useContext } from "react";

const usePurchase = () => {
  const { user } = useContext(AuthContext);
  const { refetch, data: purchases = [] } = useQuery({
    queryKey: ["purchases", user?.email],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:3001/purchase?email=${user?.email}`);
        if (!res.ok) {
          throw new Error("Failed to fetch purchase data");
        }
        const responseData = await res.json();

        const modifiedData = responseData.map(item => ({
          id: item._id,
          image:item.image,
          name: item.name,
          quantity: item.quantity,
          price:item.price
          
        }));

        return modifiedData;
      } catch (error) {
        console.error("Error fetching purchase data:", error);
        return []; 
      }
    }
  });

  return [purchases, refetch];
};

export default usePurchase;
