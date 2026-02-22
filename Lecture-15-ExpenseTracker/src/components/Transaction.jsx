import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const Transaction = ({ tx }) => {
    const isExpense = tx.type === "expense";
    const { deleteTransaction } = useContext(GlobalContext);

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            {/* CONFIRM DELETE MODAL */}
            {openModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white w-80 rounded-xl shadow-xl p-6 animate-fadeIn">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Delete Transaction?
                        </h2>
                        <p className="text-slate-600 mt-2 text-sm">
                            Are you sure you want to delete this transaction? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="cursor-pointer px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition"
                            >
                                No
                            </button>

                            <button
                                onClick={() => {
                                    deleteTransaction(tx.id);
                                    setOpenModal(false);
                                }}
                                className="cursor-pointer px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CARD */}
            <div className="group relative flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg hover:border-slate-300 
                        transition-all duration-300 overflow-hidden">

                {/* Hover Highlight */}
                <div className={
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none " +
                    (isExpense
                        ? "bg-gradient-to-r from-rose-50/60 to-transparent"
                        : "bg-gradient-to-r from-emerald-50/60 to-transparent")
                }></div>

                {/* LEFT SECTION */}
                <div className="relative flex items-center gap-4 flex-1 min-w-0">

                    {/* ICON CIRCLE */}
                    <div className={
                        "relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300 " +
                        (isExpense
                            ? "bg-gradient-to-br from-rose-500 to-rose-600"
                            : "bg-gradient-to-br from-emerald-500 to-emerald-600")
                    }>
                        <div className={
                            "absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300 " +
                            (isExpense ? "bg-rose-500" : "bg-emerald-500")
                        }></div>

                        <span className="relative z-10 uppercase">
                            {tx.title.charAt(0)}
                        </span>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-slate-900 truncate group-hover:text-slate-700 transition-colors">
                            {tx.title}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                            <span className={
                                "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium " +
                                (isExpense
                                    ? "bg-rose-100 text-rose-700"
                                    : "bg-emerald-100 text-emerald-700")
                            }>
                                <i className="fa-solid fa-tag text-[10px]"></i>
                                {tx.category}
                            </span>

                            <span className="text-xs text-slate-400">•</span>

                            <span className="text-xs text-slate-500 font-medium">
                                {tx.date}
                            </span>
                        </div>

                        {tx.note && (
                            <p className="mt-2 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg inline-block truncate max-w-full">
                                <i className="fa-regular fa-comment-dots mr-1"></i>
                                {tx.note}
                            </p>
                        )}
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="relative flex flex-col items-end ml-4 flex-shrink-0">
                    <p className={
                        "text-lg font-bold tabular-nums tracking-tight flex items-center gap-1 " +
                        (isExpense ? "text-rose-600" : "text-emerald-600")
                    }>
                        <i className={
                            isExpense ? "fa-solid fa-arrow-down" : "fa-solid fa-arrow-up"
                        }></i>
                        {isExpense ? "−" : "+"}₹{tx.amount.toLocaleString("en-IN")}
                    </p>

                    <span className={
                        "mt-1 text-xs font-semibold uppercase tracking-wider " +
                        (isExpense ? "text-rose-500" : "text-emerald-500")
                    }>
                        {isExpense ? "Expense" : "Income"}
                    </span>
                </div>

                {/* SIDE COLOR LINE */}
                <div className={
                    "absolute right-0 top-0 bottom-0 w-1 rounded-r-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 " +
                    (isExpense
                        ? "bg-gradient-to-b from-rose-500 to-rose-600"
                        : "bg-gradient-to-b from-emerald-500 to-emerald-600")
                }></div>

                {/* FLOATING DELETE BUTTON */}
                <button
                    onClick={() => setOpenModal(true)}
                    className="cursor-pointer absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 
                           text-slate-400 hover:text-rose-600 hover:scale-110"
                >
                    <i className="fa-solid fa-trash-can text-lg"></i>
                </button>
            </div>
        </>
    );
};

export default Transaction;
