import { useMutation } from '@tanstack/react-query';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export function usePostData() {
  return useMutation<Turso.PostData, Error, Post>({
    mutationFn: async (newPost: Post) => {
      const response = await fetch(`/api/posts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      console.log('response:', response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    },
  });
}
