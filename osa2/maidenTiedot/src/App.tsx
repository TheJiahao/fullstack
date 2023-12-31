import { ChangeEvent, useState } from "react";
import FilterForm from "./components/FilterForm";

function App() {
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <>
      <div>
        <FilterForm
          handleKeywordChange={handleKeywordChange}
          keywordValue={keyword}
        />
        <p>Test</p>
      </div>
    </>
  );
}

export default App;
