// src/components/GitHubUserSearch.jsx
import { useState } from 'react';
import { fetchUser, fetchUserRepos } from '../services/githubAPI';
import './UserSearch.css';

function UserSearch() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
   
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setUserData(null);
    setRepos([]);

    try {
      // Fetch user data and repos in parallel
      const [user, userRepos] = await Promise.all([
        fetchUser(username),
        fetchUserRepos(username)
      ]);
      
      setUserData(user);
      setRepos(userRepos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="github-search">
      <h1>GitHub User Activity</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username (e.g., 'octocat')"
          className="search-input"
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {userData && (
        <div className="user-profile">
          <img 
            src={userData.avatar_url} 
            alt={userData.login} 
            className="avatar"
          />
          <div className="user-info">
            <h2>{userData.name || userData.login}</h2>
            <p className="username">@{userData.login}</p>
            {userData.bio && <p className="bio">{userData.bio}</p>}
            <div className="stats">
              <span>📦 {userData.public_repos} repos</span>
              <span>👥 {userData.followers} followers</span>
              <span>✨ {userData.following} following</span>
            </div>
            {userData.blog && (
              <a href={userData.blog} target="_blank" rel="noopener noreferrer">
                🌐 {userData.blog}
              </a>
            )}
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className="repos-section">
          <h3>Recent Repositories</h3>
          <div className="repos-list">
            {repos.map((repo) => (
              <div key={repo.id} className="repo-card">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <strong>{repo.name}</strong>
                </a>
                {repo.description && <p>{repo.description.substring(0, 100)}</p>}
                <div className="repo-stats">
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  <span>📝 {repo.language || 'No language'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSearch;