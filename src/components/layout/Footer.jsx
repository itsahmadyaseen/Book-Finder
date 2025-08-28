import {
  BookOpen,
  Github,
  Linkedin,
  Code,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

// Footer Component
export const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-100 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="space-y-6 sm:space-y-8">
        {/* Main Footer Content */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">BookFinder</span>
          </div>

          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Search millions of books from the Open Library collection. Find your
            next great read with advanced search and filtering options.
          </p>
        </div>

        {/* Developer Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Developed by Ahmad Yaseen
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">Full Stack Developer</p>
            </div>

            {/* Contact Info - Mobile Stack, Desktop Row */}
            <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:gap-6 text-xs sm:text-sm">
              <a
                href="mailto:itsahmadyaseen@gmail.com"
                className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 hover:text-indigo-600 transition-colors group py-2 sm:py-0"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="break-all">itsahmadyaseen@gmail.com</span>
              </a>

              <a
                href="tel:+918936839071"
                className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 hover:text-indigo-600 transition-colors group py-2 sm:py-0"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>+91 8936839071</span>
              </a>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 py-2 sm:py-0">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>

            {/* Professional Links - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md mx-auto sm:max-w-none sm:flex sm:items-center sm:justify-center sm:gap-3 lg:gap-4">
              <a
                href="https://github.com/itsahmadyaseen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-gray-900 text-white rounded-lg sm:rounded-xl hover:bg-gray-800 transition-all duration-200 hover:scale-105 group text-sm font-medium"
              >
                <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/ahmad-yaseen-b64b80238/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all duration-200 hover:scale-105 group text-sm font-medium"
              >
                <Linkedin className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://leetcode.com/u/ahmadyaseen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-orange-500 text-white rounded-lg sm:rounded-xl hover:bg-orange-600 transition-all duration-200 hover:scale-105 group text-sm font-medium"
              >
                <Code className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>LeetCode</span>
              </a>
            </div>

            {/* Skills/Tech Stack - Responsive Pills */}
            <div className="pt-3 sm:pt-4 border-t border-gray-100 space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm text-gray-500">Built with</p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <span className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100 whitespace-nowrap">
                  React
                </span>
                <span className="px-2 sm:px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-medium rounded-full border border-cyan-100 whitespace-nowrap">
                  Tailwind CSS
                </span>
                <span className="px-2 sm:px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full border border-yellow-100 whitespace-nowrap">
                  JavaScript
                </span>
                <span className="px-2 sm:px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100 whitespace-nowrap">
                  Open Library API
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section - Mobile Stack, Desktop Row */}
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 sm:pt-6 border-t border-gray-200 text-xs sm:text-sm text-gray-500">
          <div className="text-center sm:text-left">
            <a
              href="https://openlibrary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition-colors"
            >
              Data from Open Library
            </a>
          </div>

          <div className="text-center sm:text-right space-y-1 sm:space-y-0">
            <p>Made with ❤️ in India</p>
            <p className="text-xs text-gray-400">© 2024 BookFinder - Ahmad Yaseen</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);