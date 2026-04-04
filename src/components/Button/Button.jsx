import s from "./button.module.scss";

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
      className={`${s.button} ${className}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
