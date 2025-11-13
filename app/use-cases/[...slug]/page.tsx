// Create this file at: app/use-cases/[...slug]/page.tsx

type PageProps = {
    params: {
      slug: string[]
    }
  }
  
  // Function to format the slug into a readable title
  const formatTitle = (slug: string[]) => {
    return slug
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' - ');
  };
  
  export default function UseCasePage({ params }: PageProps) {
    const pageTitle = formatTitle(params.slug);
  
    return (
      <div className="min-h-screen">
          <div className="container mx-auto px-6 py-12">
              <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          Use Case: {pageTitle}
                      </span>
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed">
                      This page details how Gradies can be applied for the "{pageTitle}" use case. You can showcase specific workflows, benefits, and success stories relevant to this audience.
                  </p>
              </div>
          </div>
      </div>
    )
  }