import { LatLong } from "./globals";

export interface MessState extends Mess {
  loading: boolean | null;
  error: string | null;
}

export interface MessQrState extends MessQr {
  loading: boolean | null;
  error: string | null;
}

export interface Mess {
  id: number | null;
  name: string | null;
  location: LatLong | null;
  landmark: string | null;
  timings: MessTimings | null;
  rating: number | null;
  menu: MessMenu | null;
  image: string | null;
}

export interface MessTimings {
  breakfast: MealTimings | null;
  lunch: MealTimings | null;
  snacks: MealTimings | null;
  dinner: MealTimings | null;
}

export interface MealTimings {
  start: string | null;
  end: string | null;
}

export interface MessMenu {
  id: number;
  month: number;
  year: number;
  monday: DayMessMenu | null;
  tuesday: DayMessMenu | null;
  wednesday: DayMessMenu | null;
  thursday: DayMessMenu | null;
  friday: DayMessMenu | null;
  saturday: DayMessMenu | null;
  sunday: DayMessMenu | null;
}

export interface DayMessMenu {
  breakfast: MessMenuItem[] | null;
  lunch: MessMenuItem[] | null;
  snacks: MessMenuItem[] | null;
  dinner: MessMenuItem[] | null;
}

export interface MessMenuItem {
  id: number;
  name: string;
  description: string | null;
  rating: number | null;
  cal: number | null;
  image: string | null;
}

export interface MessQr {
  order_id: string | null;
  roll_no: string | null;
  name: string | null;
  email: string | null;
  password: string | null;
  mess_name: string | null;
}
