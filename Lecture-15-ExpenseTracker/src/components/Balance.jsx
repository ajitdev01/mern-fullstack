import { useContext } from "react"
import { GlobalContext } from "../context/GlobalState"

export default function Blance() {
    const { transactions } = useContext(GlobalContext);
    const amounts = transactions.map((t) => Number(t.amount) || 0);
    const TotalBlance = amounts.reduce((sum, item) => sum + item, 0);

    return (
        <>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Total Balance
                        </p>
                        <p className="mt-2 text-xl font-semibold text-slate-900">
                            ₹   {TotalBlance}
                        </p>

                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
                        ₹
                    </div>
                </div>
            </div>

        </>
    )
}