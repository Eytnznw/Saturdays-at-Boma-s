
export interface Guest {
  id: string;
  name: string;
  count: number;
  dietaryNotes?: string;
  eventDate: string; // YYYY-MM-DD format
  timestamp: number;
}

export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  RSVP = 'RSVP',
  GUESTS = 'GUESTS',
  MESSAGES = 'MESSAGES'
}
