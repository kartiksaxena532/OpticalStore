"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

/* ---------------- TYPES ---------------- */
type Order = {
  id: string;
  orderNo: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  lensType: string;
  paymentMode: string;
  productName: string;
  price: number;
  status: string;
  createdAt?: any;
};

/* ---------------- PAGE ---------------- */
export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);

  /* ---------------- FETCH ORDERS ---------------- */
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      setOrders(list);
    });

    return () => unsub();
  }, []);

  /* ---------------- UPDATE STATUS ---------------- */
  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "orders", id), { status });
  };

  /* ---------------- UI ---------------- */
  return (
    <main className="max-w-7xl my-20 mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {/* ORDERS TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white/10 rounded-xl">
          <thead>
            <tr className="text-left">
              <th className="p-3">Order No</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-white/20">
                <td className="p-3 font-semibold">{o.orderNo}</td>
                <td className="p-3">
                  {o.customerName}
                  <br />
                  <span className="text-sm opacity-70">{o.phone}</span>
                </td>
                <td className="p-3">{o.productName}</td>
                <td className="p-3">₹{o.price}</td>
                <td className="p-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="text-black p-1 rounded"
                  >
                    <option>NEW</option>
                    <option>CONFIRMED</option>
                    <option>READY</option>
                    <option>DELIVERED</option>
                    <option>CANCELLED</option>
                  </select>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setSelected(o)}
                    className="bg-blue-600 px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <a
                    href={`https://wa.me/91${o.phone}?text=Hi ${o.customerName}, regarding your order ${o.orderNo}`}
                    target="_blank"
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    WhatsApp
                  </a>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center opacity-60">
                  No orders yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111] p-6 rounded-xl w-full max-w-lg space-y-3">
            <h2 className="text-xl font-semibold">
              Order {selected.orderNo}
            </h2>

            <p><b>Customer:</b> {selected.customerName}</p>
            <p><b>Phone:</b> {selected.phone}</p>
            <p><b>Address:</b> {selected.address}, {selected.city}</p>
            <p><b>Product:</b> {selected.productName}</p>
            <p><b>Lens:</b> {selected.lensType}</p>
            <p><b>Payment:</b> {selected.paymentMode}</p>
            <p><b>Status:</b> {selected.status}</p>
            <p><b>Price:</b> ₹{selected.price}</p>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setSelected(null)}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Close
              </button>
              <a
                href={`https://wa.me/91${selected.phone}?text=Hi ${selected.customerName}, your order ${selected.orderNo} status is ${selected.status}`}
                target="_blank"
                className="bg-green-600 px-4 py-2 rounded"
              >
                WhatsApp Customer
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
