import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  variant?: "full" | "icon"
  className?: string
  href?: string | null
}

export function Logo({ variant = "full", className = "", href = "/" }: LogoProps) {
  const image = variant === "full" ? (
    <Image
      src="/plandata-logo.svg"
      alt="Plandata"
      width={200}
      height={50}
      priority
      className="h-10 w-auto"
    />
  ) : (
    <Image
      src="/plandata-icon.svg"
      alt="Plandata"
      width={48}
      height={48}
      priority
      className="h-10 w-10"
    />
  )

  if (href === null) {
    return <span className={`inline-block ${className}`}>{image}</span>
  }

  return (
    <Link href={href} className={`inline-block ${className}`}>
      {image}
    </Link>
  )
}
