import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console/dashboard/del')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/console/dashboardChild/del"!</div>
}
