import React, { useState, useEffect } from "react"; // Added useEffect
import { useDispatch, useSelector } from "react-redux"; // Added useDispatch, useSelector
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// import axios from "axios"; // No longer needed for direct API calls

import {
  selectOperationLoading, // Selectors for loading and error states
  selectOperationError,
  clearErrors, // Action to clear errors
} from "../redux/Products/productSlice";

import { addProduct } from "../redux/Products/productSlice";

const ProductFormModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectOperationLoading);
  const error = useSelector(selectOperationError);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    newArrival: false,
    isBestSeller: false,
    rating: 0,
    reviews: 0,
    stockStatus: "In Stock",
    stockQuantity: 0,
    category: "",
    brand: "",
    // sizes and features are handled separately as arrays of strings
    shipping: "",
    returns: "",
  });

  const [colors, setColors] = useState([
    { name: "", value: "", hex: "#000000" },
  ]);
  const [sizes, setSizes] = useState([""]);
  const [features, setFeatures] = useState([""]);
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Clear errors when the modal opens or closes
  useEffect(() => {
    if (isOpen) {
      dispatch(clearErrors());
    }
  }, [isOpen, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const updateArray = (index, value, array, setArray) => {
    const updated = [...array];
    updated[index] = value;
    setArray(updated);
  };

  // Function to reset form fields
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      originalPrice: "",
      newArrival: false,
      isBestSeller: false,
      rating: 0,
      reviews: 0,
      stockStatus: "In Stock",
      stockQuantity: 0,
      category: "",
      brand: "",
      shipping: "",
      returns: "",
    });
    setColors([{ name: "", value: "", hex: "#000000" }]);
    setSizes([""]);
    setFeatures([""]);
    setThumbnail(null);
    setGallery([]);
  };

 // ProductFormModal.jsx
const handleSubmit = async (e) => { // Keep this as async
  e.preventDefault();

  const productDataForRedux = {
    ...form,
    colors: colors,
    sizes: sizes.filter((s) => s.trim() !== ""),
    features: features.filter((f) => f.trim() !== ""),
    image: thumbnail,
    images: gallery,
  };

  // AWAIT the dispatch result here
  const resultAction = await dispatch(addProduct(productDataForRedux));

  // Now, resultAction will be the resolved/rejected action object
  if (addProduct.fulfilled.match(resultAction)) {
    console.log("Product created:", resultAction.payload.data);
    resetForm(); // Reset form on success
    onClose(); // Close modal after success
  } else {
    // resultAction.payload will now contain the actual error from rejectWithValue
    console.error("Error creating product (from Redux thunk payload):", resultAction.payload);
    // The error is also in your `error` state from useSelector(selectOperationError)
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-screen md:max-h-[90vh] overflow-y-scroll max-w-3xl shadow-xl border border-muted">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        {loading && <p className="text-blue-500">Submitting product...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:grid lg:grid-cols-2 gap-4"
        >
          <Input
            name="title"
            placeholder="Product Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <Input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="col-span-2 w-full rounded-md border px-3 py-2"
          />

          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <Input
            name="originalPrice"
            type="number"
            placeholder="Original Price"
            value={form.originalPrice}
            onChange={handleChange}
            required
          />

          <Input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
          />
          <Input
            name="stockQuantity"
            type="number"
            placeholder="Stock Quantity"
            value={form.stockQuantity}
            onChange={handleChange}
          />

          <Input
            name="rating"
            type="number"
            placeholder="Rating (0–5)"
            value={form.rating}
            onChange={handleChange}
            min="0"
            max="5"
          />
          <Input
            name="reviews"
            type="number"
            placeholder="Reviews"
            value={form.reviews}
            onChange={handleChange}
            min="0"
          />

          <Select
            value={form.stockStatus}
            onValueChange={(val) => setForm({ ...form, stockStatus: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              <SelectItem value="Limited Stock">Limited Stock</SelectItem>
            </SelectContent>
          </Select>

          <Input
            name="shipping"
            placeholder="Shipping Info"
            value={form.shipping}
            onChange={handleChange}
          />
          <Input
            name="returns"
            placeholder="Return Policy"
            value={form.returns}
            onChange={handleChange}
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={form.newArrival}
                onCheckedChange={(val) => setForm({ ...form, newArrival: val })}
              />
              New Arrival
            </label>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={form.isBestSeller}
                onCheckedChange={(val) =>
                  setForm({ ...form, isBestSeller: val })
                }
              />
              Best Seller
            </label>
          </div>

          <div className="col-span-2">
            <label className="font-medium">Thumbnail Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])} // Correctly sets a single File object
            />
          </div>

          <div className="col-span-2">
            <label className="font-medium">Gallery Images</label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setGallery(Array.from(e.target.files))}
            />
          </div>

          <div className="col-span-2">
            <label className="font-medium">Colors</label>
            {colors.map((c, i) => (
              <div key={i} className="flex gap-2 mt-1">
                <Input
                  placeholder="Name"
                  value={c.name}
                  onChange={(e) => {
                    const updated = [...colors];
                    updated[i].name = e.target.value;
                    setColors(updated);
                  }}
                />
                <Input
                  placeholder="Value"
                  value={c.value}
                  onChange={(e) => {
                    const updated = [...colors];
                    updated[i].value = e.target.value;
                    setColors(updated);
                  }}
                />
                <Input
                  type="color"
                  value={c.hex}
                  onChange={(e) => {
                    const updated = [...colors];
                    updated[i].hex = e.target.value;
                    setColors(updated);
                  }}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={() =>
                setColors([...colors, { name: "", value: "", hex: "#000000" }])
              }
            >
              + Add Color
            </Button>
          </div>

          <div>
            <label className="font-medium">Sizes</label>
            {sizes.map((s, i) => (
              <Input
                key={i}
                value={s}
                onChange={(e) =>
                  updateArray(i, e.target.value, sizes, setSizes)
                }
                className="mt-1"
              />
            ))}
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={() => setSizes([...sizes, ""])}
            >
              + Add Size
            </Button>
          </div>

          <div>
            <label className="font-medium">Features</label>
            {features.map((f, i) => (
              <Input
                key={i}
                value={f}
                onChange={(e) =>
                  updateArray(i, e.target.value, features, setFeatures)
                }
                className="mt-1"
              />
            ))}
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={() => setFeatures([...features, ""])}
            >
              + Add Feature
            </Button>
          </div>

          <DialogFooter className="col-span-2">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white w-full"
              disabled={loading}
            >
              {loading ? "Adding Product..." : "Submit Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
