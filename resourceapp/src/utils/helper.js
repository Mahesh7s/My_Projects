export default async function fetchWithAuth(url, options = {}) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // Add headers
  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
    refreshtoken: `Bearer ${refreshToken}`,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, options);

  // ✅ If backend sent new token, update it
  const newAccessToken = response.headers.get("x-access-token");
  if (newAccessToken) {
    localStorage.setItem("accessToken", newAccessToken);
  }

  // ✅ If response is still unauthorized after refresh → logout
  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // or navigate("/login")
    return;
  }

  return response;
}
