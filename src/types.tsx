
export interface User {
    name:string,
    email:string,
}

export interface FacilityData {
    facility_name:string,
    facility_country:string
}


export interface PatientData {
    full_name:string,
    id:string,
    gender:"MALE" | "FEMALE",
    dob:string,
    telephone_number:string,
    age:string,
    facility:FacilityData
}

export interface VideoUploadData {
    id:string,
    signed_url:string,
    date_recorded:string,
    patient:PatientData,
    comment:string,
    doctor_status:"NEW" | "REOPENED" | "ARCHIVED",
    screener_status:"PENDING_INITIAL_REVIEW" | "REVIEWED" | "ARCHIVED"

}

export interface VideoUploadsQueryObject {
    all_video_uploads: VideoUploadData[]
}

export interface VideoUploadQueryObject {
    video_upload:VideoUploadData
}
