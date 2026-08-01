export interface Booking {
  id: string;
  status: 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  scheduledDate: string;
  address: string;
  notes: string;
  totalAmount: number;
  technician: {
    id: string;
    name: string;
    email: string;
  };
  category?: {
    name: string;
  };
  payment?: {
    status: string;
  };
}


export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}

export interface Booking {
  id: string;
  status: 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  totalAmount: number;
  date: string;
  time: string;
  customer: Customer;
}