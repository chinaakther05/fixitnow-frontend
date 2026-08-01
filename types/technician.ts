export interface Category {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
}

export interface Service {
  id: string;
  title: string;
  price: number;
  category?: Category;
}

export interface TechnicianUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  profileImage: string | null;
  description?: string;
}

export interface Technician {
  id: string;
  bio: string | null;
  experience: number | null;
  skills: string[];
  hourlyRate: number | null;
  avgRating: number;
  totalReviews: number;
  user: TechnicianUser;
  services?: Service[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  customer: {
    id: string;
    name: string;
  };
}