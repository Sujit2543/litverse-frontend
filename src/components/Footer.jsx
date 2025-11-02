import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa"; // ✅ Compatible import for all react-icons versions

export default function Footer({ useBlinkingBg, onToggleBg }) {
  return (
    <footer className="w-full py-10 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-6">
        {/* === Top Section === */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {/* --- About --- */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">
              📖 About LitVerse
            </h3>
            <p className="text-sm leading-relaxed">
              LitVerse is your personalized online library — read, listen, and
              track your reading journey anytime, anywhere. Discover, learn, and
              grow with books that inspire.
            </p>
          </div>

          {/* --- Quick Links --- */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">
              🔗 Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-indigo-500">Home</a>
              </li>
              <li>
                <a href="/library" className="hover:text-indigo-500">Library</a>
              </li>
              <li>
                <a href="/wishlist" className="hover:text-indigo-500">Wishlist</a>
              </li>
              <li>
                <a href="/community" className="hover:text-indigo-500">Community</a>
              </li>
              <li>
                <a href="/profile" className="hover:text-indigo-500">Profile</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-indigo-500">Contact</a>
              </li>
            </ul>
          </div>

          {/* --- Contact Info --- */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">
              📬 Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{" "}
                <a
                  href="mailto:info@litverse.com"
                  className="hover:text-indigo-500"
                >
                  info@litverse.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+919876543210"
                  className="hover:text-indigo-500"
                >
                  +91 98765 43210
                </a>
              </li>
              <li>Location: Pune, India</li>
            </ul>
          </div>

          {/* --- Preferences + Social Media --- */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">
              ⚙️ Preferences
            </h3>
            <div className="flex items-center mb-4">
              <label className="mr-2 text-sm">Safe Background</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={useBlinkingBg}
                  onChange={onToggleBg}
                />
                <span className="slider"></span>
              </label>
              <span className="ml-2 text-xs text-red-500">
                Blinking (Epilepsy Warning!)
              </span>
            </div>

            <div className="flex space-x-4 mt-6 text-2xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <FaFacebook />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700 dark:hover:text-white"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* === Bottom Section === */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <strong>LitVerse Online Library</strong>. All rights reserved.
          </p>
          <p className="mt-2 text-xs">
            Designed with ❤️ by{" "}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-500"
            >
              Sujit Kumar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
