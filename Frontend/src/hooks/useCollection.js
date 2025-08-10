import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;


const useCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [errorCollections, setErrorCollections] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoadingCollections(true);
        setErrorCollections(null);
        const response = await fetch(`${API_BASE_URL}/collections/all`); 
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setCollections(result.data.docs || []); 
      } catch (error) {
        console.error("Failed to fetch collections:", error);
        setErrorCollections(error);
      } finally {
        setLoadingCollections(false);
      }
    };

    fetchCollections();
  }, []); 

  return { collections, loadingCollections, errorCollections };
};

export default useCollections;