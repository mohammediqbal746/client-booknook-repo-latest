export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content mt-10 border-t border-base-300">
      <aside>
        {/* Logo */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-primary mb-2">
          <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c1.68 0 3.282.466 4.75 1.285a.75.75 0 001-.707V4.312a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
        </svg>
        <h2 className="text-2xl font-bold text-primary">BookNook</h2>
        <p className="font-medium text-base">A Small Online Library</p>
        <p>Add a book, borrow a book, return a book.</p>
        <p className="mt-2 text-gray-500">Email: support@booknook.com | Phone: 01856322144</p>
      </aside> 
      
      {/* Social Links (New X logo included as per requirement) */}
      <nav>
        <div className="grid grid-flow-col gap-6">
          <a href="#" aria-label="X (Twitter)" className="hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
          </a>
        </div>
      </nav>

      <aside>
        <p>Copyright © 2026 - All rights reserved by BookNook Ltd.</p>
      </aside>
    </footer>
  );
}