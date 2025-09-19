import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

// export interface Auth {
//     user: User;
// }

// export interface BreadcrumbItem {
//     title: string;
//     href: string;
// }

// export interface NavGroup {
//     title: string;
//     items: NavItem[];
// }

// export interface NavItem {
//     title: string;
//     href: NonNullable<InertiaLinkProps['href']>;
//     icon?: LucideIcon | null;
//     isActive?: boolean;
// }

// export interface SharedData {
//     name: string;
//     quote: { message: string; author: string };
//     auth: Auth;
//     sidebarOpen: boolean;
//     [key: string]: unknown;
// }

// export interface User {
//     id: number;
//     name: string;
//     email: string;
//     avatar?: string;
//     email_verified_at: string | null;
//     created_at: string;
//     updated_at: string;
//     [key: string]: unknown; // This allows for additional properties...
// }

export type resetPasswordForm = {
    email:string
}

export type profileUserType  = {
    email:string;
    fullname: string;
    password: string;
    password_confirmation: string;
    profile_image: File | null;
    phone: string | null;
    birthdate:Date|null;
    country: string | null;
    state:string|null;
    city:string|null;
    emergencyphone:string|null;
    gender:string|null;
}

export type BenchmarkMovement = {
  id: number;
  front_squat: number | null;
  overhead_squat: number | null;
  shoulder_press: number | null;
  push_press: number | null;
  push_jerk: number | null;
  deadlift: number | null;
  sumo_high_pull: number | null;
  power_clean: number | null;
  power_snatch: number | null;
  clean_and_jerk: number | null;
  snatch: number | null;
  created_at: string;
  updated_at: string;
  benchmark_user_id: number;
};

export type benchMarkUserType = {
    email:string;
    fullname:string;
    avatarUrl:File | null;
    benchmarkMovements:BenchmarkMovement[];
}