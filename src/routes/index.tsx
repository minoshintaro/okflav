import { createFileRoute } from '@tanstack/react-router';
import { Lineup } from '../app/layouts/Lineup';

export const Route = createFileRoute('/')({
  component: Lineup,
})
