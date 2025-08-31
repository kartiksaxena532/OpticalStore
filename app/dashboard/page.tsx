"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
// keep your original path if it's actually spelled this way
import { ContainerScroll } from "@/components/conatiner-scroll";
import Image from "next/image";
import banner from "@/public/banner.jpeg";

// 🔹 Initial formData based on your Firestore schema
const initialFormData = {
  fldAddress: "",
  fldCity: "",
  fldCustomerId: "",
  fldCustomerName: "",
  fldDOB: "",
  fldEmail: "",
  fldGender: "",
  fldMobileNo: "",
  fldPin: "",
  fldSalutation: "",
  fldState: "",
  latestOrderStatus: "",
  orders: [
    {
      _id: "",
      fldBalance: 0,
      fldCDate: "",
      fldDDate: "",
      fldEstimate: 0,
      fldOrderNo: "",
      fldOrderStatus: "",
      orderDetails: [
        {
          fldAmt: 0,
          fldItemName: "",
          fldOrderNo: "",
          fldQty: 0,
          fldRate: 0,
        },
      ],
      outstandingBalance: 0,
    },
  ],
  prescription: {
    fldCustomerId: "",
    fldLDVAX: "",
    fldLDVCyl: "",
    fldLDVSph: "",
    fldPrescriptionNo: "",
    fldRDVAx: "",
    fldRDVCyl: "",
    fldRDVSph: "",
  },
   fldNotes: "",
};

type FormData = typeof initialFormData;
type Order = FormData["orders"][number];
type OrderDetail = Order["orderDetails"][number];

const numericOrderFields = new Set<keyof Order>([
  "fldBalance",
  "fldEstimate",
  "outstandingBalance",
]);

const numericOrderDetailFields = new Set<keyof OrderDetail>([
  "fldAmt",
  "fldQty",
  "fldRate",
]);

const toNumber = (v: string) => {
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
};

// Show placeholders for numeric inputs by not rendering initial 0
const displayNumber = (n: number) => (n === 0 ? "" : String(n));

