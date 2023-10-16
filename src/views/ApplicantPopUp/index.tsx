import Applicant from "@/interfaces/Applicant"

interface PopUp {
    applicant: Applicant | null,
    closePopUpFunction: any
}

const ApplicantPopUp = ({applicant, closePopUpFunction}: PopUp) => {

    return (
        <div>
            <div onClick={() => closePopUpFunction()} className="fixed inset-0 bg-black opacity-40"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                flex flex-col justify-center bg-secondaryColorTwo text-white m-4 p-4 rounded-lg shadow-lg gap-4">
                <button onClick={() => closePopUpFunction()} className="w-[15px] text-lg absolute top-4 right-6 ">
                    x
                </button>
                <div className="mx-10 my-6">
                    <h2 className="font-medium -mx-4">
                        {applicant ? applicant.fullName : false}
                    </h2>
                    <p>
                        {applicant ? applicant.fieldOfStudy : false}, {applicant ? applicant.yearOfStudy : false}. year
                    </p>
                    <div>
                        <p className="font-bold pt-4 -mx-4">
                            Experience
                        </p>
                        <p>
                            {applicant ? applicant.experience : false}
                        </p>
                    </div>
                    <div>
                        <p className="font-bold pt-4 -mx-4">
                            About me
                        </p>
                        <p>
                            {applicant ? applicant.aboutYou : false}
                        </p>
                    </div>
                    <div>
                        <p className="font-bold pt-4 -mx-4">
                            Contact information
                        </p>
                        <p>
                            {applicant ? applicant.email : false}
                        </p>
                        <p>
                            {applicant ? applicant.phoneNumber : false}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplicantPopUp;