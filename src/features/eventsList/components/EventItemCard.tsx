import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  Star,
  Calendar,
  MapPin,
  Users,
  Share2,
  UserPlus,
  ExternalLink,
  Copy,
  Facebook,
  Twitter,
  Banknote,
} from "lucide-react";

interface EventItemCardProps {
  id: number;
  title: string;
  description?: string;
  date: string;
  time: string;
  location: string;
  image: string;
  price: string;
  attendees?: number;
  maxAttendees?: number;
  difficulty?: string;
  tags?: string[];
  rating?: number;
  organizer?: string;
}

export const EventItemCard: React.FC<EventItemCardProps> = ({
  id,
  title,
  description,
  date,
  time,
  location,
  image,
  price,
  attendees = 0,
  maxAttendees = 100,
  difficulty,
  tags = [],
  rating,
  organizer,
}) => {
  const { t } = useTranslation();
  
  // State management for user interactions
  const [isInterested, setIsInterested] = useState(false);
  const [interestedRole, setInterestedRole] = useState<'leader' | 'follower' | null>(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [participatingRole, setParticipatingRole] = useState<'leader' | 'follower' | null>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [interestedMenuOpen, setInterestedMenuOpen] = useState(false);
  const [participateMenuOpen, setParticipateMenuOpen] = useState(false);

  // Handler functions for user actions
  const handleInterested = (role: 'leader' | 'follower') => {
    if (isInterested && interestedRole === role) {
      // If clicking the same role, remove interest
      setIsInterested(false);
      setInterestedRole(null);
    } else {
      // Set or change role
      setIsInterested(true);
      setInterestedRole(role);
    }
    setInterestedMenuOpen(false);
    // TODO: Implement API call to save interested status
    console.log(`Event ${id} interested as ${role}: ${!(isInterested && interestedRole === role)}`);
  };

  const handleParticipate = (role: 'leader' | 'follower') => {
    if (isParticipating && participatingRole === role) {
      // If clicking the same role, remove participation
      setIsParticipating(false);
      setParticipatingRole(null);
    } else {
      // Set or change role
      setIsParticipating(true);
      setParticipatingRole(role);
    }
    setParticipateMenuOpen(false);
    // TODO: Implement API call to register/unregister for event
    console.log(`Event ${id} participating as ${role}: ${!(isParticipating && participatingRole === role)}`);
  };

  const handleShare = (platform?: string) => {
    const eventUrl = `${window.location.origin}/events/${id}`;
    const shareText = `Check out this dance event: ${title}`;
    
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(eventUrl)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(eventUrl);
      // TODO: Show toast notification that link was copied
      console.log('Event link copied to clipboard');
    } else {
      // Generic share using Web Share API if available
      if (navigator.share) {
        navigator.share({
          title: title,
          text: shareText,
          url: eventUrl,
        });
      } else {
        // Fallback to copying link
        navigator.clipboard.writeText(eventUrl);
        console.log('Event link copied to clipboard');
      }
    }
  };

  const handleViewEvent = () => {
    // TODO: Navigate to event detail page
    console.log(`Navigating to event ${id} details`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-violet-200/50 dark:border-violet-700/50">
      <CardContent className="p-0">
        {/* Desktop Horizontal Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Event Image */}
          <div className="relative w-full md:w-64 h-48 md:h-40 shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            {difficulty && (
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-white/90 text-gray-800">
                  {difficulty}
                </Badge>
              </div>
            )}
            {rating && (
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{rating}</span>
              </div>
            )}
          </div>

          {/* Event Content */}
          <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
                    {title}
                  </h3>
                  {organizer && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t('eventCard.by')} {organizer}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {description}
                </p>
              )}

              {/* Event Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{date} {t('eventCard.at')} {time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{attendees}/{maxAttendees} {t('eventCard.attending')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Banknote className="w-4 h-4" />
                  <span className="font-semibold">{price}</span>
                </div>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {/* Mobile: Stacked Layout with Individual Role Buttons */}
              <div className="flex flex-col gap-3 md:hidden">
                {/* Interested Section - Mobile */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{t('eventCard.interested')}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleInterested('leader')}
                      className={`flex-1 ${
                        isInterested && interestedRole === 'leader'
                          ? 'bg-rose-100 text-rose-700 border-rose-300'
                          : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      <span className="mr-1">🕺</span>
                      Leader
                      {isInterested && interestedRole === 'leader' && (
                        <Heart className="w-3 h-3 ml-1 fill-current" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleInterested('follower')}
                      className={`flex-1 ${
                        isInterested && interestedRole === 'follower'
                          ? 'bg-rose-100 text-rose-700 border-rose-300'
                          : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      <span className="mr-1">💃</span>
                      Follower
                      {isInterested && interestedRole === 'follower' && (
                        <Heart className="w-3 h-3 ml-1 fill-current" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Participate Section - Mobile */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{t('eventCard.joinEvent')}</p>
                  <div className="flex gap-2">
                    <Button
                      variant={isParticipating && participatingRole === 'leader' ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleParticipate('leader')}
                      className={`flex-1 ${
                        isParticipating && participatingRole === 'leader' 
                          ? 'bg-violet-600 hover:bg-violet-700 text-white' 
                          : 'hover:bg-violet-50 hover:border-violet-300'
                      }`}
                    >
                      <span className="mr-1">🕺</span>
                      Leader
                      {isParticipating && participatingRole === 'leader' && (
                        <UserPlus className="w-3 h-3 ml-1" />
                      )}
                    </Button>
                    <Button
                      variant={isParticipating && participatingRole === 'follower' ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleParticipate('follower')}
                      className={`flex-1 ${
                        isParticipating && participatingRole === 'follower' 
                          ? 'bg-violet-600 hover:bg-violet-700 text-white' 
                          : 'hover:bg-violet-50 hover:border-violet-300'
                      }`}
                    >
                      <span className="mr-1">💃</span>
                      Follower
                      {isParticipating && participatingRole === 'follower' && (
                        <UserPlus className="w-3 h-3 ml-1" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Action Buttons Row - Mobile */}
                <div className="flex justify-between items-center pt-2">
                  <DropdownMenu open={shareMenuOpen} onOpenChange={setShareMenuOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-9">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem onClick={() => handleShare('copy')}>
                        <Copy className="w-4 h-4 mr-2" />
                        {t('eventCard.shareOptions.copyLink')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare('facebook')}>
                        <Facebook className="w-4 h-4 mr-2" />
                        Share on Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare('twitter')}>
                        <Twitter className="w-4 h-4 mr-2" />
                        Share on Twitter
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button onClick={handleViewEvent} size="sm" className="h-9">
                    {t('eventCard.viewDetails')}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Desktop: Original Dropdown Layout */}
              <div className="hidden md:flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Interested/Favorite Button with Role Selection */}
                  <DropdownMenu open={interestedMenuOpen} onOpenChange={setInterestedMenuOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${
                          isInterested
                            ? 'text-rose-600 hover:text-rose-700'
                            : 'text-gray-600 hover:text-rose-600'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 mr-1 ${
                            isInterested ? 'fill-current' : ''
                          }`}
                        />
                        {isInterested ? `Interested (${interestedRole})` : 'Interest'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
                      <DropdownMenuItem 
                        onClick={() => handleInterested('leader')}
                        className={interestedRole === 'leader' ? 'bg-rose-50 text-rose-700' : ''}
                      >
                        <span className="mr-2">🕺</span>
                        As Leader
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleInterested('follower')}
                        className={interestedRole === 'follower' ? 'bg-rose-50 text-rose-700' : ''}
                      >
                        <span className="mr-2">💃</span>
                        As Follower
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Participate Button with Role Selection */}
                  <DropdownMenu open={participateMenuOpen} onOpenChange={setParticipateMenuOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={isParticipating ? "default" : "outline"}
                        size="sm"
                        className={isParticipating ? 'bg-violet-600 hover:bg-violet-700' : ''}
                      >
                        <UserPlus className="w-4 h-4 mr-1" />
                        {isParticipating ? `Participating (${participatingRole})` : 'Join Event'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
                      <DropdownMenuItem 
                        onClick={() => handleParticipate('leader')}
                        className={participatingRole === 'leader' ? 'bg-violet-50 text-violet-700' : ''}
                      >
                        <span className="mr-2">🕺</span>
                        As Leader
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleParticipate('follower')}
                        className={participatingRole === 'follower' ? 'bg-violet-50 text-violet-700' : ''}
                      >
                        <span className="mr-2">💃</span>
                        As Follower
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

              <div className="flex items-center gap-2">
                {/* Share Menu */}
                <DropdownMenu open={shareMenuOpen} onOpenChange={setShareMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleShare('copy')}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('facebook')}>
                      <Facebook className="w-4 h-4 mr-2" />
                      Share on Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('twitter')}>
                      <Twitter className="w-4 h-4 mr-2" />
                      Share on Twitter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* View Event Button */}
                <Button onClick={handleViewEvent} size="sm">
                  View Details
                  <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </CardContent>
    </Card>
  );
};
