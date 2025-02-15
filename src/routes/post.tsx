import { createFileRoute } from '@tanstack/react-router';
import { Post } from '../app/pages/Post';

export const Route = createFileRoute('/post')({
  component: Post,
});
