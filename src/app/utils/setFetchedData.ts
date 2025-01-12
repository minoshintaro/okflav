export async function setFetchedData<T>(
  endpoint: string,
  setValue: (value: T) => void,
): Promise<void> {
  try {
    const response = await fetch(`/api/${endpoint}`);

    if (!response.ok) {
      throw new Error(`API Error! ${response.status}`);
    }

    const data = await response.json();
    setValue(data.message);
  } catch (error) {
    console.error(error);
  }
}
