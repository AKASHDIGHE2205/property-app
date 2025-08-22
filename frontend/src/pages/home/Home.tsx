const Home = () => {
  return (
    <>
      <div className=" h-screen w-full bg-gradient-to-br from-blue-100 via-purple-200 to-indigo-300 dark:bg-gradient-to-br dark:from-indigo-900 dark:via-purple-900 dark:to-blue-900 transition-colors duration-200">
        {/* Navigation - Minimal */}
        <nav className="px-4 py-6 max-w-6xl mx-auto">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">StoreApp</div>
        </nav>

        {/* Hero Section with Image */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                Your files, <span className="text-blue-600 dark:text-blue-400">organized</span> and accessible anywhere
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 mb-10">
                The simplest way to store, manage, and share your documents across all your devices.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg">
                  Get Started
                </button>
                <button className="bg-slate-50 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium py-3 px-8 rounded-lg transition-colors dark:text-black">
                  How It Works →
                </button>
              </div>
            </div>

            {/* Image - Clean and Relevant */}
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative rounded-xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-slate-800/20">
                <img
                  src='https://c1.wallpaperflare.com/preview/991/702/515/books-dictionary-reading-school.jpg'
                  className="w-full h-auto object-cover"
                  alt="Organized documents and books"
                />
                {/* Dark mode overlay */}
                <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-400/10 mix-blend-multiply"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 hidden">
        {/* Navigation */}
        <nav className="px-4 py-6 max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">StoreApp</div>
          <div className="hidden md:flex gap-6">
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Features</a>
            <a href="#property" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Property Tools</a>
            <a href="#document" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Document Tracking</a>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                Smart Storage for <span className="text-blue-600 dark:text-blue-400">Documents</span> & <span className="text-green-600 dark:text-green-400">Properties</span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 mb-10">
                Track physical files by storage location (rack/shelf/box) while managing complete property portfolios -
                from sale agreements to ownership history and land details.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg">
                  Start Organizing
                </button>
                <button className="border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium py-3 px-8 rounded-lg transition-colors">
                  See Demo →
                </button>
              </div>
            </div>

            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative rounded-xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-slate-800/20">
                <img
                  src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070'
                  className="w-full h-auto object-cover"
                  alt="Organized storage system"
                />
                <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-400/10 mix-blend-multiply"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Tracking Features */}
        <div id="document" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-12">
            Document Storage Management
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🗂️",
                title: "Physical Tracking",
                desc: "Catalog files by rack, shelf, box with location tags"
              },
              {
                icon: "🏷️",
                title: "Smart Labeling",
                desc: "Generate QR labels for instant access to digital records"
              },
              {
                icon: "📅",
                title: "Retention Tracking",
                desc: "Set expiration alerts for time-sensitive documents"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-slate-700/30 transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 dark:text-slate-100">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Property Management Features */}
        <div id="property" className="bg-slate-100 dark:bg-slate-800 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-12">
              Comprehensive Property Management
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ul className="space-y-6">
                  {[
                    "Track complete ownership history (sellers & purchasers)",
                    "Record land size, boundaries, and zoning details",
                    "Attach scanned deeds, surveys, and tax documents",
                    "Set reminders for tax payments and renewals",
                    "Generate reports for portfolio valuation"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-slate-700 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070"
                  className="rounded-lg"
                  alt="Property documents"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Ready to transform your document and property management?
          </h2>
          <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg mx-auto">
            Get Started Today
          </button>
        </div>
      </div>
    </>
  )
}
export default Home