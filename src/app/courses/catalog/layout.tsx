
export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Catalog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive collection of Islamic courses, from beginner to advanced levels.
        </p>
      </div>

      {children}
    </div>
  );
}