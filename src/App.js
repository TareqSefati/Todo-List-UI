import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch all items
  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/items`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      setMessage('Failed to load items.');
    }
  };

  // Add new item with limit check
  const addItem = async () => {
    if (!name.trim()) return;

    // ✅ LIMIT CHECK: allow max 10 items
    if (items.length >= 10) {
      alert('⚠️ You cannot add more than 10 items. Please delete some items.');
      return;
    }

    const item = { name };

    try {
      const response = await fetch(`${API_BASE_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        setMessage('Item added successfully!');
        setName('');
        fetchItems();
      } else {
        setMessage('Failed to add item.');
      }
    } catch (error) {
      setMessage('Error while adding item.');
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Item deleted successfully!');
        setItems(items.filter((item) => item.id !== id));
      } else {
        setMessage('Failed to delete item.');
      }
    } catch (error) {
      setMessage('Error while deleting item.');
    }
  };

  // Start editing
  const startEdit = (item) => {
    setEditingItem(item);
    setName(item.name);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingItem(null);
    setName('');
    setMessage('Edit cancelled.');
  };

  // Update item
  const updateItem = async () => {
    if (!editingItem || !name.trim()) return;

    const updatedItem = { ...editingItem, name };

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/items/${editingItem.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        }
      );

      if (response.ok) {
        setMessage('Item updated successfully!');
        setEditingItem(null);
        setName('');
        fetchItems();
      } else {
        setMessage('Failed to update item.');
      }
    } catch (error) {
      setMessage('Error while updating item.');
    }
  };

  return (
    <div className="App">
      <h1>📝 Item List</h1>

      <div className="input-section">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
        />

        {editingItem ? (
          <>
            <button className="update-btn" onClick={updateItem}>
              Update
            </button>
            <button className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <button className="add-btn" onClick={addItem}>
            Add Item
          </button>
        )}
      </div>

      {message && <p className="message">{message}</p>}

      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item-row">
            <span>{item.name}</span>
            <div className="item-actions">
              <button className="edit-btn" onClick={() => startEdit(item)}>
                ✏️ Edit
              </button>
              <button className="delete-btn" onClick={() => deleteItem(item.id)}>
                ❌ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Show item count */}
      <p className="item-count">
        Total items: {items.length} / 10
      </p>
    </div>
  );
}
