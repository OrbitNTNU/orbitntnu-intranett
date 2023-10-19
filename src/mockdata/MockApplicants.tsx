import Applicant from "@/interfaces/Applicant";

const MockApplicants: Applicant[] = [
    {
        applicationID: 1,
        fullName: "Hanne Marie Haakaas",
        ntnuUsername: "hannmhaa",
        email: "hanne.haakaas@gmail.com",
        phoneNumber: "90095630",
        fieldOfStudy: "Datateknologi",
        yearOfStudy: 2,
        experience: "Hei! Jeg kan ingenting, så my experience er null haha rip",
        aboutYou: "Jeg er en bonde fra østfold som legger trøkk på første stavelsen.",
        accepted: false,
        keep: false,
        rejectTime: new Date(),
    },
    {
        applicationID: 2,
        fullName: "Jens Nikolai Haakaas",
        ntnuUsername: "jensemann",
        email: "jens.haakaas@gmail.com",
        phoneNumber: "11223344",
        fieldOfStudy: "IT og Informasjonssystemer",
        yearOfStudy: 1,
        experience: "Hei! Min experience er at jeg er megaproff.",
        aboutYou: "Jeg er broren til Hanne.",
        accepted: false,
        keep: false,
        rejectTime: new Date(),
    },
    {
        applicationID: 3,
        fullName: "Ada Lovelace",
        ntnuUsername: "adaaa",
        email: "ada.lovelace@gmail.com",
        phoneNumber: "12345678",
        fieldOfStudy: "Influencer",
        yearOfStudy: 4,
        experience: "Google me.",
        aboutYou: "You should know who I am.",
        accepted: false,
        keep: false,
        rejectTime: new Date(),
    },
    {
        applicationID: 4,
        fullName: "Charles Babbage",
        ntnuUsername: "charlie",
        email: "charles.babbage@gmail.com",
        phoneNumber: "13243546",
        fieldOfStudy: "Mathematics",
        yearOfStudy: 5,
        experience: "I basically invented the computer.",
        aboutYou: "I am British. Do you need to know more?",
        accepted: false,
        keep: false,
        rejectTime: new Date(),
    },
    {
        applicationID: 5,
        fullName: "Alan Turing",
        ntnuUsername: "theMachine",
        email: "alan.turing@gmail.com",
        phoneNumber: "31415926",
        fieldOfStudy: "Cryptography",
        yearOfStudy: 2,
        experience: "I beat the enigma!",
        aboutYou: `I'm smart. Lorem ipsum dolor sit amet, mea eu illum ridens possim, meliore efficiendi sea id. Ludus maiorum efficiendi ea mei. 
            At stet ludus solet sit, zril denique sit an, possim perfecto posidonium usu ex. An tantas prodesset eam, usu nulla noster instructior ad, 
            ne dolore delicata sea. Cu eligendi neglegentur pri, pro fugit primis placerat ne. Iisque noluisse constituto et quo. Per ea unum harum, 
            eu tale impetus perfecto qui, eu essent impedit per. Te mel sale euripidis forensibus, ad accusam insolens per. Aperiri eruditi in quo. 
            Duo prompta mediocrem at, no exerci ubique duo.Id sonet mollis eos, ad case quando lobortis duo. Ne aliquam civibus partiendo eos, eos 
            solet assueverit te. Ad enim olor deleniti eum, ad perpetua consequat sit, vis saepe scripserit eu. Eam wisi reque eu, vis ei quis vocibus 
            probatus. Scaevola intellegebat ea vix.Qui cu eros efficiendi. Per utamur scaevola dissentiunt no, vocent vocibus inciderint ad vel. Vel 
            te aeque scriptorem, vis cu partiendo democritum constituto. Eum cu tantas argumentum, case tacimates incorrupte in sea. Est harum utamur 
            fabulas ut, qui justo evertitur consectetuer ex. Id dolores omnesque ius, quando decore tritani vim ad. Voluptua definiebas his at, ad graeci 
            fabulas mei. Ius paulo apeirian insolens ut. Quo in esse volumus, ut pri assum concludaturque, his enim necessitatibus no. Error virtute 
            euripidis ad vix. Et omnesque inimicus eum, vim habeo facilisi et. Est modo ignota at, ad error munere nec, est te numquam hendrerit.`,
        accepted: false,
        keep: false,
        rejectTime: new Date(),
    },
]

export default MockApplicants;