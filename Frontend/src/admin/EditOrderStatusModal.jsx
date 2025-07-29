import React, { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


const statusOptions = ["Pending", "Processing", "Completed", "Delivered", "Cancelled"];

const EditOrderStatusModal = ({ isOpen, onClose,  order }) => {
  const [status, setStatus] = useState(order.orderStatus);

  useEffect(() => {
  if (order) {
    setStatus(order.orderStatus);
  }
}, [order]);

  console.log(order);

  const handleSubmit = () => {
    // onSubmit({ ...order, status });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[360px] sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white text-black p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">
            📦 Edit Order Status
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Update the status of this order below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-5 mt-6">
          {/* Order ID */}
          <div className="p-3 bg-white border rounded-xl">
            <Label className="text-sm text-gray-700">Order ID</Label>
            <Input
              value={order.orderId}
              disabled
              className="mt-1 bg-white border text-black"
            />
          </div>

          <div className="p-3 bg-white border rounded-xl">
            <Label className="text-sm text-gray-700">Order Status</Label>
            <Select value={status} onValueChange={(val) => setStatus(val)}>
              <SelectTrigger className="w-full mt-1 bg-white border text-black">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black border">
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="sm:mt-8">
          <Button
            variant="outline"
            onClick={onClose}
            className="border border-gray-400 text-black hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white  mb-2 sm:mb-0"
          >
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderStatusModal;
