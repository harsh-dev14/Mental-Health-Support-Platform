import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface Resource {
  title: string;
  content: string;
  // Additional fields like media URLs, categories, etc.
}

const ResourceLibrary: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await api.get('/resources'); // Assuming a /resources endpoint exists
        setResources(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error fetching resources');
      }
    };
    fetchResources();
  }, []);

  return (
    <div>
      <h3>Resource Library</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {resources.map((resource, index) => (
          <li key={index}>
            <h4>{resource.title}</h4>
            <p>{resource.content}</p>
            {/* Add media content or links if available */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceLibrary;
