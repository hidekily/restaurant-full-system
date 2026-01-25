import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console/dashboard/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/console/dashboard/__add"!</div>
}
