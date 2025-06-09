import Link from "next/link"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  title: string
  image: string
  href: string
  className?: string
}

export function CategoryCard({ title, image, href, className }: CategoryCardProps) {
  return (
    <Link href={href} className={cn("category-card", className)}>
      <img src={image || "/placeholder.svg"} alt={title} className="category-card-image" />
      <h3 className="category-card-title">{title}</h3>
    </Link>
  )
}
