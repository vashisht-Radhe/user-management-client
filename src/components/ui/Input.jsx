const Input = ({
  label,
  placeholder,
  type = "text",
  name,
  id,
  error,
  isRequired = false, 
  className = "",
  ...props
}) => {
  const inputId = id || name;

  const baseStyles =
    "w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 transition";

  const normalStyles =
    "border-gray-200 focus:border-blue-400 focus:ring-blue-400";

  const errorStyles = "border-red-500 focus:border-red-500 focus:ring-red-400";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-800">
          {label}
          {isRequired && (
            <span className="text-red-500 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`
          ${baseStyles}
          ${error ? errorStyles : normalStyles}
          ${className}
        `}
        aria-required={isRequired} 
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />

      {error && (
        <span id={`${inputId}-error`} className="text-sm text-red-600">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
