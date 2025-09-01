/**
 * API service for user management using JSONPlaceholder
 * Handles all CRUD operations for users
 */

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Generic API request handler with error handling
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(
        `API Error: ${response.status} ${response.statusText}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error occurred. Please check your connection.');
  }
}

/**
 * Fetch all users from the API
 */
export async function fetchUsers() {
  return apiRequest('/users');
}

/**
 * Fetch a single user by ID
 */
export async function fetchUser(id) {
  return apiRequest(`/users/${id}`);
}

/**
 * Create a new user
 */
export async function createUser(userData) {
  return apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

/**
 * Update an existing user
 */
export async function updateUser(id, userData) {
  return apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, ...userData }),
  });
}

/**
 * Delete a user by ID
 */
export async function deleteUser(id) {
  await apiRequest(`/users/${id}`, {
    method: 'DELETE',
  });
}