import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_masterLayout/reports/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_masterLayout/reports/"!</div>
}
