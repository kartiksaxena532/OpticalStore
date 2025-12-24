"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

/* ---------------- TYPES ---------------- */
type Frame = {
  id: string;
  code: string;
  name: string;
  price: number;
  images?: string[];
  active: boolean;
};

/* ---------------- PAGE ---------------- */
export default function AdminFramesPage() {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [loading, setLoading] = useState(false);

  // add form
  const [form, setForm] = useState({
    code: "",
    name: "",
    price: "",
    images: [] as File[],
  });

  // edit state
  const [editing, setEditing] = useState<Frame | null>(null);
  const [editImages, setEditImages] = useState<File[]>([]);

  /* ---------------- FETCH FRAMES ---------------- */
  useEffect(() => {
    const q = query(collection(db, "frames"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      setFrames(list);
    });
    return () => unsub();
  }, []);

  /* ---------------- UPLOAD MULTIPLE IMAGES ---------------- */
  const uploadImages = async (files: File[]) => {
    const urls: string[] = [];
    for (const file of files) {
      const imgRef = ref(storage, `frames/${Date.now()}-${file.name}`);
      await uploadBytes(imgRef, file);
      urls.push(await getDownloadURL(imgRef));
    }
    return urls;
  };

  /* ---------------- ADD FRAME ---------------- */
  const handleAddFrame = async () => {
    if (!form.code || !form.name || !form.price || form.images.length === 0) {
      alert("Fill all fields & upload images");
      return;
    }

    setLoading(true);
    try {
      const imageUrls = await uploadImages(form.images);

      await addDoc(collection(db, "frames"), {
        code: form.code.trim(),
        name: form.name.trim(),
        price: Number(form.price),
        images: imageUrls,
        active: true,
        createdAt: serverTimestamp(),
      });

      setForm({ code: "", name: "", price: "", images: [] });
      alert("✅ Frame added");
    } catch (e: any) {
      console.error(e);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UPDATE FRAME ---------------- */
  const handleUpdateFrame = async () => {
    if (!editing) return;

    setLoading(true);
    try {
      let updatedImages = editing.images || [];

      if (editImages.length > 0) {
        const newUrls = await uploadImages(editImages);
        updatedImages = [...updatedImages, ...newUrls];
      }

      await updateDoc(doc(db, "frames", editing.id), {
        code: editing.code,
        name: editing.name,
        price: editing.price,
        images: updatedImages,
        active: editing.active,
      });

      setEditing(null);
      setEditImages([]);
      alert("✅ Frame updated");
    } catch (e: any) {
      console.error(e);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- REMOVE SINGLE IMAGE ---------------- */
  const removeImage = async (imgUrl: string) => {
    if (!editing) return;
    const updated = (editing.images || []).filter((i) => i !== imgUrl);
    setEditing({ ...editing, images: updated });
  };

  /* ---------------- DELETE FRAME ---------------- */
  const deleteFrame = async (frame: Frame) => {
    const ok = confirm(`Delete frame ${frame.name}? This cannot be undone.`);
    if (!ok) return;

    try {
      // OPTIONAL: delete images from storage
      if (frame.images) {
        for (const url of frame.images) {
          try {
            const imgRef = ref(storage, url);
            await deleteObject(imgRef);
          } catch {}
        }
      }

      await deleteDoc(doc(db, "frames", frame.id));
      alert("🗑️ Frame deleted");
    } catch (e: any) {
      console.error(e);
      alert(e.message);
    }
  };

  /* ---------------- TOGGLE ACTIVE ---------------- */
  const toggleActive = async (frame: Frame) => {
    await updateDoc(doc(db, "frames", frame.id), {
      active: !frame.active,
    });
  };

  /* ---------------- UI ---------------- */
  return (
    <main className="max-w-7xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Frames CMS</h1>

      {/* ADD FRAME */}
      <div className="bg-white/10 p-6 rounded-xl mb-10 space-y-4">
        <h2 className="text-xl font-semibold">Add New Frame</h2>

        <input
          placeholder="Frame Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="p-2 rounded text-black w-full"
        />

        <input
          placeholder="Frame Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 rounded text-black w-full"
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="p-2 rounded text-black w-full"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, images: Array.from(e.target.files || []) })
          }
        />

        <button
          onClick={handleAddFrame}
          disabled={loading}
          className="bg-blue-600 px-6 py-2 rounded"
        >
          Add Frame
        </button>
      </div>

      {/* FRAME LIST */}
      <table className="w-full bg-white/10 rounded-xl">
        <thead>
          <tr>
            <th className="p-3">Code</th>
            <th className="p-3">Name</th>
            <th className="p-3">Images</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {frames.map((f) => (
            <tr key={f.id} className="border-t border-white/20">
              <td className="p-3">{f.code}</td>
              <td className="p-3">{f.name}</td>
              <td className="p-3">{f.images?.length ?? 0}</td>
              <td className="p-3">₹{f.price}</td>
              <td className="p-3">
                <button
                  onClick={() => toggleActive(f)}
                  className={`px-2 py-1 rounded ${
                    f.active ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {f.active ? "Active" : "Inactive"}
                </button>
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => setEditing({ ...f })}
                  className="bg-yellow-500 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFrame(f)}
                  className="bg-red-600 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#111] p-6 rounded-xl w-full max-w-lg space-y-3">
            <h2 className="text-xl font-semibold">Edit Frame</h2>

            <input
              value={editing.code}
              onChange={(e) =>
                setEditing({ ...editing, code: e.target.value })
              }
              className="p-2 rounded text-black w-full"
            />

            <input
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
              className="p-2 rounded text-black w-full"
            />

            <input
              type="number"
              value={editing.price}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  price: Number(e.target.value),
                })
              }
              className="p-2 rounded text-black w-full"
            />

            {/* EXISTING IMAGES */}
            <div className="flex gap-2 flex-wrap">
              {editing.images?.map((img) => (
                <div key={img} className="relative">
                  <img src={img} className="h-20 w-20 object-cover rounded" />
                  <button
                    onClick={() => removeImage(img)}
                    className="absolute top-0 right-0 bg-red-600 text-xs px-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <input
              type="file"
              multiple
              onChange={(e) =>
                setEditImages(Array.from(e.target.files || []))
              }
            />

            <div className="flex gap-2">
              <button
                onClick={handleUpdateFrame}
                className="bg-green-600 px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(null)}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
