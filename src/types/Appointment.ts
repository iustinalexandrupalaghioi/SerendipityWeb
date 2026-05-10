import type { Service } from "./Service";
import type { Profile } from "./User";

export const APPOINTMENT_STATUSES = [
  "pending",
  "accepted",
  "confirmed",
  "declined",
  "completed",
  "cancelled",
  "expired",
  "no_show",
] as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export type Appointment = {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  service_id: string;
  date: string;
  start_time: string;
  end_time: string;
  duration: number;
  price: number;
  advance_payment: number;
  advance_payment_paid: boolean;
  status: AppointmentStatus;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  customerName: string;
  profile?: Profile;
  service: Service;
};
