import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Mic, Home, FileText, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                <Mic className="h-8 w-8" />
                <span className="font-bold text-xl tracking-tight">InterviewPro</span>
              </Link>
            </div>
            <nav className="flex gap-1 items-center">
              <Link to="/" className="flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium transition-colors">
                <Home className="h-4 w-4" /> Home
              </Link>

              {user ? (
                <>
                  <Link to="/context" className="flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium transition-colors">
                    <FileText className="h-4 w-4" /> Practice
                  </Link>
                  <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
                    <span className="text-sm font-medium text-slate-900 flex items-center gap-2">
                      <div className="bg-blue-100 p-1 rounded-full">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      {user.username}
                    </span>
                    <button
                      onClick={logout}
                      className="flex items-center gap-1 text-slate-500 hover:text-red-600 font-medium transition-colors text-sm"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4 ml-4">
                  <Link to="/login" className="mr-2 flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium transition-colors">
                    <LogIn className="h-4 w-4" /> Sign In
                  </Link>
                  <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors shadow-sm">
                    Get Started
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} InterviewPro. Powered by LiveKit.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
