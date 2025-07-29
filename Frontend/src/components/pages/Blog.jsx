
import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Modern Living Room Design Trends for 2024",
      excerpt: "Discover the latest trends in modern living room design that will transform your space.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Interior Design"
    },
    {
      id: 2,
      title: "How to Choose the Perfect Dining Table",
      excerpt: "A comprehensive guide to selecting the right dining table for your home and family.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      author: "Mike Chen",
      date: "March 12, 2024",
      category: "Furniture Guide"
    },
    {
      id: 3,
      title: "Sustainable Furniture: Eco-Friendly Options",
      excerpt: "Learn about sustainable furniture options that are both stylish and environmentally conscious.",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      author: "Emma Davis",
      date: "March 10, 2024",
      category: "Sustainability"
    },
    {
      id: 4,
      title: "Small Space, Big Style: Maximizing Your Home",
      excerpt: "Creative solutions for making the most of small living spaces without compromising on style.",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      author: "James Wilson",
      date: "March 8, 2024",
      category: "Space Planning"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Decora<span className="text-yellow-600">Nest</span>
              </h1>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">Home</Link>
              <Link to="/shop" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">Shop</Link>
              <Link to="/collections" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">Collections</Link>
              <Link to="/blog" className="text-yellow-600 font-medium">Blog</Link>
              <Link to="/contact" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Blog Banner */}
      <section className="bg-gradient-to-r from-yellow-600 to-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4 font-serif">Design Blog</h1>
          <p className="text-xl">Tips, trends, and inspiration for your home</p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-600 text-white px-3 py-1 text-xs font-medium rounded">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 font-serif hover:text-yellow-600 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
