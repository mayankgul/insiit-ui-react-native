import { LatLong } from "./globals";

export interface OutletState {
  loading: boolean | null;
  error: string | null;
  outlets: Outlet[] | null;
}

export interface Outlet {
  id: number;
  name: string;
  location: LatLong | null;
  landmark: string | null;
  open_time: string | null;
  close_time: string | null;
  rating: number | null;
  menu: OutletMenuItem[] | null;
  image: string | null;
}

export interface OutletMenuItem {
  id: number;
  name: string;
  price: number;
  outlet_id: number;
  description: string | null;
  rating: number | null;
  size: string | null;
  cal: number | null;
  image: string | null;
}
