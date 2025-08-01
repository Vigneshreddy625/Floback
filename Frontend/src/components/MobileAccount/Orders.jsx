import React, { useState } from 'react';
import { Search, Filter, Package, ChevronRight, Calendar, Clock, X, CheckCheck, Truck, ShoppingBag, RefreshCw, ArrowLeft } from 'lucide-react';

const MobileOrders = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    {
      id: 'ORD-12345',
      status: 'Delivered',
      statusColor: 'text-green-600',
      date: 'Thu, 26 Dec',
      timestamp: '10:23 AM',
      img: '/api/placeholder/80/80',
      title: 'iPhone 16 Pro Max',
      brand: 'Apple',
      price: '$1,299.00',
      review: 'Rate & Review',
      deliveryDetails: 'Delivered by FedEx',
      trackingId: 'FDX7834592',
      returnEligible: false
    },
    {
      id: 'ORD-12344',
      status: 'Delivered',
      statusColor: 'text-green-600',
      date: 'Wed, 25 Dec',
      timestamp: '11:45 AM',
      img: '/api/placeholder/80/80',
      title: 'Hair Dryer Professional',
      brand: 'Phillips',
      price: '$89.99',
      review: 'Thanks for your rating!',
      rating: 4,
      deliveryDetails: 'Delivered by USPS',
      trackingId: 'USP9823471',
      returnEligible: false
    },
    {
      id: 'ORD-12343',
      status: 'In Transit',
      statusColor: 'text-blue-600',
      date: 'Tue, 24 Dec',
      timestamp: '09:30 AM',
      img: '/api/placeholder/80/80',
      title: 'Wireless Headphones XM5',
      brand: 'Sony',
      price: '$349.99',
      deliveryDetails: 'On the way with DHL',
      trackingId: 'DHL5678901',
      estimatedDelivery: 'Dec 27',
      returnEligible: false
    },
    {
      id: 'ORD-12342',
      status: 'Processing',
      statusColor: 'text-yellow-600',
      date: 'Mon, 23 Dec',
      timestamp: '03:15 PM',
      img: '/api/placeholder/80/80',
      title: 'Smart Watch Series 9',
      brand: 'Samsung',
      price: '$299.99',
      deliveryDetails: 'Preparing for shipment',
      estimatedShipping: 'Dec 25',
      returnEligible: false
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'delivered' && order.status === 'Delivered') ||
                      (activeTab === 'transit' && order.status === 'In Transit') ||
                      (activeTab === 'processing' && order.status === 'Processing');
    
    const matchesSearch = searchQuery === '' || 
                          order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'price-high') {
      return parseFloat(b.price.replace('$', '').replace(',', '')) - 
             parseFloat(a.price.replace('$', '').replace(',', ''));
    } else if (sortBy === 'price-low') {
      return parseFloat(a.price.replace('$', '').replace(',', '')) - 
             parseFloat(b.price.replace('$', '').replace(',', ''));
    }
    return 0;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCheck className="w-5 h-5" />;
      case 'In Transit': return <Truck className="w-5 h-5" />;
      case 'Processing': return <ShoppingBag className="w-5 h-5" />;
      case 'Cancelled': return <X className="w-5 h-5" />;
      case 'Returned': return <RefreshCw className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white dark:bg-black">
      <div className="sticky top-0 z-10 pb-2 bg-white dark:bg-black border-b dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between mb-2">
          <div className='flex items-center space-x-3 mb-2'>
            <ArrowLeft className='w-6 h-6' onClick={() => window.history.back()} />
            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">My Orders</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">({filteredOrders.length} orders)</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-grow">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders"
                className="pl-10 pr-4 py-2 border rounded-lg text-sm w-full bg-transparent dark:border-gray-700"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex space-x-2 mb-2 overflow-x-auto pb-1">
          {['all', 'processing', 'transit', 'delivered'].map((tab) => (
            <button 
              key={tab}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-950 bg-gray-100 dark:bg-gray-600'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'all' ? 'All Orders' : 
               tab === 'processing' ? 'Processing' : 
               tab === 'transit' ? 'In Transit' : 
               'Delivered'}
            </button>
          ))}
        </div>

        {filterOpen && (
          <div className="border rounded-lg p-4 mb-4 bg-gray-50 dark:bg-black dark:border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Sort & Filter</h3>
              <button 
                onClick={() => setFilterOpen(false)}
                className="text-gray-600 dark:text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'recent', label: 'Most Recent' },
                  { value: 'oldest', label: 'Oldest First' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'price-low', label: 'Price: Low to High' }
                ].map((option) => (
                  <button 
                    key={option.value}
                    className={`px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      sortBy === option.value 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                        : 'text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700'
                    }`}
                    onClick={() => setSortBy(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {sortedOrders.length > 0 ? (
          sortedOrders.map((order, idx) => (
            <div 
              key={idx} 
              className="border rounded-lg p-4 space-y-4 bg-white dark:bg-black dark:border-gray-700 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`${order.statusColor}`}>
                    {getStatusIcon(order.status)}
                  </span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {order.status}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{order.id}</span>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{order.date}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{order.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 border-y py-3 dark:border-gray-700">
                <img 
                  src={order.img} 
                  alt={order.title} 
                  className="w-20 h-20 rounded-lg object-cover" 
                />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {order.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {order.brand}
                  </p>
                  <p className="text-base font-bold text-gray-900 dark:text-gray-100 mt-2">
                    {order.price}
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-500" />
              </div>

              <div className="space-y-1.5">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {order.deliveryDetails}
                </p>
                {order.trackingId && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tracking: {order.trackingId}
                  </p>
                )}
                {order.estimatedDelivery && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Estimated delivery: {order.estimatedDelivery}
                  </p>
                )}
                {order.estimatedShipping && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Estimated shipping: {order.estimatedShipping}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  {order.status === 'Delivered' && (
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < (order.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {order.status === 'Delivered' && (
                    <button className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {order.review === 'Rate & Review' ? 'Rate & Review' : 'Edit Review'}
                    </button>
                  )}
                  <button className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {order.returnEligible ? 'Return Item' : 'View Details'}
                    </button>
                </div>
                </div>
                </div>
            ))
            ) : (
                <div className="text-center text-gray-600 dark:text-gray-400">
                    No orders found.
                </div>
                )}
            </div>
        </div>
    );
}

export default MobileOrders;