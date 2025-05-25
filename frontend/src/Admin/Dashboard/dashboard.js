import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { ShoppingCart, DollarSign, Users } from "lucide-react";
import { toast } from "react-toastify";
import "../admin.css";
import { useEffect } from "react";
import { useState } from "react";
import SummaryApi from "../../common";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Lấy tất cả các User
  const fetchAllUsers = async () => {
    const dataResponse = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      const customer = dataApi.data.filter((user) => user.role === "USER");
      setUsers(customer);
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  // Lấy tất cả order đã giao
  const fetchAllOrder = async () => {
    const dataApi = await fetch(SummaryApi.allOrder.url, {
      method: SummaryApi.allOrder.method,
      credentials: "include",
    });
    const dataResponse = await dataApi.json();
    const order = dataResponse.data.filter(
      (order) => order.status == "Delivered"
    );
    setOrders(order);
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllOrder();
  }, []);

  // Thống kê 
  const dailyOrderData = () => {
    const dailyCount = {};

    orders.forEach((order) => {
      const day = moment(order.createdAt).format("YYYY-MM-DD"); // ví dụ: 2025-05-21
      dailyCount[day] = (dailyCount[day] || 0) + 1;
    });

    return Object.keys(dailyCount)
      .sort() 
      .map((day) => ({
        date: day,
        orders: dailyCount[day],
      }));
  };

  const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);
  
  return (
    <>
      <div className="p-2 bg-gray-900 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-8">
          <Card className="bg-danger shadow-lg rounded-xl p-6 d-flex align-items-center justify-between transition-transform transform hover:scale-105">
            <CardContent className="d-flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Doanh thu
                </h2>
                <p className="text-3xl font-bold text-gray-900">
                  {totalRevenue.toLocaleString()} VND
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-green-500 text-center" />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between transition-transform transform hover:scale-105">
            <CardContent>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Đơn hàng</h2>
                <p className="text-3xl font-bold text-gray-900">
                  {orders.length}
                </p>
              </div>
              <ShoppingCart className="w-12 h-12 text-blue-500" />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between transition-transform transform hover:scale-105">
            <CardContent>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Khách hàng
                </h2>
                <p className="text-3xl font-bold text-gray-900">{users.length}</p>
              </div>
              <Users className="w-12 h-12 text-purple-500" />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow mt-2">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Biểu đồ số đơn hàng theo ngày
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyOrderData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Dashboard;
