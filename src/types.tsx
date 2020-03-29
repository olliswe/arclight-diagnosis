export interface User {
  email: string;
  id: number;
}

export interface FacilityData {
  facility_name: string;
  facility_country: string;
}

export interface PatientData {
  full_name: string;
  id: number;
  gender: "MALE" | "FEMALE";
  dob: string;
  telephone_number: string;
  age: string;
  facility: FacilityData;
}

export interface VideoUploadData {
  id: number;
  signed_url: string;
  date_recorded: string;
  patient: PatientData;
  comment: string;
  doctor_status: "NEW" | "REOPENED" | "ARCHIVED";
  screener_status: "PENDING_INITIAL_REVIEW" | "REVIEWED" | "ARCHIVED";
  doctor_comments: DoctorCommentData[];
  screener_comments: ScreenerCommentData[];
}

export interface VideoUploadsQueryObject {
  all_video_uploads: VideoUploadData[];
}

export interface VideoUploadQueryObject {
  video_upload: VideoUploadData;
}

export interface DoctorCommentData {
  comment: string;
  date_added: string;
  physician: User;
  type?: "doctor";
}

export interface ScreenerCommentData {
  comment: string;
  date_added: string;
  screener: User;
  type?: "screener";
}
