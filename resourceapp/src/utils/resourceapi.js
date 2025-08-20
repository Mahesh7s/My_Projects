import fetchWithAuth from "../utils/helper";

// Add a resource
export async function addResource(data) {
  const response = await fetchWithAuth("http://localhost:3000/resources/addResource", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}

// Delete a resource
export async function deleteResource(id) {
  const response = await fetchWithAuth(`http://localhost:3000/resources/deleteResource/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
