import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GitHubCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

  useEffect(() => {
    const fetchGitHubUser = async () => {
      const code = new URLSearchParams(location.search).get('code');

      if (!code) {
        setError('No code found');
        setLoading(false);
        return;
      }

      try {
        const tokenUrl = `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token`;

        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: process.env.REACT_APP_GITHUB_REDIRECT_URI
          })
        });

        const tokenData = await response.json();
        const accessToken = tokenData.access_token;

        const userResponse = await fetch('https://api.github.com/user', {
          headers: {
            Authorization: `token ${accessToken}`
          }
        });

        const userData = await userResponse.json();

        const emailResponse = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `token ${accessToken}`
          }
        });

        const emails = await emailResponse.json();
        const primaryEmail = emails.find(email => email.primary)?.email || emails[0]?.email;

        const userInfo = {
          name: userData.name,
          email: primaryEmail
        };

        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('credential', accessToken);
        localStorage.setItem('authProvider', 'github');

        navigate('/homePage/dashboard');

      } catch (err) {
        setError('GitHub login failed: ' + err.message);
        setLoading(false);
      }
    };

    fetchGitHubUser();
  }, [location, navigate, clientId, clientSecret]);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      {loading ? (
        <h2>Authenticating with GitHub...</h2>
      ) : (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={() => navigate('/')}>Back to Login</button>
        </div>
      )}
    </div>
  );
};

export default GitHubCallback;
