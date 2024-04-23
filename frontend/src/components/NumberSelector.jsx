/* eslint-disable react/prop-types */
import { useState, forwardRef, useEffect } from "react";

const NumberSelector = forwardRef(function NumberSelector(
  { quantity, onChange },
  ref
) {
  const [value, setValue] = useState(quantity);

  useEffect(() => {
    onChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="flex items-center justify-center p-2 border rounded-md w-fit gap-x-4">
      <span
        onClick={() =>
          setValue((prev) => {
            if (prev <= 1) return prev;
            else return prev - 1;
          })
        }
        className="px-2 cursor-pointer"
      >
        -
      </span>
      <input
        type="number"
        ref={ref}
        value={value}
        onChange={(e) => {
          if (e.target.value <= 1) return;
          setValue(e.target.value);
        }}
        className="text-center select-none"
      />
      <span
        onClick={() => setValue((prev) => prev + 1)}
        className="px-2 cursor-pointer"
      >
        +
      </span>
    </div>
  );
});

export default NumberSelector;
