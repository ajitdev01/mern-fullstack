import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

// Chart.js imports
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
    const { transactions } = useContext(GlobalContext);

    // BALANCE
    const amounts = transactions.map((t) => Number(t.amount) || 0);
    const TotalBalance = amounts.reduce((sum, amt) => sum + amt, 0);

    // EXPENSE
    const expenseAmounts = transactions
        .filter((t) => t.type === "expense")
        .map((t) => Number(t.amount) || 0);
    const TotalExpense = expenseAmounts.reduce((sum, amt) => sum + amt, 0);

    // INCOME
    const incomeAmounts = transactions
        .filter((t) => t.type === "income")
        .map((t) => Number(t.amount) || 0);
    const TotalIncome = incomeAmounts.reduce((sum, amt) => sum + amt, 0);

    // CHART DATA
    const data = {
        labels: ["Income", "Expense", "Balance"],
        datasets: [
            {
                label: "Amount",
                data: [TotalIncome, TotalExpense, TotalBalance],
                backgroundColor: [
                    "rgba(16, 185, 129, 0.7)", // green
                    "rgba(244, 63, 94, 0.7)",  // red
                    "rgba(59, 130, 246, 0.7)", // blue
                ],
                borderColor: [
                    "rgba(16, 185, 129, 1)",
                    "rgba(244, 63, 94, 1)",
                    "rgba(59, 130, 246, 1)",
                ],
                borderWidth: 2,
                cutout: "60%", // Doughnut thickness
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    padding: 20,
                    font: { size: 12 },
                },
            },
        },
    };

    return (
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-4">
                <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                        Spending overview
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                        Visual breakdown of your income & expenses.
                    </p>
                </div>
                <button
                    type="button"
                    className="text-xs font-medium text-slate-500 hover:text-slate-800"
                >
                    View details →
                </button>
            </div>

            <div className="flex h-60 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
}
