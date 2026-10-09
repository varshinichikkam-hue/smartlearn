'use client';

import React from 'react';
import { TellerChannel } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  Heart,
  Eye,
  BookOpen,
  ArrowRight,
  School,
  Sparkles,
} from 'lucide-react';

interface TellerCardProps {
  channel: TellerChannel;
}

export function TellerCard({ channel }: TellerCardProps) {
  const {
    navigateTo,
    isChannelFavourited,
    toggleFavouriteChannel,
  } = useApp();

  const isFav = isChannelFavourited(channel.id);

  const handleCardClick = () => {
    navigateTo('channel-detail', { channelId: channel.id });
  };

  const handleFavToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavouriteChannel(channel.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-purple-300 hover:shadow-lg transition-all p-6 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Header: Avatar, Names, Favourite Action */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={channel.avatar}
              alt={channel.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-100 group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-tight">
                {channel.name}
              </h3>
              <p className="text-xs font-medium text-purple-600 mt-0.5">{channel.handle}</p>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                <School className="w-3 h-3 text-slate-400" />
                <span className="truncate max-w-[170px]">{channel.university}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFavToggle}
            title={isFav ? 'Unfavourite Teller' : 'Favourite Teller'}
            className={`p-2.5 rounded-xl transition-all ${
              isFav
                ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
                : 'bg-slate-50 text-slate-400 border border-slate-200 hover:text-rose-600 hover:bg-rose-50'
            }`}
            aria-label={isFav ? 'Remove from favourite tellers' : 'Add to favourite tellers'}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-rose-600' : ''}`} />
          </button>
        </div>

        {/* Channel Bio */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {channel.bio}
        </p>

        {/* Subjects tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {channel.subjects.map((sub) => (
            <span
              key={sub}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics & Channel Action */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 tabular-nums">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1" title="Published study resources">
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span>{channel.resourceCount} notes</span>
          </div>
          <div className="flex items-center gap-1" title="Followers / Favourited learners">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>{channel.followerCount.toLocaleString()}</span>
          </div>
        </div>

        <span className="font-semibold text-purple-600 group-hover:text-purple-700 flex items-center gap-1">
          <span>View Channel</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
}
