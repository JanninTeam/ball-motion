export async function fetchServer(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: Record<string, unknown>
) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_URL}/${endpoint}`,
      {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
