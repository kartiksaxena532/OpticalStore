import { db } from "@/lib/firebase";
import { doc, runTransaction } from "firebase/firestore";

/**
 * Generates a unique sequential order number
 * Example: DO-2025-0007
 */
export async function generateOrderNumber(): Promise<string> {
  const counterRef = doc(db, "meta", "orderCounter");

  const orderNo = await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(counterRef);

    let current = 0;

    if (snapshot.exists()) {
      current = snapshot.data().current || 0;
    }

    const next = current + 1;

    transaction.set(
      counterRef,
      { current: next },
      { merge: true }
    );

    const year = new Date().getFullYear();
    return `DO-${year}-${String(next).padStart(4, "0")}`;
  });

  return orderNo;
}
