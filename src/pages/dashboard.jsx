import { useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CashIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  TrendingUpIcon,
  ClockIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "./sidebar";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState("week");

  // Sample data - replace with your actual data
  const metrics = [
    {
      title: "Total Revenue",
      value: "$12,845",
      change: 12.5,
      icon: CashIcon,
      trend: "up",
    },
    {
      title: "Total Sales",
      value: "324",
      change: 8.2,
      icon: ShoppingBagIcon,
      trend: "up",
    },
    {
      title: "New Customers",
      value: "48",
      change: -3.4,
      icon: UserGroupIcon,
      trend: "down",
    },
    {
      title: "Avg. Order Value",
      value: "$39.65",
      change: 5.1,
      icon: TrendingUpIcon,
      trend: "up",
    },
  ];

  const recentTransactions = [
    {
      id: "#1001",
      customer: "Sarah Johnson",
      amount: "$125.50",
      time: "10 min ago",
      status: "completed",
    },
    {
      id: "#1000",
      customer: "Michael Chen",
      amount: "$89.99",
      time: "25 min ago",
      status: "completed",
    },
    {
      id: "#999",
      customer: "Emma Williams",
      amount: "$245.75",
      time: "1 hour ago",
      status: "completed",
    },
    {
      id: "#998",
      customer: "David Kim",
      amount: "$62.30",
      time: "2 hours ago",
      status: "refunded",
    },
    {
      id: "#997",
      customer: "Lisa Rodriguez",
      amount: "$179.40",
      time: "3 hours ago",
      status: "completed",
    },
  ];

  const inventoryAlerts = [
    { product: "Wireless Earbuds Pro", stock: 2, threshold: 5 },
    { product: "Organic Green Tea", stock: 3, threshold: 10 },
    { product: "Stainless Steel Water Bottle", stock: 4, threshold: 8 },
  ];

  // Chart data
  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [1250, 1900, 1700, 2100, 2400, 3200, 2800],
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const categoryData = {
    labels: ["Electronics", "Clothing", "Groceries", "Home Goods", "Beauty"],
    datasets: [
      {
        label: "Sales by Category",
        data: [4200, 3100, 2800, 1900, 1500],
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(139, 92, 246, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex h-screen">
      {/* Topbar */}
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange("day")}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === "day"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeRange("week")}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === "week"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange("month")}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === "month"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-indigo-50 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    metric.trend === "up" ? "bg-indigo-50" : "bg-red-50"
                  }`}
                >
                  <metric.icon
                    className={`w-6 h-6 ${
                      metric.trend === "up" ? "text-indigo-600" : "text-red-600"
                    }`}
                  />
                </div>
              </div>
              <div
                className={`mt-4 flex items-center text-sm ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.trend === "up" ? (
                  <ArrowUpIcon className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 mr-1" />
                )}
                <span>
                  {metric.change}% from last {timeRange}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Sales Trend</h3>
              <div className="flex items-center text-sm text-indigo-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>12.5% growth</span>
              </div>
            </div>
            <div className="h-64">
              <Line
                data={salesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        drawBorder: false,
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-medium text-gray-800 mb-4">
              Sales by Category
            </h3>
            <div className="h-64">
              <Bar
                data={categoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        drawBorder: false,
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent Transactions and Inventory Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Recent Transactions</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div>
                    <p className="font-medium">{transaction.id}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.customer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        transaction.status === "refunded"
                          ? "text-red-600"
                          : "text-gray-800"
                      }`}
                    >
                      {transaction.amount}
                    </p>
                    <div className="flex items-center justify-end text-sm text-gray-500">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      <span>{transaction.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Inventory Alerts</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {inventoryAlerts.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <ExclamationIcon className="w-5 h-5 text-red-600 mr-3" />
                    <div>
                      <p className="font-medium">{item.product}</p>
                      <p className="text-sm text-gray-600">
                        Threshold: {item.threshold}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-red-600">
                      {item.stock}
                    </p>
                    <p className="text-xs text-gray-500">remaining</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
