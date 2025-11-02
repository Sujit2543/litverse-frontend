import React, { useState } from "react";
import Hero from "../components/Hero";
import BookFilter from "../components/BookFilter";
import BookGrid from "../components/BookGrid";

export default function HomePage(props) {
  // ✅ State to track active book category
  const [activeFilter, setActiveFilter] = useState("All");

  // ✅ Filter books by category
  const filteredBooks = props.featuredBooks.filter(
    (book) => activeFilter === "All" || book.category === activeFilter
  );

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Filter Buttons (All, Programming, Story, Essay, etc.) */}
      <BookFilter 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
      />

      {/* Trending Books Section */}
      <BookGrid 
        title="Trending Books" 
        books={filteredBooks} 
        {...props} 
      />
    </>
  );
}
