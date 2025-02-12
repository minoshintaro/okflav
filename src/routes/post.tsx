import { createFileRoute } from '@tanstack/react-router';
import { Post } from '../app/layouts/Post';

export const Route = createFileRoute('/post')({
  component: Post,
});
