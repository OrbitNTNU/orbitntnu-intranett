import BreakLine from "@/components/General/Breakline";

const Welcome = () => {
    return (
        <div>
            <h2 className="flex font-bold text-5xl myt-2">
                Welcome!
            </h2>
            <h1 className="justify-center font text-xl text-align-left my-10">
                <p>This is the Orbit internal webpage, version 1.0.0.</p>
                <p>If you find any bugs, wish to suggest improvements, or have any feedback, feel free to contact us at orbit-web on Slack</p>
                <p>Enjoy :)</p>
            </h1>
            <BreakLine/>
        </div>
    )
}

export default Welcome;