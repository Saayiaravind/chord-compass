// Decode JWT token and extract payload
export const decodeToken = (token) => {
  try {
    // JWT structure: header.payload.signature
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Extract role from token
export const getUserRole = (token) => {
  const payload = decodeToken(token);
  return payload?.role || null;
};

// Extract email from token
export const getUserEmail = (token) => {
  const payload = decodeToken(token);
  return payload?.sub || null;
};
