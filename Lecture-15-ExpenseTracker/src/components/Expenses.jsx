import { useContext } from "react"
import { GlobalContext } from "../context/GlobalState"


export default function Expenses() {
    const { transactions } = useContext(GlobalContext);

    const expenseAmounts = transactions
        .filter((t) => t.type === "expense")
        .map((t) => Number(t.amount) || 0);

    const TotalExpenec = expenseAmounts.reduce((sum, amt) => sum + amt, 0);

    return (
        <>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Total Expense
                        </p>
                        <p className="mt-2 text-xl font-semibold text-slate-900">
                            ₹   {TotalExpenec}
                        </p>

                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-sm font-semibold text-rose-700">
                        ↓
                    </div>
                </div>
            </div>
        </>
    )
}
