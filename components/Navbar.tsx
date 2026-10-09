'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  GraduationCap,
  Search,
  Compass,
  BookOpen,
  Info,
  LayoutDashboard,
  LogOut,
  Upload,
  Bookmark,
  UserCheck,
  Menu,
  X,
  ChevronDown,
  Database,
} from 'lucide-react';

export function Navbar() {
  const {
    currentUser,
    activeView,
    navigateTo,
    logout,
    switchRole,
    setBackendModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element Brand mark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 text-left group transition-transform focus:outline-hidden"
              aria-label="SmartLearn Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
                  Smart<span className="text-blue-600">Learn</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-purple-600 -mt-1 hidden sm:block">
                  Peer Learning
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-5 single-line clean text nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => navigateTo('home')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 ${
                activeView === 'home' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('explore')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 ${
                activeView === 'explore' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => navigateTo('subjects')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 ${
                activeView === 'subjects' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Subjects
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 ${
                activeView === 'about' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              About
            </button>

            {currentUser && (
              <button
                onClick={() =>
                  navigateTo(currentUser.role === 'teller' ? 'teller-dashboard' : 'learner-dashboard')
                }
                className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 hover:text-blue-600 ${
                  activeView === 'teller-dashboard' || activeView === 'learner-dashboard'
                    ? 'text-blue-600 font-semibold'
                    : ''
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-purple-600" />
                <span>Dashboard</span>
              </button>
            )}
          </nav>

          {/* Zone 3: 1 Primary Action Area */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick link to Supabase/Backend architecture */}
            <button
              onClick={() => setBackendModalOpen(true)}
              title="View Backend & Database Setup"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-purple-700 bg-slate-50 hover:bg-purple-50 rounded-lg border border-slate-200 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-purple-600" />
              <span>Backend Docs</span>
            </button>

            {!currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('auth', { authTab: 'login' })}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigateTo('auth', { authTab: 'signup', authRole: 'learner' })}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs hover:shadow-sm transition-all whitespace-nowrap shrink-0"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-hidden"
                  aria-expanded={profileDropdownOpen}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/20"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[120px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[11px] font-medium text-purple-600 capitalize leading-tight">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <div className="mt-1 inline-flex items-center text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        Active Role: {currentUser.role === 'teller' ? 'Knowledge Teller' : 'Student Learner'}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigateTo(currentUser.role === 'teller' ? 'teller-dashboard' : 'learner-dashboard');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-600" />
                      <span>{currentUser.role === 'teller' ? 'Teller Studio' : 'Learner Hub'}</span>
                    </button>

                    {currentUser.role === 'teller' ? (
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          switchRole('learner');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                      >
                        <UserCheck className="w-4 h-4 text-indigo-600" />
                        <span>Switch to Learner View</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          switchRole('teller');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                      >
                        <Upload className="w-4 h-4 text-purple-600" />
                        <span>Switch to Teller Studio</span>
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in fade-in">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigateTo('home');
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Home
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigateTo('explore');
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Explore Resources
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigateTo('subjects');
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Subjects
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigateTo('about');
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            About & FAQ
          </button>

          {currentUser && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo(currentUser.role === 'teller' ? 'teller-dashboard' : 'learner-dashboard');
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{currentUser.role === 'teller' ? 'Teller Dashboard' : 'Learner Dashboard'}</span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setBackendModalOpen(true);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-purple-700 bg-purple-50 rounded-lg flex items-center gap-2"
            >
              <Database className="w-4 h-4" />
              <span>Backend Architecture & Schema</span>
            </button>

            {!currentUser ? (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('auth', { authTab: 'login' });
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('auth', { authTab: 'signup', authRole: 'learner' });
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-white bg-blue-600 rounded-lg"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2 text-center text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
