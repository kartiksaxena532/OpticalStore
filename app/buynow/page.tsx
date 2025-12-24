"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
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

/* ---------------- PAGE ---------------- */
export default function Page() {
  const { frames: products, loading } = useFrames();
  const [selectedProduct, setSelectedProduct] = useState<Frame | null>(null);
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

  /* ---------------- FORM HANDLERS ---------------- */
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
        status: "NEW",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);

      const msg = `Hi Deepak Opticals,%0A
New Order: ${orderNo}%0A
Frame: ${selectedProduct.name}%0A
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

  /* ---------------- UI ---------------- */
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
                        className="w-full h-auto object-cover"
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
          className="mt-8 bg-white/10 p-6 rounded-xl space-y-4"
        >
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
                  className="w-full h-72 object-cover"
                  alt={selectedProduct.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="bg-white/20 p-4 rounded">
            <p className="font-semibold">{selectedProduct.name}</p>
            <p>₹{selectedProduct.price}</p>
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="text-sm underline mt-2"
            >
              Change Frame
            </button>
          </div>

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
        </form>
      )}
    </main>
  );
}
