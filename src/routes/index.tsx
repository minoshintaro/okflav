import { createFileRoute } from '@tanstack/react-router';
import { Lineup } from '../app/pages/Lineup';

export const Route = createFileRoute('/')({
  component: Lineup,
})
