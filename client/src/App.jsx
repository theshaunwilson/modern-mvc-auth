// Import React's useState hook for managing state in our component
import { useState } from 'react';

// This is our main App component
function App() {
  // Create state variables for our todos and new todo input
  // useState returns an array with two elements:
  // 1. The current state value
  // 2. A function to update that value
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // This function runs when the form is submitted
  function handleSubmit(e) {
    // Prevent the form from refreshing the page
    e.preventDefault();

    // Don't add empty todos
    if (!newTodo.trim()) return;

    // Add the new todo to our list
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: newTodo,
        completed: false,
      },
    ]);

    // Clear the input field
    setNewTodo('');
  }

  // The JSX that defines what users see on the screen
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Todo List</h1>

      {/* Form for adding new todos */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="border p-2 mr-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Todo
        </button>
      </form>

      {/* List of todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                setTodos(
                  todos.map((t) =>
                    t.id === todo.id ? { ...t, completed: !t.completed } : t
                  )
                );
              }}
              className="mr-2"
            />
            <span className={todo.completed ? 'line-through' : ''}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export the component so it can be used in other files
export default App;
