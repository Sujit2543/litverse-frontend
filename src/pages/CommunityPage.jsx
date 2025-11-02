import React, { useState } from 'react';

// 7j. CommunityPage (UPDATED with new features)
export default function CommunityPage({ username, communityPosts, onAddPost, joinedClubs, onJoinClub, joinedChallenges, onJoinChallenge }) {
  const [postText, setPostText] = useState("");

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (postText.trim() === "") return;
    onAddPost({
      id: Date.now(),
      username: username,
      text: postText,
      replies: 0,
    });
    setPostText("");
  };

  const mockClubs = [
    { id: 'scifi', name: 'The Sci-Fi Squad' },
    { id: 'motivation', name: 'Motivation & Self-Help' },
    { id: 'poetry', name: 'Poetry Corner' },
  ];
  
  const mockChallenges = [
    { id: 'weekly50', name: 'Weekly Reader', desc: 'Read 50 pages this week.' },
    { id: 'monthly3', name: 'Monthly Marathon', desc: 'Finish 3 books this month.' },
  ];

  return (
    <div className="space-y-8">
      <section className="mx-auto w-full max-w-7xl rounded-lg bg-white/95 p-10 shadow-md dark:bg-gray-800/95">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Community & Book Clubs</h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Join clubs, discuss books, and participate in challenges.</p>
      </section>
      
      {/* Create Post Form */}
      <section className="mx-auto w-full max-w-7xl rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
        <h3 className="text-2xl font-semibold text-gray-900 dark:border-gray-700 dark:text-white">Create a New Post</h3>
        <form onSubmit={handleSubmitPost} className="mt-4">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            rows="3"
            className="w-full rounded-md border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder={`What's on your mind, ${username}?`}
            required
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        </form>
      </section>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
          <h3 className="border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-900 dark:border-gray-700 dark:text-white">Hot Discussions</h3>
          <ul className="mt-4 divide-y dark:divide-gray-700">
            {communityPosts.map(post => (
              <li key={post.id} className="py-4">
                <p className="text-gray-800 dark:text-gray-200">{post.text}</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-blue-600 dark:text-blue-400">by {post.username}</span>
                  <span className="text-gray-500 dark:text-gray-400">{post.replies} replies</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
            <h3 className="border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-900 dark:border-gray-700 dark:text-white">Book Clubs to Join</h3>
            <ul className="mt-4 space-y-3">
              {mockClubs.map(club => {
                const isJoined = joinedClubs.has(club.id);
                return (
                  <li key={club.id} className="flex items-center justify-between">
                    <span className="font-medium dark:text-white">{club.name}</span>
                    <button 
                      onClick={() => onJoinClub(club.id)}
                      className={`rounded-md px-3 py-1 text-xs text-white shadow-sm ${isJoined ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                      disabled={isJoined}
                    >
                      {isJoined ? 'Joined' : 'Join'}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
            <h3 className="border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-900 dark:border-gray-700 dark:text-white">Reading Challenges</h3>
            <ul className="mt-4 space-y-3">
              {mockChallenges.map(challenge => {
                const isJoined = joinedChallenges.has(challenge.id);
                return (
                  <li key={challenge.id} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium dark:text-white">{challenge.name}</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.desc}</p>
                    </div>
                    <button 
                      onClick={() => onJoinChallenge(challenge.id)}
                      className={`rounded-md px-3 py-1 text-xs text-white shadow-sm ${isJoined ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                      disabled={isJoined}
                    >
                      {isJoined ? 'Joined' : 'Join Challenge'}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}