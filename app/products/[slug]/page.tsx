// Create this file at: app/products/[slug]/page.tsx

type PageProps = {
    params: {
      slug: string
    }
  }
  
  // Function to format the slug into a readable title
  const formatTitle = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  export default function ProductPage({ params }: PageProps) {
    const pageTitle = formatTitle(params.slug);
  
    return (
      <div className="min-h-screen">
          <div className="container mx-auto px-6 py-12">
              <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          Product: {pageTitle}
                      </span>
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed">
                      This is the detailed page for the "{pageTitle}" product. Here you would describe its features, benefits, and provide in-depth information, case studies, or demos.
                  </p>
                  {/* Add more content for the specific product page here */}
              </div>
          </div>
      </div>
    )
  }