export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "seller" | "admin" | "user";
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface NavigationState {
  isMobileMenuOpen: boolean;
  activeItem: string | null;
}

export interface UIState {
  theme: "light" | "dark";
  sidebarOpen: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sellerId: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface Seller {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  gstNumber?: string;
  panNumber: string;
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  };
  status: "active" | "suspended" | "pending";
  createdAt: string;
}
