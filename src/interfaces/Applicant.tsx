interface Applicant {
    applicationID: number,
    fullName: String,
    ntnuUsername: String,
    email: String,
    phoneNumber: String,
    fieldOfStudy: String,
    yearOfStudy: number,
    experience: String,
    aboutYou: String,
    accepted: boolean,
    keep: boolean,
    rejectTime: Date,
}

export default Applicant;