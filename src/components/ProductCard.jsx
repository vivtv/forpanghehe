export default function ProductCard({ product }) {
  const title = product.title ?? product.name ?? '';
  const img = product.image ?? product.imageUrl ?? '';
  const price = typeof product.price === 'number' ? product.price : Number(product.price) || 0;

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
      backgroundColor: '#fff',
      transition: 'transform 0.15s',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch'
    }}>
      <div style={{
        width: '100%',
        height: 300,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f6f7f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12
      }}>
        <img
          src={img}
          alt={title}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '700', color: '#000' }}>{title}</h3>
      <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '13px' }}>Category: {product.category ?? ''}</p>
      <p style={{ marginTop: 'auto', fontSize: '18px', fontWeight: '700', color: '#111' }}>${price.toLocaleString()} USD</p>
    </div>
  )
}