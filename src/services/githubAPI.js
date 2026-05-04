const BASE_URL = 'https://api.github.com';


export const fetchUser = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    if (!response.ok) {
      throw new Error(`User not found: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const fetchUserRepos = async (username, page = 1, perPage = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`
    );
    if (!response.ok) {
      throw new Error(`Repos not found: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching repos:', error);
    throw error;
  }
};

export const fetchUserEvents = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/events`);
    if (!response.ok) {
      throw new Error(`Events not found: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

