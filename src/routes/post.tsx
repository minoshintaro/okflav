import { createFileRoute } from '@tanstack/react-router';
import { Detail } from '../app/featrues/Detail';

export const Route = createFileRoute('/post')({
  component: Detail,
})
