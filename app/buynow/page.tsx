"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import { useFrames } from "@/app/context/FrameContext";

// 🔹 Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ---------------- TYPES ---------------- */
type Frame = {
  id: string;
  code: string;
  name: string;
  price: number;
  images?: string[];
};


const COLORS = ["Black", "Grey"];

export default function Page() {
  const { frames: products, loading } = useFrames();

  const [selectedProduct, setSelectedProduct] = useState<Frame | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");

  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "",
    lensType: "Single Vision",
    paymentMode: "COD",
  });

  /* ---------------- FORM HANDLER ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- PLACE ORDER ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || submitting) return;

    setSubmitting(true);

    try {
      const orderNo = await generateOrderNumber();

      await addDoc(collection(db, "orders"), {
        orderNo,
        ...form,
        productId: selectedProduct.id,
        productCode: selectedProduct.code,
        productName: selectedProduct.name,
        price: selectedProduct.price,
        size: selectedSize,
        color: selectedColor,
        status: "NEW",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);

      const msg = `Hi Deepak Opticals,%0A
New Order: ${orderNo}%0A
Frame: ${selectedProduct.name}%0A
Size: ${selectedSize}%0A
Color: ${selectedColor}%0A
Lens: ${form.lensType}%0A
Name: ${form.customerName}%0A
Phone: ${form.phone}`;

      window.location.href = `https://wa.me/919412333181?text=${msg}`;
    } catch (err: any) {
      console.error("❌ ORDER ERROR:", err);
      alert(err.message || "Order failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading frames…
      </div>
    );
  }

  /* ---------------- SUCCESS ---------------- */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h2 className="text-2xl font-semibold">
          ✅ Order placed! We’ll contact you shortly.
        </h2>
      </div>
    );
  }

  return (
    <main className="max-w-6xl my-20 mx-auto p-6 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Buy Spectacles under 60 Seconds 👓
      </h1>

      {/* ---------- FRAME LIST ---------- */}
      {!selectedProduct && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition"
            >
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={8}
                className="rounded-lg overflow-hidden mb-3"
              >
                {(p.images?.length ? p.images : ["/placeholder-frame.png"]).map(
                  (img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={img}
                        alt={p.name}
                        className="w-full h-auto object-cover cursor-pointer"
                        onClick={() => setSelectedProduct(p)}
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>

              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm mt-1">₹{p.price}</p>

              <button
                onClick={() => setSelectedProduct(p)}
                className="mt-3 w-full bg-blue-600 py-2 rounded"
              >
                Select & Continue
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ---------- CHECKOUT ---------- */}
      {selectedProduct && (
  <form
    onSubmit={handleSubmit}
    className="mt-8 bg-white/10 p-6 rounded-xl"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

      {/* ================= LEFT — IMAGE + SUMMARY ================= */}
      <div className="space-y-4">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={12}
          className="rounded-xl overflow-hidden"
        >
          {(selectedProduct.images?.length
            ? selectedProduct.images
            : ["/placeholder-frame.png"]
          ).map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                className="w-full h-full object-cover"
                alt={selectedProduct.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* PRODUCT SUMMARY */}
        <div className="bg-white/20 p-4 rounded space-y-1">
          <p className="font-semibold">{selectedProduct.name}</p>
          <p>₹{selectedProduct.price}</p>
          <p className="text-sm text-white/70">
            Size: {selectedSize} • Color: {selectedColor}
          </p>

          <button
            type="button"
            onClick={() => setSelectedProduct(null)}
            className="text-sm underline mt-2"
          >
            Change Frame
          </button>
        </div>
      </div>

      {/* ================= RIGHT — FORM ================= */}
      <div className="space-y-4">

        {/* COLOR */}
        <div>
          <p className="text-sm mb-2">Color</p>
          <div className="flex gap-3">
            {COLORS.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`px-4 py-2 rounded-full border ${
                  selectedColor === c
                    ? "bg-white text-black"
                    : "border-white/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* SIZE */}
       

        {/* FORM FIELDS — UNCHANGED */}
        <select
          name="lensType"
          value={form.lensType}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        >
          <option>Single Vision</option>
          <option>Anti Glare</option>
          <option>Blue Cut</option>
          <option>Photochromatic</option>
          <option>I’ll share prescription on WhatsApp</option>
        </select>

        <input
          name="customerName"
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        />

        <input
          name="phone"
          placeholder="Mobile Number"
          required
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          required
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        />

        <input
          name="city"
          placeholder="City"
          required
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        />

        <select
          name="paymentMode"
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI on Delivery</option>
        </select>

        <button
          disabled={submitting}
          className="w-full bg-green-600 py-3 rounded font-semibold"
        >
          {submitting ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  </form>
)}
      
    </main>
  );
}
