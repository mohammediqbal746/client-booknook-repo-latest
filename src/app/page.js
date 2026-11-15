import Banner from "../components/Banner"; 
import Link from "next/link";

export default function Home() {
  // ক্যাটাগরি সেকশনের ডামি ডেটা
  const categories = [
    { name: "Novel", icon: "📚", color: "bg-blue-100 text-blue-600" },
    { name: "Sci-Fi", icon: "🚀", color: "bg-purple-100 text-purple-600" },
    { name: "History", icon: "🏛️", color: "bg-amber-100 text-amber-600" },
    { name: "Business", icon: "💼", color: "bg-green-100 text-green-600" },
  ];

  // How It Works সেকশনের ডামি ডেটা
  const steps = [
    { title: "Sign Up", desc: "Create an account in just a few seconds.", icon: "📝" },
    { title: "Find Books", desc: "Search and filter through our huge library.", icon: "🔍" },
    { title: "Borrow & Read", desc: "Borrow your favorite books and enjoy!", icon: "📖" },
  ];

  return (
    <div className="min-h-screen bg-base-200/30 pb-20">
      
      {/* ১. Banner Section (আপনার তৈরি করা স্লাইডার) */}
      <Banner />

      {/* ২. Extra Section 1: Book Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Top Categories</h2>
          <p className="text-gray-500 mt-2">Explore books by your favorite genres</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Link href="/books" key={index}>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all hover:-translate-y-2 cursor-pointer group">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform ${cat.color}`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-700 text-lg">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ৩. Extra Section 2: How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-primary/5 border border-primary/10 relative overflow-hidden">
          {/* Background Decorative Blob */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
          
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">How It Works?</h2>
            <p className="text-gray-500 mt-2">Get started with BookNook in 3 easy steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            {/* Desktop Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-50 -translate-y-1/2 -z-10 rounded-full"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-gray-50 hover:border-primary/20 transition-colors">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-inner transform -rotate-3 hover:rotate-0 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}