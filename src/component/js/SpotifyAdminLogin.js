import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SpotifyAdminLogin() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // 페이지 이동
    window.location.href = 'https://accounts.spotify.com/ko/authorize?response_type=code&client_id=e665029ca3b34c27b937c214233fd932&redirect_uri=http://localhost:8181/contents/music-board';
  };

  useEffect(() => {
    // Check if the URL contains the "code" parameter indicating a successful login
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      // Redirect to the desired page after successful login
      window.location.href = 'http://localhost:3000/nb-playlist';
    }
  }, []);

  return <div onClick={handleLoginClick}>로그인...</div>;
}

export default SpotifyAdminLogin;
