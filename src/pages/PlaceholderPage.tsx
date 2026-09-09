import { Link } from 'react-router-dom'
import { Construction } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { IconTile } from '../components/ui/SelectableCard'

export function PlaceholderPage({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Card className="mx-auto max-w-xl text-center">
      <IconTile tone="brand" className="mx-auto">
        <Construction size={18} />
      </IconTile>
      <h1 className="mt-4 font-display text-xl font-bold text-ink">{title}</h1>
      <p className="mt-2 text-sm text-ink-muted">{description}</p>
      <Link to="/dashboard" className="mt-6 inline-block">
        <Button variant="secondary">Back to Home</Button>
      </Link>
    </Card>
  )
}
