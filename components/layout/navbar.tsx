// components/layout/navbar-client-auth.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, Rocket, User, LogOut, Settings, Heart } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOutAction } from '@/app/actions';

// Type definitions
interface User {
  id: string;
  email?: string;
  [key: string]: any;
}

interface Profile {
  id: string;
  username?: string;
  profile_url?: string;
  status?: string;
  birthdate?: string;
  [key: string]: any;
}

const NavbarClientAuth: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authState, setAuthState] = useState<number>(0); // Add this line to track auth state changes

  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getUser = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Get current user
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
      
      console.log('NavbarAuth: Current user:', currentUser ? 'Found' : 'None', userError);
      
      if (currentUser) {
        setUser(currentUser);
        
        // Get profile
        const { data: profileData, error: profileError } = await supabase
          .from('profile')
          .select('*')
          .eq('id', currentUser.id)
          .single();
          
        console.log('NavbarAuth: Profile data:', profileData ? 'Found' : 'None', profileError);
        
        if (profileData) {
          setProfile(profileData);
        }
      }
    } catch (error) {
      console.error('NavbarAuth: Client auth error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('NavbarAuth: Auth state changed:', event, session?.user ? 'User logged in' : 'No user');

      if (session?.user) {
        setUser(session.user);
        
        // Get profile for new user
        const { data: profileData } = await supabase
          .from('profile')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profileData) {
          setProfile(profileData);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [getUser]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      closeMenu();
      signOutAction();
      setAuthState(prev => prev + 1); // Increment to trigger re-render
    } catch (error) {
      console.error('NavbarAuth: Sign out error:', error);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About NASA' },
    { href: '/daily-facts', label: 'Daily Facts' },
    { href: '/gallery', label: 'Gallery' },
  ];

  // Add authState to dependency array to ensure re-render when auth state changes
  useEffect(() => {
    // This effect will run whenever authState changes
  }, [authState]);

  const renderAuthSection = () => {
    if (isLoading) {
      return (
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
        </div>
      );
    }

    return user ? (
      <div className="flex items-center gap-2 md:gap-4">
        {/* User avatar/initial dengan dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center hover:opacity-80 transition-opacity">
              {profile?.profile_url ? (
                <img 
                  src={profile.profile_url} 
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-primary object-cover cursor-pointer"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
                  {profile?.username 
                    ? profile.username.charAt(0).toUpperCase()
                    : user.email?.charAt(0).toUpperCase()
                  }
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56"
          >
            <DropdownMenuLabel>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link 
                href="/profile" 
                className="flex items-center gap-2 cursor-pointer"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            {profile?.status === "admin" && (
              <DropdownMenuItem asChild>
                <Link 
                  href="/admin/dashboard"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild>
              <Link 
                href="/wishlist" 
                className="flex items-center gap-2 cursor-pointer"
              >
                <Heart className="h-4 w-4" />
                Wishlist
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            
            <DropdownMenuItem>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 text-destructive hover:text-destructive/80 w-full text-left"
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
        <Button asChild size="sm" variant="outline">
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' 
        : 'bg-background/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-200"
          >
            <Rocket className="h-8 w-8 text-primary" />
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
                  className="text-muted-foreground hover:text-foreground hover:bg-accent px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            {renderAuthSection()}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Auth */}
            <div className="md:hidden">
              {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      {profile?.profile_url ? (
                        <img 
                          src={profile.profile_url} 
                          alt="Profile"
                          className="w-8 h-8 rounded-full border-2 border-primary object-cover"
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
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      {profile?.username || user.email?.split('@')[0]}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {profile?.status === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard">
                          <Settings className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center text-destructive hover:text-destructive/80 w-full text-left"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild size="sm">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              )}
            </div>

            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-border">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`text-muted-foreground hover:text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform ${
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
          className="fixed inset-0 bg-background/50 z-[-1] md:hidden"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default NavbarClientAuth;