import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function usePostData() {
  return useMutation<Turso.PostData, Error, NewPost>({
    mutationFn: async (newPost: NewPost) => {
      const response = await axios.post(`/api/posts`, newPost);

      console.log('response:', response);

      return response.data() as Promise<Turso.PostData>;
    },
  });
}
