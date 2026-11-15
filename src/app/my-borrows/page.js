"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client"; // আপনার ফোল্ডার অনুযায়ী পাথ (প্রয়োজনে "../../lib/auth-client" দিতে পারেন)

export default function MyBorrowsPage() {
  const { data: session, isPending } = authClient.useSession();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        // আপনার নির্দেশমতো লোকালহোস্ট লিংক দেওয়া হলো (ব্যাকএন্ডের রাউট /borrows ধরে নিলাম)
        // ডেপ্লয়ের সময় এটি পরিবর্তন করে Vercel লিংক দেবেন
        const res = await fetch(`http://localhost:8000/borrows?email=${session?.user?.email}`);
        const data = await res.json();

        // ব্যাকএন্ড সরাসরি Array পাঠালে সেটা সেট করা হবে
        if (Array.isArray(data)) {
          setBorrowedBooks(data);
        } else {
          setBorrowedBooks([]);
        }
      } catch (error) {
        toast.error("Failed to fetch borrowed books");
      } finally {
        setLoading(false);
      }
    };

    // সেশন লোড হওয়ার পর ইউজারের ইমেইল থাকলে তবেই ফেচ করবে
    if (!isPending && session?.user?.email) {
      fetchBorrowedBooks();
    } else if (!isPending && !session) {
      setLoading(false);
    }
  }, [session, isPending]);

  // Return Book হ্যান্ডলার (আপনার ব্যাকএন্ড রাউট অনুযায়ী আপডেট করতে পারবেন)
  const handleReturn = async (id) => {
    toast.success("Book returned successfully!");
    // এখানে আপনার Return API কল করার লজিক বসবে
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/30 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">My Borrowed Books</h1>
          <p className="text-gray-500 mt-2">Manage the books you have currently borrowed.</p>
        </div>

        {/* Books Grid */}
        {borrowedBooks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-500 mb-4">You have not borrowed any books yet!</h2>
            <Link href="/books" className="btn btn-primary rounded-xl px-8">Browse Books</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {borrowedBooks.map((book) => (
              <div key={book._id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
                <figure className="px-6 pt-6">
                  <img 
                    src={book.image} 
                    alt={book.name} 
                    className="rounded-xl h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </figure>
                <div className="card-body px-6 pb-6 pt-4">
                  <div className="badge badge-primary badge-outline text-xs mb-2">{book.category}</div>
                  <h2 className="card-title text-lg font-bold text-gray-800 line-clamp-1">{book.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">Borrowed Date: <span className="font-semibold text-gray-700">{new Date(book.borrowedDate || book.createdAt).toLocaleDateString()}</span></p>
                  <p className="text-sm text-gray-500 mb-4">Return Date: <span className="font-semibold text-red-500">{new Date(book.returnDate).toLocaleDateString()}</span></p>
                  
                  <div className="card-actions justify-end mt-auto">
                    <button 
                      onClick={() => handleReturn(book._id)}
                      className="btn btn-outline btn-error btn-sm w-full rounded-lg"
                    >
                      Return Book
                    </button>
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