"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client"; 
import toast from "react-hot-toast";
import Link from "next/link";

function BookDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession(); // ইউজারের তথ্য নেওয়ার জন্য
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [returnDate, setReturnDate] = useState("");
  const [borrowing, setBorrowing] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8000/books/${id}`);
        const data = await res.json();

        if (data && data._id) {
          setBook(data);
        } else {
          toast.error("Book not found!");
        }
      } catch (error) {
        toast.error("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  // ধার করার API কল
  const handleBorrowSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user) return toast.error("Please login to borrow a book!");
    if (!returnDate) return toast.error("Please select a return date!");

    setBorrowing(true);
    try {
      const borrowData = {
        bookId: book._id,
        name: book.name,
        image: book.image,
        category: book.category,
        userEmail: session.user.email,
        userName: session.user.name,
        borrowedDate: new Date(),
        returnDate: new Date(returnDate),
      };

      const res = await fetch("http://localhost:8000/borrows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(borrowData),
      });

      const result = await res.json();
      
      if (res.ok || result.acknowledged) {
        toast.success("Book borrowed successfully!");
        document.getElementById("borrow_modal").close(); // মডাল বন্ধ করা
        setReturnDate(""); // ডেট ক্লিয়ার করা
        // লাইভ কোয়ান্টিটি ১ কমিয়ে দেওয়া
        setBook({ ...book, quantity: (book.quantity || book.totalCopies || 1) - 1 });
      } else {
        toast.error(result.msg || "Failed to borrow book. You might have borrowed it already!");
      }
    } catch (error) {
      toast.error("An error occurred while borrowing.");
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-500 mb-4">Book not found!</h2>
        <Link href="/books" className="btn btn-primary rounded-xl px-8">Go Back</Link>
      </div>
    );
  }

  const currentQuantity = book.quantity || book.totalCopies || 0;

  return (
    <div className="min-h-screen bg-base-200/30 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row">
          
          <div className="w-full md:w-2/5 h-80 md:h-auto relative bg-gray-100">
            <img 
              src={book.image} 
              alt={book.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-4">
              <span className="badge badge-primary badge-outline px-3 py-3 text-sm">{book.category}</span>
              <span className="flex items-center gap-1 font-bold text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full">
                ⭐ {book.rating}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">{book.name}</h1>
            <p className="text-lg text-gray-600 mb-6 font-medium">By {book.author}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-base-200/50 p-4 rounded-2xl">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Available Quantity</p>
                <p className="text-xl font-bold text-gray-800">{currentQuantity}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              <Link href="/books" className="btn btn-outline btn-primary flex-1 rounded-xl">
                Back to Books
              </Link>
              
              {/* Borrow Button - কোয়ান্টিটি 0 হলে ডিসেবল থাকবে */}
              <button 
                onClick={() => document.getElementById("borrow_modal").showModal()}
                disabled={currentQuantity <= 0}
                className="btn btn-primary flex-1 rounded-xl shadow-lg shadow-primary/30"
              >
                {currentQuantity <= 0 ? "Out of Stock" : "Borrow Book"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DaisyUI Modal for Borrowing */}
      <dialog id="borrow_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-xl text-gray-800 mb-4">Borrow "{book.name}"</h3>
          
          <form onSubmit={handleBorrowSubmit} className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label font-semibold text-gray-600">Name</label>
              <input type="text" value={session?.user?.name || ""} disabled className="input input-bordered bg-gray-50 text-gray-500" />
            </div>
            
            <div className="form-control">
              <label className="label font-semibold text-gray-600">Email</label>
              <input type="email" value={session?.user?.email || ""} disabled className="input input-bordered bg-gray-50 text-gray-500" />
            </div>

            <div className="form-control">
              <label className="label font-semibold text-gray-600">Return Date</label>
              <input 
                type="date" 
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]} // আজকের আগের ডেট সিলেক্ট করা যাবে না
                className="input input-bordered focus:border-primary focus:ring-1 focus:ring-primary" 
              />
            </div>

            <div className="modal-action mt-6">
              {/* Cancel Button */}
              <button type="button" onClick={() => document.getElementById("borrow_modal").close()} className="btn btn-ghost">Cancel</button>
              {/* Submit Button */}
              <button type="submit" disabled={borrowing} className="btn btn-primary px-8">
                {borrowing ? <span className="loading loading-spinner loading-sm"></span> : "Confirm Borrow"}
              </button>
            </div>
          </form>
        </div>
        {/* মডালের বাইরে ক্লিক করলে বন্ধ হবে */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </div>
  );
}

export default function BookDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    }>
      <BookDetailsContent />
    </Suspense>
  );
}