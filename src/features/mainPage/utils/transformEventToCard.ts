import { EventItem } from '@/features/eventsList/types';
import { getLabelFromPrice } from '@/utils/getLabelFromPrice';
import { renderAddress } from '@/utils/renderAdress';

export const transformEventToCard = (event: EventItem) => {
  const locationString = renderAddress(event.location);
  const priceString = getLabelFromPrice(event.price, event.currency);

  return {
    id: event.id,
    title: event.eventName,
    description: event.description || '',
    date: new Date(event.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    time: event.time,
    location: locationString,
    price: priceString,
    image: event.promoMedia?.url,
    attendees: event.attendees || 0,
    maxAttendees: event.maxAttendees || 0,
    instructor: event.organizer?.username || 'Unknown',
    tags: event.tags || [],
  };
};
