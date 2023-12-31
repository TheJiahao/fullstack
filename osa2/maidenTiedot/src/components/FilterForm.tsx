import { ChangeEventHandler } from "react";

const FilterForm = ({
  handleKeywordChange,
  keywordValue,
}: {
  handleKeywordChange: ChangeEventHandler<HTMLInputElement>;
  keywordValue: string;
}) => {
  return (
    <div>
      <form>
        find countries:{" "}
        <input value={keywordValue} onChange={handleKeywordChange} />
      </form>
    </div>
  );
};

export default FilterForm;
