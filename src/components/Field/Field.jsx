import s from "./field.module.scss";

export const Field = (props) => {
  const {
    className = "",
    id,
    label,
    type = "text",
    value,
    onInput,
    inputRef,
    error,
    autoFocus = false,
  } = props;

  return (
    <div className={`${s.field} ${className}`}>
      <label className={s.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${s.input} ${error ? s.isInvalid : ""}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        value={value}
        onInput={onInput}
        ref={inputRef}
        autoFocus={autoFocus}
      />
      {error && (
        <span className={s.error} title={error}>
          {error}
        </span>
      )}
    </div>
  );
};
