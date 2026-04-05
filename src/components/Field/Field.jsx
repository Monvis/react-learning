import styles from "./field.module.scss";

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
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.isInvalid : ""}`}
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
        <span className={styles.error} title={error}>
          {error}
        </span>
      )}
    </div>
  );
};

