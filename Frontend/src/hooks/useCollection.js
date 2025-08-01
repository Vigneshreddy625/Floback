// hooks/useCollections.js
import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8000/api/v1';


const useCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [errorCollections, setErrorCollections] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoadingCollections(true);
        setErrorCollections(null);
        // Replace with your actual API endpoint for fetching collections
        const response = await fetch(`${API_BASE_URL}/collections/all`); // Assuming your API is at /api/collections
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        // Assuming your API response structure is like { success: true, data: [...] }
        setCollections(result.data.docs || []); 
      } catch (error) {
        console.error("Failed to fetch collections:", error);
        setErrorCollections(error);
      } finally {
        setLoadingCollections(false);
      }
    };

    fetchCollections();
  }, []); // Empty dependency array means this runs once on mount

  return { collections, loadingCollections, errorCollections };
};

export default useCollections;