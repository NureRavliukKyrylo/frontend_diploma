import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_masterLayout/tasks/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_masterLayout/tasks/$id/"!</div>
}
