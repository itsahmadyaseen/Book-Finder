import { BookOpen, Mail, Phone } from "lucide-react";

// Header Component
export const Header = () => (
  <header className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            BookFinder
          </h1>
        </div>

        {/* Desktop Contact Info */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="text-sm text-gray-600">
            Built by{" "}
            <span className="font-semibold text-indigo-600">Ahmad Yaseen</span>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-gray-500">Full Stack Developer</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <a 
              href="mailto:your.email@example.com" 
              className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline">itsahmadyaseen@gmail.com</span>
            </a>
            
            <a 
              href="tel:+1234567890" 
              className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors group"
            >
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline">+91 8936839071</span>
            </a>
          </div>
        </div>

        {/* Mobile/Tablet Simplified */}
        <div className="flex lg:hidden items-center gap-3">
          <div className="text-sm text-gray-600 hidden sm:block">
            Built by{" "}
            <span className="font-semibold text-indigo-600">Ahmad Yaseen</span>
          </div>
          
          <div className="flex items-center gap-2">
            <a 
              href="mailto:your.email@example.com" 
              className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              href="tel:+1234567890" 
              className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
);