import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const stockOptions = ["In Stock", "Out of Stock", "Limited Stock"];

const ProductEditModal = ({ isOpen, onClose, onSubmit, product }) => {
  const [formData, setFormData] = useState(product);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl border border-muted">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Product</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Make changes to product details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter product title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              placeholder="Enter brand name"
              value={formData.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="originalPrice">Original Price</Label>
            <Input
              id="originalPrice"
              type="number"
              placeholder="0.00"
              value={formData.originalPrice}
              onChange={(e) => handleChange("originalPrice", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="stockStatus">Stock Status</Label>
            <Select
              value={formData.stockStatus}
              onValueChange={(val) => handleChange("stockStatus", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select stock status" />
              </SelectTrigger>
              <SelectContent>
                {stockOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="newArrival"
              checked={formData.newArrival}
              onCheckedChange={(val) => handleChange("newArrival", val)}
            />
            <Label htmlFor="newArrival">New Arrival</Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="isBestSeller"
              checked={formData.isBestSeller}
              onCheckedChange={(val) => handleChange("isBestSeller", val)}
            />
            <Label htmlFor="isBestSeller">Best Seller</Label>
          </div>
        </div>

        <DialogFooter className="mt-8">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditModal;
