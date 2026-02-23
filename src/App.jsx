import { useMemo, useState, useEffect } from 'react';
import './App.css'

import { fetchProducts } from './api/product';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';

export default function App() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load full catalog once and derive categories; filtering is client-side
  useEffect(() => {
    let mounted = true;
    async function loadAll() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchProducts();
        if (!mounted) return;
        setProducts(data);
        const cats = Array.from(new Set(data.map(p => p.category).filter(Boolean)));
        setCategories(cats);
      } catch (e) {
        if (!mounted) return;
        setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadAll();
    return () => { mounted = false };
  }, []);

  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    return products.filter(p => {
      const text = (p.title ?? p.name ?? '').toLowerCase();
      const matchesQuery = term ? text.includes(term) : true;
      const matchesCategory = category ? p.category === category : true;
      return matchesQuery && matchesCategory;
    });
  }, [products, q, category]);

  if(loading) return <div style={{ padding: 24, fontFamily: 'system-ui' }}>Loading...</div>
  if(error) return <div style={{ padding: 24, fontFamily: 'system-ui', color: 'red' }}>{error}</div>


  return (
    <div style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1>Product Search</h1>
      <SearchBar onQueryChange={setQ} onCategoryChange={setCategory} categories={categories} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}