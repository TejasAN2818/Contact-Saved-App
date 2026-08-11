const PEOPLE_API =
  "https://people.googleapis.com/v1/people:createContact";

export async function createContact(name, phone) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Google not connected.");
  }

  const response = await fetch(PEOPLE_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      names: [
        {
          givenName: name,
        },
      ],
      phoneNumbers: [
        {
          value: `+91${phone}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error(error.error.message);
  }

  return await response.json();
}