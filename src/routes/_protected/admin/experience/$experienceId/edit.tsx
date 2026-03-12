import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/admin/experience/$experienceId/edit',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/admin/experience/$experienceId/edit"!</div>
}
