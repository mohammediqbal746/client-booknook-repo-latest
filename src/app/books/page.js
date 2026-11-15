"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AllBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Vercel লিংকের বদলে Localhost দেওয়া হলো (ডেপ্লয়ের সময় আপনার লাইভ লিংক দেবেন)
        const res = await fetch("http://localhost:8000/books");
        const data = await res.json();

        // যেহেতু ব্যাকএন্ড সরাসরি Array পাঠাচ্ছে, তাই data.success চেকের দরকার নেই
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          setBooks([]);
        }
      } catch (error) {
        toast.error("Failed to fetch books");
      } finally {
        setLoading(false); // লোডিং বন্ধ করা হলো
      }
    };

    fetchBooks(); // ফাংশনটি কল করা হলো
  }, []); // useEffect-এর ব্র্যাকেট ক্লোজ করা হলো

  // ক্যাটাগরি অনুযায়ী ফিল্টার করা
  const filteredBooks = filter === "All" 
    ? books 
    : books.filter(book => book.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/30 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">All Library Books</h1>
            <p className="text-gray-500 mt-2">Browse and borrow your favorite books.</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
            <label className="font-semibold text-gray-600 pl-2">Filter by:</label>
            <select 
              className="select select-bordered select-sm rounded-lg focus:outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Novel">Novel</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="History">History</option>
              <option value="Business">Business</option>
              <option value="Programming">Programming</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-500">No books found in this category.</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div key={book._id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
                <figure className="px-6 pt-6">
                  <img 
                    src={book.image} 
                    alt={book.name} 
                    className="rounded-xl h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </figure>
                <div className="card-body px-6 pb-6 pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="badge badge-primary badge-outline text-xs">{book.category}</div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-yellow-500">
                      ⭐ {book.rating}
                    </div>
                  </div>
                  <h2 className="card-title text-lg font-bold text-gray-800 line-clamp-1">{book.name}</h2>
                  <p className="text-sm text-gray-500 mb-3">By {book.author}</p>
                  
                  <div className="card-actions justify-end mt-auto">
                    <Link href={`/books/${book._id}`} className="btn btn-primary btn-sm w-full rounded-lg">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}