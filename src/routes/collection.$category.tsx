import { createFileRoute } from '@tanstack/react-router'
import { Collection } from '../app/pages/Collection'

export const Route = createFileRoute('/collection/$category')({
  component: CollectionPage,
})

function CollectionPage() {
  const { category } = Route.useParams();
  return <Collection category={category} />
}
