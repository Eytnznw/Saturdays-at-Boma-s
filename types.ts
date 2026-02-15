
// Types for the Shabbat Labuma application
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  RSVP = 'RSVP',
  GUESTS = 'GUESTS',
  MESSAGES = 'MESSAGES'
}

export interface Guest {
  id: string;
  name: string;
  count: number;
  dietaryNotes?: string;
  eventDate: string;
  timestamp: number;
}

export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}
