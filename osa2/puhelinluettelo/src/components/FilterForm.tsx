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
        filter shown with:{" "}
        <input value={keywordValue} onChange={handleKeywordChange} />
      </form>
    </div>
  );
};

export default FilterForm;
