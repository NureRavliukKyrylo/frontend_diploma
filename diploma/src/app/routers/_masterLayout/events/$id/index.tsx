import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_masterLayout/events/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_masterLayout/events/$id/"!</div>
}
