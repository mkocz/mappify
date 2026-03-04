import { createContext, useState, useEffect } from 'react';
import { API_URL } from '../config';

export const RegionsContext = createContext([]);

export function RegionsProvider({ children }) {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}api/regions`)
      .then(res => res.json())
      .then(data => setRegions(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <RegionsContext.Provider value={{ regions }}>
      {children}
    </RegionsContext.Provider>
  );
}
