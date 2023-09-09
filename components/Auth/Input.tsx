type Props = {
  id: string;
  name: string;
  formik: any;
  placeholder: string;
};
export const Input: React.FC<Props> = ({ id, name, formik, placeholder }) => {
  return (
    <>
      <input
        id={id}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        placeholder={placeholder}
        className="w-3/4 h-10 bg-stone-200 rounded-xl p-2 placeholder:text-stone-500 outline-none focus:shadow-xl transition-shadow ease-in-out duration-500"
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className="w-3/4 h-fit">
          <p className="font-bold text-red-600 ">{formik.errors[name]}</p>
        </div>
      ) : null}
    </>
  );
};
