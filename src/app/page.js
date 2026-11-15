import Banner from "@/components/Banner"; // পাথ আপনার ফোল্ডার অনুযায়ী ঠিক করে নেবেন

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200/30">
      <Banner />
      {/* এরপর এখানে Book Categories বা অন্যান্য সেকশন আসবে */}
    </div>
  );
}