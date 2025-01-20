export async function fetchData<T>(
  endpoint: string,
  query: Record<string, string> = {},
  timeout = 5000,
): Promise<T> {
  // タイムアウト（ミリ秒）
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const queryString = new URLSearchParams(query).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`API response error: ${response.status} ${response.statusText} (URL: ${url})`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`Request timeout of ${timeout}ms exceeded (URL: ${endpoint})`);
    }
    throw new Error(`Fetching error: ${error instanceof Error ? error.message : 'Unknown error'} (URL: ${endpoint})`);
  } finally {
    clearTimeout(timer);
  }
}
