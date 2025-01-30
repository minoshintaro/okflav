import { createFileRoute } from '@tanstack/react-router';
import { Collection } from '../featrues/Collection';

export const Route = createFileRoute('/collection')({
  component: () => <Collection />,
})
