import React from "react";

const ConfirmModal = ({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "indigo",
  onConfirm,
  onClose,
}) => {
  if (!open) return null;

  const colorMap = {
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    indigo: "bg-indigo-600 hover:bg-indigo-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        className="
          bg-white rounded-lg
          w-full max-w-md
          sm:max-w-lg
          2xl:max-w-xl
          p-5 sm:p-6 2xl:p-8
          space-y-4
        "
      >
        <h3
          className="
            text-base sm:text-lg
            2xl:text-xl
            font-semibold
          "
        >
          {title}
        </h3>

        <p
          className="
            text-sm sm:text-base
            2xl:text-lg
            text-gray-600
          "
        >
          {description}
        </p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="
              px-4 py-2
              sm:px-5 sm:py-2.5
              text-sm
              border rounded-md
              hover:bg-gray-50
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`
              px-4 py-2
              sm:px-5 sm:py-2.5
              text-sm
              text-white rounded-md
              ${colorMap[confirmColor]}
            `}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
