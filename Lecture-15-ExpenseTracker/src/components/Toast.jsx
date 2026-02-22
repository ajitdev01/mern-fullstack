import { useEffect } from "react";

export const Toast = ({
  status = "success",
  message = "",
  duration = 3000,
  onClose = () => { }
}) => {

  // Auto-close
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Color mapping
  const variants = {
    success: {
      bg: "bg-green-50",
      border: "border-green-500",
      text: "text-green-700",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      )
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-700",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      )
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      text: "text-yellow-800",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 3h.01M10.29 3.86l-7.6 13.2A1 1 0 003.53 19h16.94a1 1 0 00.84-1.54l-7.6-13.2a1 1 0 00-1.72 0z" />
      )
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-700",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m2-4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
      )
    }
  };

  const { bg, border, text, icon } = variants[status] || variants.success;

  return (
    <div
      role="alert"
      className={`
        mt-[60px]
        fixed top-5 right-5 w-80
        p-4 rounded-lg shadow-lg border
        flex items-start gap-4
        transition-all duration-300 animate-slideIn
        ${bg} ${border}
      `}
    >
      {/* Icon */}
      <svg
        className={`size-6 ${text}`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        {icon}
      </svg>

      {/* Content */}
      <div className="flex-1">
        <strong className={`block font-semibold capitalize ${text}`}>
          {status}
        </strong>
        <p className={`text-sm mt-1 ${text}`}>{message}</p>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-black transition"
      >
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
