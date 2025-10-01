import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';


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
    age:number|null;
    height:number|null;
    weight:number|null;
    box:string|null;
}

export type BaseUser = {
  email: string;
  fullname: string;
  avatarUrl: File | null;
};

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

export type benchMarkUserType = BaseUser & {
    benchmarkMovements:BenchmarkMovement[];
}

export type wodsMarkUserType = BaseUser & {
  wods: wodsUserType[];    
}

export type wodsUserType = {
  id: number;
  wod_name: string;
  wod_protocol: string | null;
  wod_description: string | null;
  wod_score: string | null;
  wod_time: string | null;
  wod_date: string | null;
  created_at: string | null;
  updated_at: string | null;
  wod_user_id: number;
};


export type FlashPropsType = {
  flash?: { title?: string; message?: string };
  errors?: Record<string, string>;
};


type HeaderPropsType = {
  user: string;
  avatarUrl?: string; 
};

//Competition
export type CompetitionType = {
  id: number;
  name:string;
  date:Date;
  place:string;
  box_name: string;
  img: File | null;
  organizer_id: number;
  description:string|null;
  status: string;
  participants:number;
  type:string|null;
  fee:number;
  competition_start_date:Date;
  competition_finish_date:Date|null;
}

export type CategoriesType = {
  id:number;
  category_name:string;
  category_genre:string;
}
export type CompetitionRegisterDataType  = {
  email:string;
  fullname:string;
  avatarUrl: File | null;
  categories: CategoriesType[];
}