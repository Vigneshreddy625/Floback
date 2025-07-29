import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Package, Users, Box } from 'lucide-react';


const dummyOrders = [
  { id: '#12345', customer: 'Alice Smith', date: '2025-07-15', status: 'Pending', total: '$150.00' },
  { id: '#12346', customer: 'Bob Johnson', date: '2025-07-14', status: 'Shipped', total: '$230.50' },
  { id: '#12347', customer: 'Charlie Brown', date: '2025-07-13', status: 'Delivered', total: '$85.20' },
  { id: '#12348', customer: 'Diana Prince', date: '2025-07-12', status: 'Pending', total: '$420.00' },
  { id: '#12349', customer: 'Eve Adams', date: '2025-07-11', status: 'Delivered', total: '$75.00' },
];

const dummyProducts = [
  { id: 'PROD001', name: 'Wireless Headphones', price: '$99.99', date: '2025-07-15', image: 'https://placehold.co/60x60/fefefe/333?text=🎧' },
  { id: 'PROD002', name: 'Smartwatch V2', price: '$199.00', date: '2025-07-14', image: 'https://placehold.co/60x60/fefefe/333?text=⌚' },
  { id: 'PROD003', name: 'USB-C Hub', price: '$45.50', date: '2025-07-13', image: 'https://placehold.co/60x60/fefefe/333?text=🔌' },
  { id: 'PROD004', name: 'Portable Charger', price: '$30.00', date: '2025-07-12', image: 'https://placehold.co/60x60/fefefe/333?text=⚡' },
  { id: 'PROD005', name: 'Ergonomic Mouse', price: '$25.00', date: '2025-07-11', image: 'https://placehold.co/60x60/fefefe/333?text=🖱️' },
];

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
};

const InfoCard = ({ title, value, icon: Icon, gradient }) => (
  <div className={`p-3 md:p-6 rounded-2xl text-white shadow-lg transform transition hover:scale-105 ${gradient}`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <h3 className="text-lg md:text-3xl font-bold tracking-wide mt-1">{value}</h3>
      </div>
      <div className="p-3 bg-white/20 backdrop-blur-md rounded-full">
        {Icon && <Icon size={28} className="text-white" />}
      </div>
    </div>
  </div>
);

const OrdersTable = () => (
  <div className="bg-white rounded-3xl px-6 py-4 shadow-xl border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800">🧾 Recent Orders</h2>
      <Link to="/admin/orders" className="text-sm text-blue-600 hover:underline font-medium">View All</Link>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {dummyOrders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-4 font-medium text-gray-800">{order.id}</td>
              <td className="px-4 py-4">{order.customer}</td>
              <td className="px-4 py-4 text-gray-500">{order.date}</td>
              <td className="px-4 py-4">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-4 text-right font-medium text-gray-800">{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ProductsTable = () => (
  <div className="bg-white rounded-3xl px-4 py-4 shadow-xl border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800">🛍️ Recently Bought Products</h2>
            <Link to="/admin/products" className="text-sm text-blue-600 hover:underline font-medium">More...</Link>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Product ID</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-right">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {dummyProducts.map(product => (
            <tr key={product.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md border" />
                <span className="font-medium text-gray-800">{product.name}</span>
              </td>
              <td className="px-4 py-4">{product.id}</td>
              <td className="px-4 py-4 text-gray-500">{product.date}</td>
              <td className="px-4 py-4 text-right font-medium text-gray-800">{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Usage in your dashboard:
const DashboardPage = () => (
  <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-tr from-[#f8fafc] to-[#e2e8f0] min-h-screen space-y-6">
    {/* Info Cards Grid */}
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
      <InfoCard
        title="Total Revenue"
        value="$85,420"
        icon={BarChart3}
        gradient="bg-gradient-to-br from-[#667eea] to-[#764ba2]"
      />
      <InfoCard
        title="Total Orders"
        value="1,280"
        icon={Package}
        gradient="bg-gradient-to-br from-[#f7971e] to-[#ffd200]"
      />
      <InfoCard
        title="Users"
        value="750"
        icon={Users}
        gradient="bg-gradient-to-br from-[#56ab2f] to-[#a8e063]"
      />
      <InfoCard
        title="Products"
        value="240"
        icon={Box}
        gradient="bg-gradient-to-br from-[#ee0979] to-[#ff6a00]"
      />
    </div>

    {/* Orders Table */}
    <div className="w-full">
      <OrdersTable />
    </div>

    {/* Products Table */}
    <div className="w-full">
      <ProductsTable />
    </div>
  </div>
);


export default DashboardPage;
