import { useMemo } from 'react';
import { Book } from './Book';
import { FallingFlowers } from './FallingFlowers';
import Admin from './Admin';

function App() {
  const isAdmin = useMemo(() => {
    return location.pathname.includes('/admin');
  }, [location.pathname]);

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
