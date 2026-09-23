export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export type Review = {
  id: string;
  guest_name: string;
  room_type: string;
  rating: number;
  comment: string;
  language: 'uz' | 'ru' | 'en';
  status?: ReviewStatus;
  created_at: string;
};

export const roomTypes = ['standard', 'suite', 'president'] as const;

