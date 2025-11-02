import React, { useState } from 'react';

// 7f. BookReaderPage (UPDATED with Report Issue & Gemini Features)
export default function BookReaderPage({ book, onExit, callGemini, isGeminiLoading }) {
  const [pageNum, setPageNum] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [summary, setSummary] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: "Hi! Ask me anything about this chapter..." }
  ]);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const totalPages = 350; // Mock total
  const mockText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const handleReportSubmit = (e) => {
    e.preventDefault();
    console.log("Issue Reported:", reportText); // Real app would send this to a backend
    setReportText("");
    setReportModalOpen(false);
    alert("Report sent successfully! Thank you for your feedback."); // Simple alert for demo
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummary("");
    const systemPrompt = "You are a helpful reading assistant. Summarize the following book chapter in one or two concise paragraphs.";
    try {
      const result = await callGemini(systemPrompt, mockText);
      setSummary(result);
    } catch (error) {
      console.error("Error summarizing:", error);
      setSummary("Sorry, I couldn't generate a summary at this time.");
    }
    setIsSummarizing(false);
  };
  
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (chatInput.trim() === "") return;
  
    const newUserMessage = { sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, newUserMessage]);
    setChatInput("");
    setIsChatting(true);
  
    const systemPrompt = `You are an AI reading assistant. The user is reading the following chapter: "${mockText}". Answer the user's question based *only* on this text. If the answer isn't in the text, say so.`;
    try {
      const result = await callGemini(systemPrompt, chatInput);
      setChatMessages(prev => [...prev, { sender: 'ai', text: result }]);
    } catch (error) {
      console.error("Error chatting:", error);
      setChatMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I'm having trouble connecting." }]);
    }
    setIsChatting(false);
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Reader Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-y-2 rounded-lg bg-white/95 p-4 shadow-md dark:bg-gray-800/95">
        <div>
          <button onClick={onExit} className="rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            &larr; Back to Details
          </button>
          <h2 className="ml-4 inline-block text-xl font-bold text-gray-900 dark:text-white">{book.title}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm dark:text-gray-300">Font:</label>
          <button onClick={() => setFontSize(s => Math.max(10, s - 1))} className="rounded-md border px-2 py-0.5 dark:border-gray-600 dark:text-white">-</button>
          <span className="text-sm dark:text-gray-300">{fontSize}px</span>
          <button onClick={() => setFontSize(s => Math.min(32, s + 1))} className="rounded-md border px-2 py-0.5 dark:border-gray-600 dark:text-white">+</button>
          <button 
            onClick={() => setReportModalOpen(true)}
            className="ml-4 rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
          >
            Report an Issue
          </button>
        </div>
      </div>

      {/* Reader Content */}
      <div className="relative rounded-lg bg-white/95 p-8 shadow-lg dark:bg-gray-800/95">
        {/* Mock Learning Tools & AI */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button 
            onClick={handleSummarize}
            disabled={isSummarizing || isGeminiLoading}
            className="rounded-md bg-blue-600 px-3 py-1 text-xs text-white shadow-sm hover:bg-blue-700 disabled:opacity-50" 
            title="AI Summarize"
          >
            {isSummarizing ? 'Summarizing...' : '✨ Summarize'}
          </button>
          <button className="rounded-md bg-green-600 px-3 py-1 text-xs text-white shadow-sm hover:bg-green-700" title="Dictionary (Mock)">Dictionary</button>
          <button className="rounded-md bg-indigo-600 px-3 py-1 text-xs text-white shadow-sm hover:bg-indigo-700" onClick={() => setAiChatOpen(o => !o)} title="AI Assistant">
            {aiChatOpen ? 'Close Chat' : '✨ AI Chat'}
          </button>
        </div>
        
        {/* Book Text */}
        <div className="mt-8 mb-12 min-h-[60vh] overflow-y-auto">
          <p className="text-gray-800 dark:text-gray-200" style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}>
            <strong>Page {pageNum}</strong><br/><br/>
            {mockText}
            <br/><br/>
            {mockText.split('').reverse().join('')}
          </p>
        </div>

        {/* AI Summary Display */}
        {isSummarizing && (
          <div className="my-4 text-center text-gray-700 dark:text-gray-300">Generating summary...</div>
        )}
        {summary && (
          <div className="my-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/50">
            <h4 className="font-bold text-blue-800 dark:text-blue-200">✨ Chapter Summary</h4>
            <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">{summary}</p>
          </div>
        )}

        {/* AI Chat Window (Mock) */}
        {aiChatOpen && (
          <div className="absolute bottom-16 right-4 z-10 w-72 rounded-lg border border-gray-300 bg-white p-3 shadow-xl dark:border-gray-600 dark:bg-gray-900">
            <p className="text-sm font-semibold dark:text-white">AI Reading Assistant</p>
            <div className="mt-2 h-48 space-y-2 overflow-y-auto border-b border-gray-200 pb-2 dark:border-gray-700">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`text-xs ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block rounded-lg px-2 py-1 ${msg.sender === 'user' ? 'bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-100' : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'}`}>
                    {msg.text}
                  </span>
                </div>
              ))}
              {isChatting && <div className="text-left text-xs text-gray-500">AI is typing...</div>}
            </div>
            <form onSubmit={handleChatSubmit} className="mt-2 flex">
              <input 
                type="text" 
                placeholder="Ask here..." 
                className="flex-grow rounded-l-md border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isChatting || isGeminiLoading}
              />
              <button type="submit" className="rounded-r-md bg-indigo-600 px-2 text-xs text-white hover:bg-indigo-700 disabled:opacity-50" disabled={isChatting || isGeminiLoading}>
                Send
              </button>
            </form>
          </div>
        )}

        {/* Page Navigation */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
          <button onClick={() => setPageNum(p => Math.max(1, p - 1))} className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            Previous Page
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {pageNum} of {totalPages} (Tracking Progress...)
          </span>
          <button onClick={() => setPageNum(p => Math.min(totalPages, p + 1))} className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            Next Page
          </button>
        </div>
      </div>

      {/* Report Issue Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Report an Issue</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Found a typo or an error in the book? Let us know!</p>
            <form onSubmit={handleReportSubmit} className="mt-4">
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                rows="4"
                className="w-full rounded-md border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Describe the issue..."
                required
              ></textarea>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}