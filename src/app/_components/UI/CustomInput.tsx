import { useField } from "formik";
type Props = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
};
const CustomInput = (props: Props) => {
  const { label, name, type, placeholder } = props;

  const [field, meta] = useField({
    name: name,
    type,
    placeholder,
  });

  return (
    <div className="flex flex-col" id={props.name}>
      <label>{label}</label>
      <input
        style={{
          border: "1px solid #ccc",
          borderRadius: "18px",
        }}
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : "px-4 py-2"}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};
export default CustomInput;
