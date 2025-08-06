export const cardContainer = "border shadow-sm hover:shadow-md transition-shadow duration-300";
export const wishlistImage = "w-full h-56 md:h-64 object-cover bg-transparent border-b";
export const removeButton = "absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200";
export const moveToBagButton = (stockStatus) =>
  `md:mt-2 py-2 w-full border-t text-sm font-medium ${
    stockStatus === "In Stock"
      ? "text-pink-500 hover:bg-pink-50"
      : "text-blue-500 hover:bg-blue-50"
  }`;