import Link from 'next/link'

interface CallToActionProps {
  title?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonLink?: string
}

export default function CallToAction({
  title = "Join Us Today",
  description = "Whether you're starting your journey in Islamic learning or looking to deepen your understanding, Baytul Mutun Wal Manzumaat is here to guide you every step of the way.",
  primaryButtonText = "Explore Our Courses",
  secondaryButtonText = "Start Learning Today",
  primaryButtonLink = "/courses",
  secondaryButtonLink = "/register"
}: CallToActionProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-gold to-gold-secondary text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>
          <p className="text-xl mb-8">{description}</p>
          <div className="flex justify-center gap-4">
            <Link href={primaryButtonLink}>
              <button className="btn-primary bg-white text-gold hover:bg-gray-100">
                {primaryButtonText}
              </button>
            </Link>
            <Link href={secondaryButtonLink}>
              <button className="btn-secondary border-white text-white hover:bg-white/10">
                {secondaryButtonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