const Page = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [successMsg, setSuccessMsg] = useState("");

  /** 🔹 Handle top-level fields */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
  };

  /** 🔹 Handle nested order fields (only first order for now) */
  const handleOrderChange = (field: keyof Order, value: string) => {
    setFormData((prev) => {
      const newOrders = [...prev.orders];
      const castValue = numericOrderFields.has(field) ? toNumber(value) : value;
      newOrders[0] = { ...newOrders[0], [field]: castValue } as Order;
      return { ...prev, orders: newOrders };
    });
  };

  /** 🔹 Handle nested orderDetail fields (only first item) */
  const handleOrderDetailChange = (field: keyof OrderDetail, value: string) => {
    setFormData((prev) => {
      const newOrders = [...prev.orders];
      const newOrderDetails = [...newOrders[0].orderDetails];
      const castValue = numericOrderDetailFields.has(field) ? toNumber(value) : value;
      newOrderDetails[0] = { ...newOrderDetails[0], [field]: castValue } as OrderDetail;
      newOrders[0] = { ...newOrders[0], orderDetails: newOrderDetails };
      return { ...prev, orders: newOrders };
    });
  };

  /** 🔹 Handle prescription fields */
  const handlePrescriptionChange = (field: keyof FormData["prescription"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      prescription: { ...prev.prescription, [field]: value.toUpperCase() },
    }));
  };

  /** 🔹 Submit form */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "customers"), formData);
      console.log("✅ Added with ID:", docRef.id);
      setSuccessMsg("✅ Customer added successfully!");
      setFormData(initialFormData);
    } catch (error) {
      console.error("❌ Error adding customer:", error);
      setSuccessMsg("⚠️ Failed to add customer");
    }
  };

  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
      {/* 🔹 Background Blur */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-9rem)] aspect-[1155/678] w-[36.125rem] 
          -translate-x-1/4 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] 
          to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* 🔹 Hero Section */}
      
       <h1 className="text-3xl mt-10 md:text-5xl font-semibold text-white">
              <span className="text-xl md:text-5xl font-bold text-white-800 mb-6">
                 Add New Customer ✅
              </span>
            </h1>
     

      {/* 🔹 Add Customer Form (wider + denser) */}
      <section className="flex flex-col mt-10 w-full max-w-6xl bg-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-lg">

        <form
          onSubmit={handleSubmit}
          className="p-6 w-full mx-auto space-y-8 bg-white/40 rounded-xl shadow"
        >
          {/* ================= BASIC INFO ================= */}
          <fieldset className="border border-gray-200 rounded-lg p-4">
            <legend className="px-2 text-sm font-semibold text-gray-700">Basic Information</legend>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                name="fldSalutation"
                value={formData.fldSalutation}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="">Salutation</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Dr.">Dr.</option>
                <option value="Mx.">Mx.</option>
              </select>

              <input
                name="fldCustomerName"
                placeholder="Full name (e.g., Rohan Sharma)"
                value={formData.fldCustomerName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                name="fldCustomerId"
                placeholder="Customer ID (unique)"
                value={formData.fldCustomerId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                name="fldEmail"
                type="email"
                placeholder="Email (e.g., rohan@email.com)"
                value={formData.fldEmail}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                name="fldMobileNo"
                inputMode="numeric"
                placeholder="Mobile number (10 digits)"
                value={formData.fldMobileNo}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                name="fldDOB"
                type="date"
                placeholder="Date of Birth"
                value={formData.fldDOB}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <select
                name="fldGender"
                value={formData.fldGender}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other / Prefer not to say</option>
              </select>

              <input
                name="fldAddress"
                placeholder="Street address (House No., Area)"
                value={formData.fldAddress}
                onChange={handleChange}
                className="w-full p-2 border rounded md:col-span-2"
              />

              <input
                name="fldCity"
                placeholder="City (e.g., Jaipur)"
                value={formData.fldCity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <select
                name="fldState"
                value={formData.fldState}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="">State</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                {/* Add more states as needed */}
              </select>

              <input
                name="fldPin"
                inputMode="numeric"
                placeholder="PIN code (6 digits)"
                value={formData.fldPin}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </fieldset>

          {/* ================= ORDER SUMMARY ================= */}
          <fieldset className="border border-gray-200 rounded-lg p-4">
            <legend className="px-2 text-sm font-semibold text-gray-700">Order — Summary</legend>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="latestOrderStatus"
                placeholder="Latest order status (e.g., Delivered / In-Progress)"
                value={formData.latestOrderStatus}
                onChange={handleChange}
                className="w-full p-2 border rounded md:col-span-2"
              />
            </div>
          </fieldset>

          {/* ================= ORDER (FIRST) ================= */}
          <fieldset className="border border-gray-200 rounded-lg p-4">
            <legend className="px-2 text-sm font-semibold text-gray-700">Order — Header (First)</legend>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                placeholder="Order internal ID (_id)"
                value={formData.orders[0]._id}
                onChange={(e) => handleOrderChange("_id", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                placeholder="Order number (shown to customer)"
                value={formData.orders[0].fldOrderNo}
                onChange={(e) => handleOrderChange("fldOrderNo", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                placeholder="Created date"
                value={formData.orders[0].fldCDate}
                onChange={(e) => handleOrderChange("fldCDate", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                placeholder="Delivery date (expected/actual)"
                value={formData.orders[0].fldDDate}
                onChange={(e) => handleOrderChange("fldDDate", e.target.value)}
                className="w-full p-2 border rounded"
              />

              <input
                type="number"
                inputMode="decimal"
                step="any"
                placeholder="Estimate amount (₹ e.g., 2499.50)"
                value={displayNumber(formData.orders[0].fldEstimate)}
                onChange={(e) => handleOrderChange("fldEstimate", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                inputMode="decimal"
                step="any"
                placeholder="Current balance (₹ e.g., 500)"
                value={displayNumber(formData.orders[0].fldBalance)}
                onChange={(e) => handleOrderChange("fldBalance", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                placeholder="Order status (e.g., Pending, Ready, Delivered)"
                value={formData.orders[0].fldOrderStatus}
                onChange={(e) => handleOrderChange("fldOrderStatus", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                inputMode="decimal"
                step="any"
                placeholder="Outstanding balance (₹ e.g., 0)"
                value={displayNumber(formData.orders[0].outstandingBalance)}
                onChange={(e) => handleOrderChange("outstandingBalance", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </fieldset>

          {/* ================= ORDER ITEM (FIRST LINE) ================= */}
          <fieldset className="border border-gray-200 rounded-lg p-4">
            <legend className="px-2 text-sm font-semibold text-gray-700">Order Item — Line #1</legend>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                placeholder="Item name (e.g., Lenses, Frame)"
                value={formData.orders[0].orderDetails[0].fldItemName}
                onChange={(e) =>
                  handleOrderDetailChange("fldItemName", e.target.value)
                }
                className="w-full p-2 border rounded md:col-span-2"
              />
              <input
                placeholder="Order number (matches order)"
                value={formData.orders[0].orderDetails[0].fldOrderNo}
                onChange={(e) =>
                  handleOrderDetailChange("fldOrderNo", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                inputMode="numeric"
                step="1"
                placeholder="Qty (e.g., 2)"
                value={displayNumber(formData.orders[0].orderDetails[0].fldQty)}
                onChange={(e) => handleOrderDetailChange("fldQty", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                inputMode="decimal"
                step="any"
                placeholder="Rate per unit (₹ e.g., 1200)"
                value={displayNumber(formData.orders[0].orderDetails[0].fldRate)}
                onChange={(e) => handleOrderDetailChange("fldRate", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                inputMode="decimal"
                step="any"
                placeholder="Line amount (₹ e.g., 2400)"
                value={displayNumber(formData.orders[0].orderDetails[0].fldAmt)}
                onChange={(e) => handleOrderDetailChange("fldAmt", e.target.value)}
                className="w-full p-2 border rounded md:col-span-2"
              />
            </div>
          </fieldset>

          {/* ================= PRESCRIPTION ================= */}
          <fieldset className="border border-gray-200 rounded-lg p-4">
            <legend className="px-2 text-sm font-semibold text-gray-700">Prescription</legend>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                placeholder="Prescription No."
                value={formData.prescription.fldPrescriptionNo}
                onChange={(e) =>
                  handlePrescriptionChange("fldPrescriptionNo", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
              <input
                placeholder="Customer ID (for prescription)"
                value={formData.prescription.fldCustomerId}
                onChange={(e) =>
                  handlePrescriptionChange("fldCustomerId", e.target.value)
                }
                className="w-full p-2 border rounded md:col-span-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <input
                placeholder="Right Eye: Sphere (Sph)"
                value={formData.prescription.fldRDVSph}
                onChange={(e) =>
                  handlePrescriptionChange("fldRDVSph", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
              <input
                placeholder="Right Eye: Cylinder (Cyl)"
                value={formData.prescription.fldRDVCyl}
                onChange={(e) =>
                  handlePrescriptionChange("fldRDVCyl", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
              <input
                placeholder="Right Eye: Axis (Ax)"
                value={formData.prescription.fldRDVAx}
                onChange={(e) =>
                  handlePrescriptionChange("fldRDVAx", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <input
                placeholder="Left Eye: Sphere (Sph)"
                value={formData.prescription.fldLDVSph}
                onChange={(e) =>
                  handlePrescriptionChange("fldLDVSph", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
              <input
                placeholder="Left Eye: Cylinder (Cyl)"
                value={formData.prescription.fldLDVCyl}
                onChange={(e) =>
                  handlePrescriptionChange("fldLDVCyl", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
              <input
                placeholder="Left Eye: Axis (Ax)"
                value={formData.prescription.fldLDVAX}
                onChange={(e) =>
                  handlePrescriptionChange("fldLDVAX", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </fieldset>
<fieldset className="border border-gray-200 rounded-lg p-4">
  <legend className="px-2 text-sm font-semibold text-gray-700">
    Notes / Remarks
  </legend>
  <textarea
    name="fldNotes"
    placeholder="Add any notes, remarks, or special instructions here..."
    value={(formData as any).fldNotes || ""}
    onChange={handleChange}
    rows={4}
    className="w-full p-3 border rounded resize-y"
  />
</fieldset>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold"
          >
            Save Customer
          </button>
        </form>

        {/* 🔹 Success Message */}
        {successMsg && (
          <p className="mt-4 text-center text-white font-medium">{successMsg}</p>
        )}
      </section>
    </main>
  );
};

export default Page;
