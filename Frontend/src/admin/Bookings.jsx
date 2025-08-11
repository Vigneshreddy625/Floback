import { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  Users,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/bookings/all`, {
          withCredentials: true,
          params: {
            page: currentPage,
            limit: 10,
          },
        });
        const {
          bookings,
          totalBookings,
          totalPages,
          currentPage: responseCurrentPage,
        } = response.data.data;
        setBookings(bookings);
        setTotalBookings(totalBookings);
        setTotalPages(totalPages);
        setCurrentPage(responseCurrentPage);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch bookings. Please check your credentials and network connection."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [currentPage]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phoneNumber.includes(searchTerm) ||
      booking.serviceInterest.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">
          <p className="font-bold">Error loading bookings:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4">
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-xs sm:text-sm font-medium">
                  Total Bookings
                </p>
                <p className="text-xl sm:text-2xl font-bold">{totalBookings}</p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm font-medium">
                  Confirmed
                </p>
                <p className="text-xl sm:text-2xl font-bold">
                  {bookings.filter((b) => b.status === "confirmed").length}
                </p>
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-xs sm:text-sm font-medium">
                  Pending
                </p>
                <p className="text-xl sm:text-2xl font-bold">
                  {bookings.filter((b) => b.status === "pending").length}
                </p>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm font-medium">
                  Completed
                </p>
                <p className="text-xl sm:text-2xl font-bold">
                  {bookings.filter((b) => b.status === "completed").length}
                </p>
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-purple-200" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-4 border border-blue-200">
          <div className="flex flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="w-full sm:w-auto pl-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors bg-white text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Customer Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Service & Address
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Preferred Date & Time
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                        <span className="ml-3 text-gray-600">
                          Loading bookings...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking, index) => (
                    <tr
                      key={booking._id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="font-semibold text-gray-900">
                            {booking.fullName}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-1" /> {booking.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-1" />{" "}
                            {booking.phoneNumber}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900">
                            {booking.serviceInterest}
                          </div>
                          <div className="flex items-start text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2">
                              {booking.homeAddress}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-gray-900">
                            {formatDate(booking.preferredDate)}
                          </div>
                          <div className="text-sm text-gray-600 font-medium">
                            {booking.preferredTime}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {getStatusIcon(booking.status)}
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {formatDate(booking.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="block md:hidden">
            {loading && (
              <div className="p-8 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mb-3"></div>
                <span className="text-gray-600 font-medium">
                  Loading bookings...
                </span>
              </div>
            )}

            {filteredBookings.length === 0 && !loading && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No bookings found</p>
                <p className="text-gray-400 text-sm mt-1">
                  Try adjusting your filters
                </p>
              </div>
            )}

            <div className="divide-y divide-gray-100">
              {!loading &&
                filteredBookings.map((booking, index) => (
                  <div
                    key={booking._id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {booking.fullName}
                        </h3>
                        <div className="text-sm text-blue-600 font-medium truncate">
                          {booking.serviceInterest}
                        </div>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {getStatusIcon(booking.status)}
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{booking.phoneNumber}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate">
                          {booking.preferredTime}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 col-span-2">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1 text-xs leading-relaxed">
                          {booking.homeAddress}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <span>
                        Preferred: {formatDate(booking.preferredDate)}
                      </span>
                      <span>Created: {formatDate(booking.createdAt)}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
