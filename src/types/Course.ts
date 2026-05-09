import type { Profile } from "./User";
export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type Course = {
  id: string;
  title: string;
  description: string;
  display_order: number;
  location: string;
  level: CourseLevel;
  price: number;
  advance_price: number;
  duration_days: number;
  image_url: string;
  image_path: string;
  available_spots: number;
  remaining_spots: number;
  is_open: boolean;
  course_day?: CourseDay[];
  course_session?: CourseSession[];
};

export type CourseDay = {
  id: string;
  course_id: string;
  day_number: number;
  title: string;
  image_url: string;
  image_path: string;
  course?: Course;
  course_day_activity?: CourseDayActivity[];
};

export type CourseDayActivity = {
  id: string;
  course_day_id: string;
  course_day?: CourseDay;
  activity: string;
};

export type EnrollmentStatus =
  | "submitted"
  | "confirmed"
  | "cancelled"
  | "completed";

export type Enrollment = {
  id: string;
  session_id: string;
  user_id: string;
  profile?: Profile;
  status: EnrollmentStatus;
  enrollment_date: string;
  course_date: string;
  price: number;
  payment_type: "deposit" | "full";
  advance_price: number;
  advance_payment_paid: boolean;
  course_session?: CourseSession;
};

export type CourseSession = {
  id: string;
  course_id: string;
  start_date: string;
  available_spots: number;
  remaining_spots: number;
  is_open: boolean;
  price: number;
  advance_price: number;
  course?: Course;
};
