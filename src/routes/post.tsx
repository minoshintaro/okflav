import { createFileRoute } from '@tanstack/react-router';
import { Post } from '../app/featrues/Post';

export const Route = createFileRoute('/post')({
  component: Post,
})
