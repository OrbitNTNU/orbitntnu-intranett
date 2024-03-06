import { type AppAndTeams } from "@/pages/applications";
import { api } from "@/utils/api";
import PopupButton from "./PopupButton";
import PopupInfoSection from "./PopupInfoSection";
import { type Application, type ApplyForTeam } from "@prisma/client";
import Icons from "@/components/General/Icons";

interface PopUp {
    app: AppAndTeams | null,
    appType: AppType | null,
    closePopUpFunction: () => void,
}

export enum AppType {
    UNHANDLED,
    INTERVIEW,
    ACCEPTED,
    DISMISSED,
}

const ApplicantPopUp = ({app, appType, closePopUpFunction}: PopUp) => {
    
    // Find client team
    const teamIdData = api.applications.clientTeamID.useQuery();
    const clientTeamID = teamIdData.data;
    
    // Map teamID to team names
    const teams = api.applications.teamIDAndNames.useQuery();
    const teamNamesData = teams.data;
    const teamNames: Record<number, string> = {};
    if (teamNamesData !== undefined) {
        for (const teamName of teamNamesData) {
            teamNames[teamName.teamID] = teamName.teamName;
        };
    };

    // Find interview if it exists
    let interview = null;
    if (app && appType == AppType.INTERVIEW) {
        const findInt = api.applications.findInterview.useQuery({appID: app.applicant.applicationID});
        interview = findInt.data;
    }

    // Strike team name if not interested anymore
    interface interest {
        team: ApplyForTeam,
        text: string,
    }
    function checkInterest ({team, text}: interest) {
        if (team.interested) {
            return text;
        } else {
            return text.split("").map(char => char + '\u0336').join("");
        }
    }
    
    // For enumerating the team priority list
    let num = 0;


    /** SET UP INTERVIEW */
    const newInterview = api.applications.postInterview.useMutation();
    function setInterview (appID: number) {
        newInterview.mutate({appID});
    }

    /**
     * DELETE INTERVIEW
     * (To be deleted later. Present for easy testing)
     */
    const deleteInterview = api.applications.deleteInterview.useMutation();
    function delInterview (appID: number) {
        deleteInterview.mutate({appID});
    }


    /** ACCEPT APPLICANT */
    const accept = api.applications.postAcceptApplication.useMutation();
    function handleAccept (appID: number) {
        accept.mutate({appID});
    };

    /**
     * UNACCEPT APPLICANT
     * (To be deleted later. Present for easy testing)
    */
    const unAcceptRouter = api.applications.unAccept.useMutation();
    function unaccept (appID: number) {
        unAcceptRouter.mutate({appID});
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center text-black">
            <div onClick={() => closePopUpFunction()} className="absolute w-full h-full bg-black opacity-40"></div>
            <div className="relative w-[90%] h-[90%] bg-[#FDF4E3] flex flex-col rounded-lg justify-center items-center">
                <button onClick={() => closePopUpFunction()}
                    className="absolute flex justify-center w-[45px] h-[45px] text-4xl font-medium top-2 right-4 md:top-4 md:right-8 rounded-lg hover:bg-[#EDE4D3]"
                >
                    <Icons name="Cross"/>
                </button>

                {/* PopUp content */}
                <div className="flex md:flex-row flex-wrap justify-around h-[85%] w-full">

                    {/* Info about applicant */}
                    {app && 
                    <section className="mx-10 max-w-[60%] h-full flex flex-col gap-8 overflow-x-auto">
                        <h2 className="font-medium">
                            {app ? app.applicant.name : false}
                        </h2>
                        <PopupInfoSection
                            title="Study"
                            info={app.applicant.fieldOfStudy + ", " + app.applicant.yearOfStudy + ". year"}
                        />
                        <PopupInfoSection
                            title="Experience"
                            info={app.applicant.experience}
                        />
                        <PopupInfoSection
                            title="About me"
                            info={app.applicant.aboutYou}
                        />
                        <PopupInfoSection
                            title="Contact information"
                            info={app.applicant.email + "\n" + app.applicant.phoneNumber}
                        />
                        {teamNames &&
                        <PopupInfoSection
                            title="Priorities"
                            info={app.teams.map(team => {
                                num += 1;
                                return checkInterest({
                                    team: team,
                                    text: num + ". " + teamNames[team.teamID]
                                });
                            }).join("\n")}
                        />
                        }
                    </section>
                    }

                    {/* Info about interview */}
                    {interview &&
                        <section className="flex flex-col gap-8">
                            <h2 className="font-medium">Interview info</h2>
                            <PopupInfoSection
                                title="Room"
                                info={interview.room}
                            />
                            <PopupInfoSection
                                title="Date"
                                info={interview.time.toDateString()}
                            />
                            <PopupInfoSection
                                title="Time"
                                info={interview.time.toLocaleTimeString()}
                            />
                        </section>
                    }

                    {/* <div className="border-r-2 h-full border-primaryColor"></div> */}

                    {/* Functionality */}
                    {app && clientTeamID == app?.teams[0]?.teamID ?
                        <section className="flex flex-col justify-center text-3xl ">
                            {appType == AppType.UNHANDLED && 
                                <PopupButton onClick={() => setInterview(app.applicant.applicationID)}>
                                    Interview
                                </PopupButton>
                            }
                            {appType !== AppType.DISMISSED && appType !== AppType.ACCEPTED &&
                                <>
                                    <PopupButton onClick={() => alert("Unimplemented")}>
                                        Dismiss
                                    </PopupButton>
                                    <PopupButton onClick={() => handleAccept(app.applicant.applicationID)}>
                                        Accept
                                    </PopupButton>
                                </>
                            }
                            {appType == AppType.INTERVIEW &&
                                <PopupButton onClick={() => delInterview(app.applicant.applicationID)}>
                                    Delete interview
                                </PopupButton>
                            }
                            {appType == AppType.DISMISSED &&
                                <PopupButton onClick={() => alert("Unimplemented")}>
                                    Undismiss
                                </PopupButton>
                            }
                            {appType == AppType.ACCEPTED &&
                                <PopupButton onClick={() => unaccept(app.applicant.applicationID)}>
                                    Unaccept
                                </PopupButton>
                            }
                        </section>
                        :
                        <p className="flex flex-col justify-center max-w-[30%] text-center text-wrap text-2xl">
                            {"You don't have access to this applicant."}
                        </p>
                    }

                </div>

            </div>
        </div>
    );
}

export default ApplicantPopUp;