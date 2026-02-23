import { useState } from 'react';

const style = {
  field: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },
  row: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  }
};

export default function SearchBar({ onQueryChange, onCategoryChange, categories = [] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onQueryChange) onQueryChange(value);
  };

  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(value);
    if (onCategoryChange) onCategoryChange(value);
  };

  return (
    <div style={style.field}>
      <div style={style.row}>
        <div style={{ flex: 1 }}>
          <label style={style.label}>Search:</label>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search products..."
            style={style.input}
          />
        </div>

        <div style={{ width: 220 }}>
          <label style={style.label}>Category:</label>
          <select value={category} onChange={handleCategory} style={style.select}>
            <option value="">All</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
   