import { useMemo } from 'react';
import { Book } from './Book';
import { FallingFlowers } from './FallingFlowers';
import Admin from './Admin';

function App() {
  const isAdmin = useMemo(() => {
    return new URLSearchParams(location.search).get('admin') === 'true';
  }, [location.search]);

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <>
      <FallingFlowers />
      <Book />
    </>
  );
}

export default App;
