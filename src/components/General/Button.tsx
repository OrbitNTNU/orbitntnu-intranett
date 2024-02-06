const Button = (props: React.ComponentPropsWithoutRef<"button">) => {
  const { children, className, ...rest } = props;
  return (
    <button className={`${className} rounded bg-blue-600 px-4 py-2`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
