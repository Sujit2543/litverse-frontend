import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Styles
import GlobalStyles from "./styles/GlobalStyles";

// Data
import { mockBooks } from "./data/mockData";

// Services
import { geminiApiCall } from "./services/geminiApi";

// Reusable Components
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Page Components
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import ExploreLibraryPage from "./pages/ExploreLibraryPage";
import MyLibraryPage from "./pages/MyLibraryPage";
import Requestabook from "./pages/Requestabook";
import BookDetailsPage from "./pages/BookDetailsPage";
import BookReaderPage from "./pages/BookReaderPage";
import AudiobookPlayerPage from "./pages/AudiobookPlayerPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import CommunityPage from "./pages/CommunityPage";
import AdminPanelPage from "./pages/AdminPanel";
 // ✅ Admin Panel




// ✅ Separate AppRoutes so we can use useNavigate
function AppRoutes({
  isLoggedIn,
  username,
  isAdmin, // ✅ Added admin state
  setIsLoggedIn,
  setUsername,
  setIsAdmin, // ✅ setter for admin state
  handleLogout,
  theme,
  handleToggleTheme,
  useBlinkingBg,
  handleToggleBg,
  currentView,
  handlePageChange,
  myLibrary,
  myWishlist,
  handleAddToLibrary,
  handleWishlist,
  reviews,
  handleAddReview,
  communityPosts,
  handleAddPost,
  joinedClubs,
  handleJoinClub,
  joinedChallenges,
  handleJoinChallenge,
  callGemini,
  isGeminiLoading,
}) {
  const navigate = useNavigate();

  const handleLogin = (name, admin = false) => {
    setIsLoggedIn(true);
    setUsername(name);
    setIsAdmin(admin); // ✅ set admin flag
    navigate("/home");
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const renderDynamicPage = () => {
    const props = {
      ...mockBooks,
      username,
      myLibrary,
      myWishlist,
      onAddToLibrary: handleAddToLibrary,
      onWishlist: handleWishlist,
      onViewBookDetails: (book) => handlePageChange("Book Details", book),
      onStartReading: (book) => handlePageChange("Book Reader", book),
      onPlayAudiobook: (book) => handlePageChange("Audiobook Player", book),
      callGemini,
      isGeminiLoading,
    };

    switch (currentView.page) {
      case "Home":
        return <HomePage {...props} />;
      case "Explore":
        return <ExploreLibraryPage {...props} />;
      case "Book Details":
        return (
          <BookDetailsPage
            book={currentView.book}
            isWishlisted={myWishlist.some((b) => b.id === currentView.book.id)}
            bookReviews={reviews[currentView.book.id]}
            onAddReview={handleAddReview}
            {...props}
            onExit={() => handlePageChange("Home")}
          />
        );
      case "Book Reader":
        return (
          <BookReaderPage
            book={currentView.book}
            onExit={() => handlePageChange("Book Details", currentView.book)}
            {...props}
          />
        );
      case "Audiobook Player":
        return (
          <AudiobookPlayerPage
            book={currentView.book}
            onExit={() => handlePageChange("Book Details", currentView.book)}
            {...props}
          />
        );
      case "My Library":
        return <MyLibraryPage {...props} />;
      case "User Dashboard":
        return <UserDashboardPage username={username} {...props} />;
      case "Community":
        return (
          <CommunityPage
            username={username}
            communityPosts={communityPosts}
            onAddPost={handleAddPost}
            joinedClubs={joinedClubs}
            onJoinClub={handleJoinClub}
            joinedChallenges={joinedChallenges}
            onJoinChallenge={handleJoinChallenge}
          />
        );
      case "Admin Panel":
        return <AdminPanelPage />; // ✅ already imported
      default:
        return <HomePage {...props} />;
    }
  };

  return (
    <Routes>
      {/* Public Routes */}
      {!isLoggedIn ? (
        <>
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
          />
          <Route
            path="/register"
            element={<Register onBackToLogin={handleBackToLogin} />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        /* Protected Routes */
        <>
          <Route
            path="/home"
            element={
              <div className="flex min-h-screen flex-col">
                <Header
                  onLogout={handleLogout}
                  username={username}
                  theme={theme}
                  onToggleTheme={handleToggleTheme}
                />
                <Navigation
                  currentPage={currentView.page}
                  onPageChange={handlePageChange}
                  myLibraryCount={myLibrary.length}
                  myWishlistCount={myWishlist.length}
                  isAdmin={isAdmin} // ✅ optional to show Admin link
                />
                <main className="flex-grow space-y-8 p-4 sm:p-8">
                  {renderDynamicPage()}
                </main>
                <Footer useBlinkingBg={useBlinkingBg} onToggleBg={handleToggleBg} />
              </div>
            }
          />

          {/* ✅ Admin-only route */}
          {isAdmin && (
            <Route
              path="/admin"
              element={
                <div className="flex min-h-screen flex-col">
                  <AdminPanelPage />
                </div>
              }
            />
          )}

          {/* Restrict access if not admin */}
          {!isAdmin && <Route path="/admin" element={<Navigate to="/home" />} />}

          <Route path="*" element={<Navigate to="/home" />} />
        </>
      )}
    </Routes>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // ✅ New admin flag
  const [currentView, setCurrentView] = useState({ page: "Home" });
  const [myLibrary, setMyLibrary] = useState([]);
  const [myWishlist, setMyWishlist] = useState([]);
  const [reviews, setReviews] = useState({});
  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, username: "jane_doe", text: "What did everyone think of the 'Dune' ending?", replies: 24 },
    { id: 2, username: "code_master", text: "Best Programming book for beginners in 2025?", replies: 15 },
  ]);
  const [joinedClubs, setJoinedClubs] = useState(new Set());
  const [joinedChallenges, setJoinedChallenges] = useState(new Set());
  const [theme, setTheme] = useState("light");
  const [useBlinkingBg, setUseBlinkingBg] = useState(false);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);

  const callGemini = async (systemPrompt, userPrompt, jsonSchema = null) => {
    setIsGeminiLoading(true);
    try {
      return await geminiApiCall(systemPrompt, userPrompt, jsonSchema);
    } finally {
      setIsGeminiLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    setIsAdmin(false);
  };

  const handleToggleBg = () => setUseBlinkingBg((prev) => !prev);
  const handleToggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const handlePageChange = (page, book = null) => setCurrentView({ page, book });
  const handleAddToLibrary = (book) => setMyLibrary((prev) => (prev.some((b) => b.id === book.id) ? prev : [...prev, book]));
  const handleWishlist = (book) => setMyWishlist((prev) => (prev.some((b) => b.id === book.id) ? prev : [...prev, book]));
  const handleAddReview = (bookId, reviewData) => setReviews((prev) => ({
    ...prev,
    [bookId]: [...(prev[bookId] || []), reviewData],
  }));
  const handleAddPost = (postData) => setCommunityPosts((prev) => [postData, ...prev]);
  const handleJoinClub = (clubId) => setJoinedClubs((prev) => new Set(prev).add(clubId));
  const handleJoinChallenge = (challengeId) => setJoinedChallenges((prev) => new Set(prev).add(challengeId));

  return (
    <Router>
      <GlobalStyles />
      <div className={`${theme} ${useBlinkingBg ? "blinking-bg" : "safe-bg"}`}>
        <div className="min-h-screen w-full font-sans">
          <AppRoutes
            isLoggedIn={isLoggedIn}
            username={username}
            isAdmin={isAdmin} // ✅ pass admin flag
            setIsLoggedIn={setIsLoggedIn}
            setUsername={setUsername}
            setIsAdmin={setIsAdmin} // ✅ pass admin setter
            handleLogout={handleLogout}
            theme={theme}
            handleToggleTheme={handleToggleTheme}
            useBlinkingBg={useBlinkingBg}
            handleToggleBg={handleToggleBg}
            currentView={currentView}
            handlePageChange={handlePageChange}
            myLibrary={myLibrary}
            myWishlist={myWishlist}
            handleAddToLibrary={handleAddToLibrary}
            handleWishlist={handleWishlist}
            reviews={reviews}
            handleAddReview={handleAddReview}
            communityPosts={communityPosts}
            handleAddPost={handleAddPost}
            joinedClubs={joinedClubs}
            handleJoinClub={handleJoinClub}
            joinedChallenges={joinedChallenges}
            handleJoinChallenge={handleJoinChallenge}
            callGemini={callGemini}
            isGeminiLoading={isGeminiLoading}
          />
        </div>
      </div>
    </Router>
  );
}
