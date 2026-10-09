'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  TellerChannel,
  Resource,
  ActiveView,
} from '@/types';
import {
  INITIAL_USERS,
  INITIAL_CHANNELS,
  INITIAL_RESOURCES,
} from '@/data/seedData';

interface AppContextType {
  currentUser: User | null;
  channels: TellerChannel[];
  resources: Resource[];
  savedResourceIds: string[];
  favouriteChannelIds: string[];
  viewingHistory: { resourceId: string; viewedAt: string }[];
  activeView: ActiveView;
  selectedResourceId: string | null;
  selectedChannelId: string | null;
  searchQuery: string;
  selectedSubject: string | null;
  selectedType: 'all' | 'video' | 'pdf';
  sortBy: 'newest' | 'views' | 'favourites';
  authInitialTab: 'login' | 'signup';
  authInitialRole: UserRole;
  backendModalOpen: boolean;

  // Actions
  login: (email: string, password?: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string, role: UserRole) => { success: boolean; error?: string };
  logout: () => void;
  switchRole: (role: UserRole) => void;
  quickLogin: (userId: string) => void;

  // Channel & Resources
  getUserChannel: () => TellerChannel | undefined;
  updateChannel: (updated: Partial<TellerChannel>) => void;
  addResource: (newRes: Omit<Resource, 'id' | 'channelId' | 'tellerId' | 'tellerName' | 'tellerAvatar' | 'views' | 'favouritesCount' | 'createdAt'>) => Resource;
  updateResource: (id: string, updated: Partial<Resource>) => void;
  deleteResource: (id: string) => void;

  // Learner Interactions
  toggleSaveResource: (resourceId: string) => void;
  isResourceSaved: (resourceId: string) => boolean;
  toggleFavouriteChannel: (channelId: string) => void;
  isChannelFavourited: (channelId: string) => boolean;
  recordView: (resourceId: string) => void;

  // Navigation
  navigateTo: (view: ActiveView, options?: {
    resourceId?: string;
    channelId?: string;
    subject?: string | null;
    search?: string;
    type?: 'all' | 'video' | 'pdf';
    authTab?: 'login' | 'signup';
    authRole?: UserRole;
  }) => void;
  setSearchQuery: (q: string) => void;
  setSelectedSubject: (s: string | null) => void;
  setSelectedType: (t: 'all' | 'video' | 'pdf') => void;
  setSortBy: (sb: 'newest' | 'views' | 'favourites') => void;
  setBackendModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'smartlearn_current_user_v2';
const STORAGE_KEY_RESOURCES = 'smartlearn_resources_v2';
const STORAGE_KEY_CHANNELS = 'smartlearn_channels_v2';
const STORAGE_KEY_SAVED = 'smartlearn_saved_resources_v2';
const STORAGE_KEY_FAV_CHANNELS = 'smartlearn_fav_channels_v2';
const STORAGE_KEY_HISTORY = 'smartlearn_history_v2';

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Navigation & filter state
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'video' | 'pdf'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'views' | 'favourites'>('newest');
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'signup'>('login');
  const [authInitialRole, setAuthInitialRole] = useState<UserRole>('learner');
  const [backendModalOpen, setBackendModalOpen] = useState<boolean>(false);

