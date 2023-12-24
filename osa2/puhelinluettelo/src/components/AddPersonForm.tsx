import { FormEventHandler, ChangeEventHandler } from "react";

const AddPersonForm = ({
  handleAddPerson,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}: {
  handleAddPerson: FormEventHandler<HTMLFormElement>;
  handleNameChange: ChangeEventHandler<HTMLInputElement>;
  handleNumberChange: ChangeEventHandler<HTMLInputElement>;
  newName: string;
  newNumber: string;
}) => {
  return (
    <div>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AddPersonForm;
