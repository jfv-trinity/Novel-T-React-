interface List {
  className?: string;
  options: number[];
  selectedOption: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectList: React.FC<List> = ({
  className,
  options,
  selectedOption,
  onChange,
}) => {
  if (options && options.length > 1) {
    return (
      <select value={selectedOption} onChange={onChange} className={className}>
        {options.map((option) => (
          <option key={option} value={option}>
            Chapter {option}
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <select value={selectedOption} onChange={onChange} className={className}>
        <option key={options[0] + 1} value={options[0] + 1}>
          Chapter {options[0] + 1}
        </option>
      </select>
    );
  }
};

export default SelectList;
