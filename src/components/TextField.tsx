import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextFieldProps {
  label: string;
  id: string;
  type: string;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  required?: boolean;
  message?: string;
  className?: string;
  min?: number;
  value?: string;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  id,
  type,
  errors,
  register,
  required = false,
  message = "This field is required",
  className = "",
  min,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={`${className} font-semibold text-md`}>
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`px-2 py-2 border outline-none bg-transparent text-slate-700 rounded-md ${
          errors[id] ? "border-red-500" : "border-slate-600"
        } ${className}`}
        {...register(id, {
          required: required ? { value: true, message } : false,
          minLength: min
            ? { value: min, message: `Minimum ${min} characters required` }
            : undefined,
          pattern:
            type === "email"
              ? {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                }
              : type === "url"
              ? {
                  value:
                    /^(https?:\/\/)?(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                  message: "Please enter a valid URL",
                }
              : undefined,
        })}
      />

      {errors[id] && (
        <p className="text-sm font-semibold text-red-600 mt-0">
          {errors[id]?.message as string}*
        </p>
      )}
    </div>
  );
};

export default TextField;
