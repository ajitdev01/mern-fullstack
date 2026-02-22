import React, { useContext, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Toast } from "./Toast";

const categories = [
  "Food & Dining",
  "Transport",
  "Bills & Utilities",
  "Shopping",
  "Entertainment",
  "Health",
  "Subscriptions",
  "Savings",
  "Salary",
  "Freelance",
  "Other",
];

const paymentMethods = [
  { label: "Cash", icon: "fa-solid fa-money-bill-wave" },
  { label: "UPI", icon: "fa-solid fa-mobile-screen-button" },
  { label: "Card", icon: "fa-regular fa-credit-card" },
  { label: "Cheque", icon: "fa-solid fa-building-columns" },
  { label: "Other", icon: "fa-solid fa-tags" },
];

const TransactionForm = ({ onCancel }) => {
  const { addTransaction } = useContext(GlobalContext);

  const [type, setType] = useState("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [note, setNote] = useState("");

  const [toast, setToast] = useState(null);

  const titleRef = useRef(null);

  const resetForm = () => {
    setType("expense");
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
    setPaymentMethod("");
    setNote("");

    setTimeout(() => {
      titleRef.current?.focus();
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || !date || !category || !paymentMethod) {
      return setToast({
        status: "warning",
        message: "Please fill all required fields",
      });
    }

    if (Number(amount) <= 0) {
      return setToast({
        status: "warning",
        message: "Amount must be greater than 0",
      });
    }

    addTransaction({
      id: Date.now(),
      type,
      title: title.trim(),
      amount: Number(amount),
      date,
      category,
      paymentMethod,
      note: note.trim(),
    });

    resetForm();

    setToast({
      status: "success",
      message: "Transaction added successfully",
    });
  };

  return (
    <>
      <div className="py-6 space-y-6">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-7 shadow-xl transition-all duration-300">

          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-plus text-slate-700"></i>
                Add Transaction
              </h2>
              <p className="text-xs text-slate-500">Record your income or expense quickly.</p>
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setType("expense")}
                className={
                  "flex items-center gap-1 px-3 py-1.5 text-xs rounded-full transition " +
                  (type === "expense"
                    ? "bg-rose-600 text-white shadow"
                    : "text-slate-600 hover:bg-slate-200")
                }
              >
                <i className="fa-solid fa-arrow-down"></i> Expense
              </button>

              <button
                type="button"
                onClick={() => setType("income")}
                className={
                  "flex items-center gap-1 px-3 py-1.5 text-xs rounded-full transition " +
                  (type === "income"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-600 hover:bg-slate-200")
                }
              >
                <i className="fa-solid fa-arrow-up"></i> Income
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-slate-600">Title</label>
              <div className="relative">
                <i className="fa-solid fa-tag absolute left-3 top-3 text-slate-400"></i>
                <input
                  ref={titleRef}
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={type === "expense" ? "e.g. Groceries" : "e.g. Salary"}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 py-2 text-sm 
                             focus:bg-white focus:ring-2 ring-slate-900/10"
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="text-xs font-semibold text-slate-600">Amount</label>
              <div className="relative">
                <i className="fa-solid fa-indian-rupee-sign absolute left-3 top-3 text-slate-400"></i>
                <input
                  type="number"
                  required
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 py-2 text-sm 
                             focus:bg-white focus:ring-2 ring-slate-900/10"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-xs font-semibold text-slate-600">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm 
                           focus:bg-white focus:ring-2 ring-slate-900/10"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-slate-600">Category</label>
              <div className="relative">
                <i className="fa-solid fa-list absolute left-3 top-3 text-slate-400"></i>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 py-2 text-sm 
                             focus:bg-white focus:ring-2 ring-slate-900/10"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <label className="text-xs font-semibold text-slate-600">Payment Method</label>

              <div className="grid gap-2 sm:grid-cols-5">
                {paymentMethods.map(({ label, icon }) => (
                  <button
                    type="button"
                    key={label}
                    onClick={() => setPaymentMethod(label)}
                    className={
                      "flex items-center justify-center gap-1 rounded-full border px-3 py-1.5 text-xs transition " +
                      (paymentMethod === label
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100")
                    }
                  >
                    <i className={icon}></i> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="text-xs font-semibold text-slate-600">Note</label>
              <div className="relative">
                <i className="fa-regular fa-note-sticky absolute left-3 top-3 text-slate-400"></i>
                <textarea
                  rows="3"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Monthly subscription, paid via UPI"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 py-2 text-sm 
                             focus:bg-white focus:ring-2 ring-slate-900/10"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-slate-900 
                           px-6 py-2.5 text-sm text-white shadow hover:bg-slate-800 active:scale-95 
                           transition-all"
              >
                <i className="fa-solid fa-plus"></i>
                Save {type === "expense" ? "Expense" : "Income"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          status={toast.status}
          message={toast.message}
          duration={2500}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default TransactionForm;
