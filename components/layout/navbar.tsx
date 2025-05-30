'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Rocket, User, LogOut, Settings } from 'lucide-react';
import { signOutAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarClientProps {
  user?: any;
  profile?: any;
  hasEnvVars?: boolean;
}

const NavbarClient = ({ user, profile, hasEnvVars = true }: NavbarClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About NASA' },
    { href: '/daily-facts', label: 'Daily Facts' },
    { href: '/missions', label: 'Missions' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' }
  ];

  const handleSignOut = async () => {
    try {
      await signOutAction();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const renderAuthSection = () => {
    if (!hasEnvVars) {
      return (
        <div className="flex gap-2 items-center">
          <Badge variant="destructive" className="hidden md:block text-xs">
            Setup Required
          </Badge>
          <Button
            size="sm"
            variant="outline"
            disabled
            className="opacity-75 cursor-not-allowed text-gray-400 border-gray-600"
          >
            Sign in
          </Button>
        </div>
      );
    }

    return user ? (
      <div className="flex items-center gap-2 md:gap-4">
        {/* User greeting - hidden on mobile */}
        <span className="hidden md:block text-gray-300 text-sm">
          Hey, {profile?.username || user.email?.split('@')[0]}!
        </span>

        {/* User avatar/initial */}
        <div className="flex items-center">
          {profile?.profile_url ? (
            <img 
              src={profile.profile_url} 
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-blue-400"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
              {profile?.username 
                ? profile.username.charAt(0).toUpperCase()
                : user.email?.charAt(0).toUpperCase()
              }
            </div>
          )}
        </div>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-gray-700 p-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 bg-gray-800 border-gray-700 text-gray-100"
          >
            <DropdownMenuLabel className="text-gray-300">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            
            <DropdownMenuItem asChild>
              <Link 
                href="/profile" 
                className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            {profile?.status === "admin" && (
              <DropdownMenuItem asChild>
                <Link 
                  href="/admin/dashboard"
                  className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
                >
                  <Settings className="h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator className="bg-gray-700" />
            
            <DropdownMenuItem>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ) : (
      <div className="flex gap-2">
        <Button asChild size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700">
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-black/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-200"
          >
            <Rocket className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              NASA Facts
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            {renderAuthSection()}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Auth - Show only avatar or sign in button */}
            <div className="md:hidden">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      {profile?.profile_url ? (
                        <img 
                          src={profile.profile_url} 
                          alt="Profile"
                          className="w-8 h-8 rounded-full border-2 border-blue-400"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                          {profile?.username 
                            ? profile.username.charAt(0).toUpperCase()
                            : user.email?.charAt(0).toUpperCase()
                          }
                        </div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700 text-gray-100">
                    <DropdownMenuLabel className="text-gray-300">
                      {profile?.username || user.email?.split('@')[0]}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="text-gray-300 hover:text-white">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {profile?.status === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard" className="text-gray-300 hover:text-white">
                          <Settings className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center text-red-400 hover:text-red-300 w-full text-left"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600 p-2 rounded-md transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md border-t border-gray-700">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform ${
                isMenuOpen 
                  ? 'translate-y-0 opacity-100' 
                  : '-translate-y-2 opacity-0'
              }`}
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[-1] md:hidden"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default NavbarClient;