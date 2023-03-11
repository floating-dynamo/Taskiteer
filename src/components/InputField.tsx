import React from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, addTodo }) => {
  return (
    <form className="input" onSubmit={addTodo}>
      <input
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        type="text"
        placeholder="Enter a task"
        className="input-box"
      />
      <button className="input-submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
