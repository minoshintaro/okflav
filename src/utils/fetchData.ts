async function fetchData<T>(
  endpoint: string,
  query: Record<string, string>,
  options: RequestInit,
  timeout: number,
): Promise<T> {
  // タイマーの設定（ミリ秒）
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    // APIのリクエスト先
    const queryString = new URLSearchParams(query).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    // リクエストの結果
    const response = await fetch(url, { ...options, signal: controller.signal });

    if (!response.ok) {
      throw new Error(`API response error: ${response.status} ${response.statusText} (URL: ${url})`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`Request timeout of ${timeout}ms exceeded (URL: ${endpoint})`);
    }

    throw new Error(`Fetching error: ${error instanceof Error ? error.message : 'Unknown error'} (URL: ${endpoint})`);
  } finally {
    // タイマーを解除
    clearTimeout(timer);
  }
}

export async function getData<T>(
  endpoint: string,
  query: Record<string, string> = {},
  timeout = 5000,
): Promise<T> {
  return fetchData<T>(
    endpoint,
    query,
    { method: 'GET' },
    timeout
  );
}

export async function postData<T>(
  endpoint: string,
  body: Record<string, any>,
  timeout = 5000,
): Promise<T> {
  return fetchData<T>(
    endpoint,
    {},
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
    timeout
  );
}
