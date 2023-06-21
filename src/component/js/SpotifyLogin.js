import React, { useEffect } from 'react';

const SpotifyLogin = ({ code }) => {
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/admin/contents/music-board', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code })
        });

        if (response.ok) {
          console.log('Token request successful');
          const data = await response.json();
          const token = data.token;
          console.log('Received token:', token);
        } else {
          console.log('Error fetching token:', response.status);
        }
      } catch (error) {
        console.log('Error fetching token:', error);
      }
    };

    if (code) {
      fetchToken();
    }
  }, [code]);

  return <div>Logging in...</div>;
};

export default SpotifyLogin;
