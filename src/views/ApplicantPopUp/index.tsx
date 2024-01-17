import Applicant from "@/interfaces/Applicant"

interface PopUp {
    applicant: Applicant | null,
    closePopUpFunction: any
}

const ApplicantPopUp = ({applicant, closePopUpFunction}: PopUp) => {

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div onClick={() => closePopUpFunction()} className="absolute w-full h-full bg-black opacity-40"></div>
            <div className="relative w-[90%] h-[90%] bg-secondaryColorTwo flex flex-col rounded-lg">
                <button onClick={() => closePopUpFunction()}
                className="flex align-middle justify-center w-[45px] h-[45px] text-4xl font-medium absolute top-2 right-4 md:top-4 md:right-8 rounded-lg hover:bg-[#372F48]">
                    x
                </button>

                {/* PopUp content */}
                <div className="flex md:flex-row flex-wrap justify-around items-center w-[90%] h-[85%]">

                    {/* Info about applicant */}
                    <div className="my-10 mx-10 w-[60%] h-full overflow-x-auto">
                        <h2 className="font-medium">
                            {applicant ? applicant.fullName : false}
                        </h2>
                        <p className="ml-4">
                            {applicant ? applicant.fieldOfStudy : false}, {applicant ? applicant.yearOfStudy : false}. year
                        </p>
                        <div>
                            <p className="font-bold pt-4">
                                Experience
                            </p>
                            <p className="ml-4">
                                {applicant ? applicant.experience : false}
                            </p>
                        </div>
                        <div>
                            <p className="font-bold pt-4">
                                About me
                            </p>
                            <p className="ml-4">
                                {applicant ? applicant.aboutYou : false}
                            </p>
                        </div>
                        <div>
                            <p className="font-bold pt-4">
                                Contact information
                            </p>
                            <div className="ml-4">
                                <p>
                                    {applicant ? applicant.email : false}
                                </p>
                                <p>
                                    {applicant ? applicant.phoneNumber : false}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-r-2 h-full border-primaryColor"></div>

                    {/* Functionality */}
                    <div className="flex flex-col justify-center text-center">
                        <button className="m-4 p-4 rounded-lg bg-primaryColor text-xl hover:bg-[#120b21]">
                            Interview
                        </button>
                        <button className="m-4 p-4 rounded-lg bg-primaryColor text-xl hover:bg-[#120b21]">
                            Dismiss
                        </button>
                        <button className="m-4 p-4 rounded-lg bg-primaryColor text-xl hover:bg-[#120b21]">
                            Accept
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ApplicantPopUp;