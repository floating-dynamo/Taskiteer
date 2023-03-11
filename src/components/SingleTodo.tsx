import React, {
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsBookmarkCheckFill, BsFillSendFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const editRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isEdit) {
      editRef.current?.focus();
    }
  }, [isEdit]);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSubmit = (id: number) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, todo: editTodo } : todo;
      })
    );
  };

  const todoDone = (id: number) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      })
    );
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo: Todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div
      className="todo"
      style={todo.isDone ? { background: "limegreen" } : undefined}
    >
      {isEdit ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsEdit(false);
            handleSubmit(todo.id);
          }}
        >
          <input
            className="todo-title"
            ref={editRef}
            value={editTodo}
            onChange={(e) => {
              setEditTodo(e.target.value);
            }}
          />
          {/* <button type="submit"></button> */}
        </form>
      ) : (
        <p
          className="todo-title"
          style={todo.isDone ? { textDecoration: "line-through" } : undefined}
        >
          {todo.todo}
        </p>
      )}
      {isEdit ? (
        <p
          className="todo-icons"
          onClick={() => {
            handleEdit();
            handleSubmit(todo.id);
          }}
        >
          <BsFillSendFill type="submit" />
        </p>
      ) : (
        <p className="todo-icons" onClick={handleEdit}>
          <AiFillEdit />
        </p>
      )}
      <p
        className="todo-icons"
        onClick={() => {
          deleteTodo(todo.id);
        }}
      >
        <AiFillDelete />
      </p>
      {todo.isDone ? (
        <p className="todo-icons" onClick={() => todoDone(todo.id)}>
          <MdCancel color="black" />
        </p>
      ) : (
        <p className="todo-icons" onClick={() => todoDone(todo.id)}>
          <BsBookmarkCheckFill />
        </p>
      )}
    </div>
  );
};

export default SingleTodo;
