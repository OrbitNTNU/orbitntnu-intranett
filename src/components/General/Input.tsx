const Input = (
  props: React.ComponentPropsWithoutRef<"input"> & { labelId: string },
) => {
  const { type, className, id, name, labelId, ...rest } = props;
  return (
    <input
      type={type ? type : "text"}
      name={name ? name : labelId}
      id={id ? id : labelId}
      className={`${className} rounded bg-gray-300 px-4 py-2 outline-none`}
      {...rest}
    />
  );
};

export default Input;
