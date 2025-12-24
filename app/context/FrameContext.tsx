"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

type Frame = {
  id: string;
  code: string;
  name: string;
  price: number;
  images?: string[];
};

type FramesContextType = {
  frames: Frame[];
  loading: boolean;
};

const FramesContext = createContext<FramesContextType>({
  frames: [],
  loading: true,
});

export const FramesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem("frames-cache");

    if (cached) {
      setFrames(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const fetchFrames = async () => {
      const q = query(
        collection(db, "frames"),
        where("active", "==", true)
      );
      const snap = await getDocs(q);

      const list = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));

      sessionStorage.setItem("frames-cache", JSON.stringify(list));
      setFrames(list);
      setLoading(false);
    };

    fetchFrames();
  }, []);

  return (
    <FramesContext.Provider value={{ frames, loading }}>
      {children}
    </FramesContext.Provider>
  );
};

export const useFrames = () => useContext(FramesContext);
