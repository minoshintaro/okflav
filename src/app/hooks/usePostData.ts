import { useMutation } from '@tanstack/react-query';

export function usePostData() {
  return useMutation<Turso.PostData, Error, NewPost>({
    mutationFn: async (newPost: NewPost) => {
      console.log('To:', window.location.origin + '/api/posts');

      const response = await fetch(`/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      console.log('response:', response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json() as Promise<Turso.PostData>;
    },
  });
}
