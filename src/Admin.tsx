import { useState } from 'react';

export default function Admin() {
  const [name, setName] = useState('');
  const handleCopy = () => {
    // window location without admin path, and has ?name=name
    const url = new URL(window.location.href);
    url.pathname = '';
    url.searchParams.set('name', name);
    navigator.clipboard.writeText(url.href);
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '20dvh',
        gap: '8px',
      }}
    >
      <input
        type='search'
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '80%', maxWidth: '500px', height: '30px' }}
      />
      <button style={{ height: '30px', width: '60px' }} onClick={handleCopy}>
        copy
      </button>
    </div>
  );
}
