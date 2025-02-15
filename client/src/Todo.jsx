import React, { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Fetch todos from the backend
  useEffect(() => {
    fetch('/todos', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  // Add a new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const response = await fetch('/todos/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
      credentials: 'include',
    });

    if (response.ok) {
      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
      setNewTodo('');
    }
  };

  // Toggle todo completion status
  const handleToggleComplete = async (id) => {
    const response = await fetch(`/todos/${id}/toggle`, {
      method: 'PUT',
      credentials: 'include',
    });

    if (response.ok) {
      const updatedTodo = await response.json();
      setTodos(
        todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
    } else {
      alert('Failed to toggle todo');
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    const response = await fetch(`/todos/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      setTodos(todos.filter((todo) => todo._id !== id));
    } else {
      alert('Failed to delete todo');
    }
  };

  // Edit a todo
  const handleEditTodo = async (id) => {
    const response = await fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editingText }),
      credentials: 'include',
    });

    if (response.ok) {
      const updatedTodo = await response.json();
      setTodos(
        todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
      setEditingTodoId(null); // Exit edit mode
    } else {
      alert('Failed to edit todo');
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {editingTodoId === todo._id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => handleEditTodo(todo._id)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleEditTodo(todo._id);
                  }
                }}
                autoFocus
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
                onClick={() => handleToggleComplete(todo._id)}
              >
                {todo.title}
              </span>
            )}
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            <button
              onClick={() => {
                setEditingTodoId(todo._id);
                setEditingText(todo.title);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
