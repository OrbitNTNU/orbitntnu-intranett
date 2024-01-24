const Label = (
  props: React.ComponentPropsWithoutRef<"label"> & { htmlFor: string },
) => {
  const { htmlFor, className, children, ...rest } = props;
  return (
    <label className={`${className}`} htmlFor={htmlFor} {...rest}>
      {children}
    </label>
  );
};

export default Label;
