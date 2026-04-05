import styles from "./button.module.scss";

const Button = (props) => {
  const {
    className = "",
    type = "button",
    children,
    onClick,
    isDisabled,
  } = props;

  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };

