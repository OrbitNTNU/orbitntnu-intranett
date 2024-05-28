import BreakLine from "@/components/General/Breakline";

const Welcome = () => {
    return (
        <>
            <div className="rounded-2xl shadow-gray-900 shadow-2xl p-4 gap-4">
                <span className="flex font-bold text-5xl my-2">
                    Welcome!
                </span>
                <BreakLine />
                <span className="justify-center font text-xl text-align-left">
                    <p>This is the Orbit internal webpage.</p>
                    <p>If you find any bugs, wish to suggest improvements, or have any feedback, feel free to contact us at orbit-web on Slack</p>
                    <p>Enjoy :)</p>
                </span>
            </div>
        </>

    )
}

export default Welcome;