  // Data state with client-side localStorage fallback
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [channels, setChannels] = useState<TellerChannel[]>(() => {
    if (typeof window === 'undefined') return INITIAL_CHANNELS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CHANNELS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_CHANNELS;
  });
  const [resources, setResources] = useState<Resource[]>(() => {
    if (typeof window === 'undefined') return INITIAL_RESOURCES;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_RESOURCES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_RESOURCES;
  });
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['res-1', 'res-3'];
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SAVED);
      return stored ? JSON.parse(stored) : ['res-1', 'res-3'];
    } catch {
      return ['res-1', 'res-3'];
    }
  });
  const [favouriteChannelIds, setFavouriteChannelIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['channel-1', 'channel-2'];
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FAV_CHANNELS);
      return stored ? JSON.parse(stored) : ['channel-1', 'channel-2'];
    } catch {
      return ['channel-1', 'channel-2'];
    }
  });
  const [viewingHistory, setViewingHistory] = useState<{ resourceId: string; viewedAt: string }[]>(() => {
    if (typeof window === 'undefined') {
      return [
        { resourceId: 'res-1', viewedAt: '2025-03-20T14:00:00Z' },
        { resourceId: 'res-4', viewedAt: '2025-03-19T09:30:00Z' },
      ];
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
      return stored
        ? JSON.parse(stored)
        : [
            { resourceId: 'res-1', viewedAt: '2025-03-20T14:00:00Z' },
            { resourceId: 'res-4', viewedAt: '2025-03-19T09:30:00Z' },
          ];
    } catch {
      return [
        { resourceId: 'res-1', viewedAt: '2025-03-20T14:00:00Z' },
        { resourceId: 'res-4', viewedAt: '2025-03-19T09:30:00Z' },
      ];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESOURCES, JSON.stringify(resources));
    } catch {}
  }, [resources]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHANNELS, JSON.stringify(channels));
    } catch {}
  }, [channels]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedResourceIds));
    } catch {}
  }, [savedResourceIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAV_CHANNELS, JSON.stringify(favouriteChannelIds));
    } catch {}
  }, [favouriteChannelIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(viewingHistory));
    } catch {}
  }, [viewingHistory]);

  // Auth actions
  const login = (email: string, password?: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (!existing) {
      return { success: false, error: 'No account found with this email. Please check your spelling or sign up.' };
    }
    setCurrentUser(existing);
    if (existing.role === 'teller') {
      setActiveView('teller-dashboard');
    } else {
      setActiveView('learner-dashboard');
    }
    return { success: true };
  };

  const register = (name: string, email: string, password: string, role: UserRole) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!name.trim()) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      return { success: false, error: 'Please provide a valid college or personal email address.' };
    }
    if (password && password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }
    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please log in.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      role,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80`,
      joinedAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);

    // If registered as a teller, ensure an initial channel is created
    if (role === 'teller') {
      const newChannel: TellerChannel = {
        id: `channel-${Date.now()}`,
        userId: newUser.id,
        name: `${newUser.name}'s Study Channel`,
        handle: `@${newUser.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        avatar: newUser.avatar,
        bio: 'Welcome to my SmartLearn channel! I share lecture notes, study summaries and explanations.',
        university: 'University Campus',
        subjects: ['Programming', 'Data Structures'],
        followerCount: 0,
        totalViews: 0,
        resourceCount: 0,
      };
      setChannels((prev) => [newChannel, ...prev]);
      setActiveView('teller-dashboard');
    } else {
      setActiveView('learner-dashboard');
    }

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('home');
  };

  const switchRole = (newRole: UserRole) => {
    if (!currentUser) return;
    const updatedUser: User = { ...currentUser, role: newRole };
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));

    if (newRole === 'teller') {
      // Check if user already has a channel
      const existingChannel = channels.find((c) => c.userId === updatedUser.id);
      if (!existingChannel) {
        const newChannel: TellerChannel = {
          id: `channel-${Date.now()}`,
          userId: updatedUser.id,
          name: `${updatedUser.name}'s Channel`,
          handle: `@${updatedUser.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
          avatar: updatedUser.avatar,
          bio: 'Study channel for sharing notes and educational videos.',
          university: updatedUser.university || 'Campus Department',
          subjects: ['Programming'],
          followerCount: 0,
          totalViews: 0,
          resourceCount: 0,
        };
        setChannels((prev) => [newChannel, ...prev]);
      }
      setActiveView('teller-dashboard');
    } else {
      setActiveView('learner-dashboard');
    }
  };

  const quickLogin = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUser(target);
      if (target.role === 'teller') {
        setActiveView('teller-dashboard');
      } else {
        setActiveView('learner-dashboard');
      }
    }
  };

  const getUserChannel = () => {
    if (!currentUser) return undefined;
    return channels.find((c) => c.userId === currentUser.id);
  };

  const updateChannel = (updated: Partial<TellerChannel>) => {
    if (!currentUser) return;
    setChannels((prev) =>
      prev.map((c) => {
        if (c.userId === currentUser.id) {
          return { ...c, ...updated };
        }
        return c;
      })
    );
  };

  const addResource = (
    newResData: Omit<
      Resource,
      'id' | 'channelId' | 'tellerId' | 'tellerName' | 'tellerAvatar' | 'views' | 'favouritesCount' | 'createdAt'
    >
  ): Resource => {
    const userChannel = getUserChannel();
    const channelId = userChannel ? userChannel.id : 'channel-1';
    const tellerName = currentUser ? currentUser.name : 'Student Teller';
    const tellerAvatar = currentUser ? currentUser.avatar : '';
    const tellerId = currentUser ? currentUser.id : 'unknown';

    const newResource: Resource = {
      ...newResData,
      id: `res-${Date.now()}`,
      channelId,
      tellerId,
      tellerName,
      tellerAvatar,
      views: 1,
      favouritesCount: 0,
      createdAt: new Date().toISOString(),
    };

    setResources((prev) => [newResource, ...prev]);

    // Update channel resource count
    if (userChannel) {
      setChannels((prev) =>
        prev.map((c) => (c.id === userChannel.id ? { ...c, resourceCount: c.resourceCount + 1 } : c))
      );
    }

    return newResource;
  };

  const updateResource = (id: string, updated: Partial<Resource>) => {
    setResources((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return { ...r, ...updated, updatedAt: new Date().toISOString() };
        }
        return r;
      })
    );
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    // Clean up from saved and history
    setSavedResourceIds((prev) => prev.filter((sId) => sId !== id));
    setViewingHistory((prev) => prev.filter((h) => h.resourceId !== id));
    // Decrement channel count if owned
    const userChannel = getUserChannel();
    if (userChannel) {
      setChannels((prev) =>
        prev.map((c) => (c.id === userChannel.id ? { ...c, resourceCount: Math.max(0, c.resourceCount - 1) } : c))
      );
    }
  };

  const toggleSaveResource = (resourceId: string) => {
    setSavedResourceIds((prev) => {
      const isSaved = prev.includes(resourceId);
      if (isSaved) {
        return prev.filter((id) => id !== resourceId);
      } else {
        return [resourceId, ...prev];
      }
    });

    // Also update favouritesCount on resource
    setResources((prev) =>
      prev.map((r) => {
        if (r.id === resourceId) {
          const wasSaved = savedResourceIds.includes(resourceId);
          return {
            ...r,
            favouritesCount: wasSaved ? Math.max(0, r.favouritesCount - 1) : r.favouritesCount + 1,
          };
        }
        return r;
      })
    );
  };

  const isResourceSaved = (resourceId: string) => {
    return savedResourceIds.includes(resourceId);
  };

  const toggleFavouriteChannel = (channelId: string) => {
    setFavouriteChannelIds((prev) => {
      const isFav = prev.includes(channelId);
      let nextFavs: string[];
      if (isFav) {
        nextFavs = prev.filter((id) => id !== channelId);
      } else {
        nextFavs = [channelId, ...prev];
      }

      // Update channel's follower count
      setChannels((cList) =>
        cList.map((ch) => {
          if (ch.id === channelId) {
            return {
              ...ch,
              followerCount: isFav ? Math.max(0, ch.followerCount - 1) : ch.followerCount + 1,
            };
          }
          return ch;
        })
      );

      return nextFavs;
    });
  };

  const isChannelFavourited = (channelId: string) => {
    return favouriteChannelIds.includes(channelId);
  };

  const recordView = (resourceId: string) => {
    // Increment view count on resource
    setResources((prev) =>
      prev.map((r) => {
        if (r.id === resourceId) {
          return { ...r, views: r.views + 1 };
        }
        return r;
      })
    );

    // Increment total views on the author's channel
    const resource = resources.find((r) => r.id === resourceId);
    if (resource) {
      setChannels((prev) =>
        prev.map((c) => {
          if (c.id === resource.channelId) {
            return { ...c, totalViews: c.totalViews + 1 };
          }
          return c;
        })
      );
    }

    // Record in viewing history (deduplicated to top)
    setViewingHistory((prev) => [
      { resourceId, viewedAt: new Date().toISOString() },
      ...prev.filter((h) => h.resourceId !== resourceId),
    ]);
  };

  const navigateTo = (
    view: ActiveView,
    options?: {
      resourceId?: string;
      channelId?: string;
      subject?: string | null;
      search?: string;
      type?: 'all' | 'video' | 'pdf';
      authTab?: 'login' | 'signup';
      authRole?: UserRole;
    }
  ) => {
    if (options?.resourceId !== undefined) {
      setSelectedResourceId(options.resourceId);
      if (options.resourceId) {
        recordView(options.resourceId);
      }
    }
    if (options?.channelId !== undefined) {
      setSelectedChannelId(options.channelId);
    }
    if (options?.subject !== undefined) {
      setSelectedSubject(options.subject);
    }
    if (options?.search !== undefined) {
      setSearchQuery(options.search);
    }
    if (options?.type !== undefined) {
      setSelectedType(options.type);
    }
    if (options?.authTab !== undefined) {
      setAuthInitialTab(options.authTab);
    }
    if (options?.authRole !== undefined) {
      setAuthInitialRole(options.authRole);
    }

    setActiveView(view);
    // Smooth scroll to top when changing views
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        channels,
        resources,
        savedResourceIds,
        favouriteChannelIds,
        viewingHistory,
        activeView,
        selectedResourceId,
        selectedChannelId,
        searchQuery,
        selectedSubject,
        selectedType,
        sortBy,
        authInitialTab,
        authInitialRole,
        backendModalOpen,
        login,
        register,
        logout,
        switchRole,
        quickLogin,
        getUserChannel,
        updateChannel,
        addResource,
        updateResource,
        deleteResource,
        toggleSaveResource,
        isResourceSaved,
        toggleFavouriteChannel,
        isChannelFavourited,
        recordView,
        navigateTo,
        setSearchQuery,
        setSelectedSubject,
        setSelectedType,
        setSortBy,
        setBackendModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
