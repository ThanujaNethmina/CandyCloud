import React from "react";
import { CloseSVG } from "../../assets/images";
import { Heading, Img, Input } from "../../components";
import Footer from "../../components/Footer";
import useAuth from "hooks/useAuth";
import useAxiosSecure from "hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaBook, FaDollarSign, FaShoppingCart, FaUsers } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, Bar, BarChart, Cell } from 'recharts';
import Header from "../../components/adminNavbar"

export default function OrderPaymentManaging() {
  const [searchBarValue2, setSearchBarValue2] = React.useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: stats = [] } = useQuery({
    queryKey:   ["stats"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/adminStats");
        return res.data;
      } catch (error) {
        console.error("Error fetching stats details:", error);
        return [];
      }
    },
  });
  
  
  

  const PieChartData = [
    { name: "Users Count", value: stats.usersCount|| 0  },
    { name: "Products Count", value: stats.productsCount || 0 },
    { name: "Purchases Count", value: stats.purchasesCount || 0 },
    { name: "Orders Count", value: stats.ordersCount|| 0  },
    { name: "Revenue", value: stats.revenue || 0 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

 

  return (
    
      <div className="w-full bg-gradient4">
        <Header/>
        <div className="flex flex-col items-center mb-12">
          <Heading size="13xl" as="h1">
            Summary and charts - <span className="ttext" style={{ color: "#852D6B", letterSpacing: "2.5px", fontStyle: "bold" }}> All Orders and Payment!</span>
          </Heading>
        </div>

        <div className="w-full md:w-[870px] mx-auto px-4 mb-8" style={{ marginLeft: '70px' }} >
          <h2 className="text-2xl font-semibold my-4"> Hi,Mrs. {user?.displayName || "Guest"} </h2>
        </div>

        {/* Stats div */}
        <div className="stats stats-horizontal lg:stats-horizontal shadow" style={{ width: '80%', height: '200px', marginLeft: '70px' }}>
          <div className="stat bg-emerald-200">
            <div className="stat-figure text-secondary text-4xl">
              <FaDollarSign />
            </div>
            <div className="stat-title" style={{ fontSize: '26px', fontWeight: 'semi-bold' }}>Revenue</div>
            <div className="stat-value" style={{ fontSize: '50px' }}>Rs.{stats.revenue}</div>
            <div className="stat-desc" style={{ fontSize: '20px', fontWeight: 'semi-bold' }}>Jan 1st - Feb 1st</div>
          </div>

          <div className="stat bg-orange-200">
            <div className="stat-figure text-secondary text-4xl">
              <FaUsers />
            </div>
            <div className="stat-title" style={{ fontSize: '26px', fontWeight: 'semi-bold' }}>Users</div>
            <div className="stat-value" style={{ fontSize: '50px' }}>{stats.usersCount}</div>
            <div className="stat-desc" style={{ fontSize: '20px', fontWeight: 'semi-bold' }}>↗︎ 400 (22%)</div>
          </div>

          <div className="stat bg-indigo-200">
            <div className="stat-figure text-secondary text-3xl">
              <FaBook />
            </div>
            <div className="stat-title" style={{ fontSize: '26px', fontWeight: 'semi-bold' }}>Product Items</div>
            <div className="stat-value" style={{ fontSize: '50px' }}>{stats.productsCount}</div>
            <div className="stat-desc" style={{ fontSize: '20px', fontWeight: 'semi-bold' }}>↘︎ 90 (14%)</div>
          </div>

          <div className="stat bg-purple-200">
            <div className="stat-figure text-secondary text-4xl">
              <FaShoppingCart />
            </div>
            <div className="stat-title" style={{ fontSize: '26px', fontWeight: 'semi-bold' }}>All Purchases</div>
            <div className="stat-value" style={{ fontSize: '50px' }}>{stats.purchasesCount}</div>
            <div className="stat-desc" style={{ fontSize: '20px', fontWeight: 'semi-bold' }}>↘︎ 90 (14%)</div>
          </div>
        </div>

        <div className="mt-16 flex justify-between">
        {/* Bar chart */}
        <div className="w-2/3">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={[stats]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usersCount" fill="#A020F0" name="Users Count" />
              <Bar dataKey="productsCount" fill="#82ca9d" name="Products Count" />
              <Bar dataKey="purchasesCount" fill="#ffc658" name="Purchases Count" />
              <Bar dataKey="ordersCount" fill="#FF5733" name="Orders Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="w-1/3">
          <PieChart width={400} height={400}>
            <Pie
              data={PieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {PieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
      


      <Footer className="mt-[30px] pl-[65px] pr-14 py-[65px] md:p-5 border border-solid white_A700_00_gray_600_00_border bg-gradient2" />
      </div>

  );
}


