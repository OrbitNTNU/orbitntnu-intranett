import BreakLine from "@/components/General/Breakline";
import { Shortcut } from "@/components/HomePage/Shortcut";
import mockShortcuts from "@/mockdata/MockShortcuts";

export const Shortcuts = () => {

    return (
        <div>
            <h2 className="flex justify-center font-bold text-5xl">
                Shortcuts
            </h2>
            <BreakLine/>
            <div className="flex flex-row flex-wrap justify-center">
                {mockShortcuts.map((infoLink) => (
                    <Shortcut url={infoLink.url} header={infoLink.header} description={infoLink.description}/>
                ))}
            </div>
        </div>
    )
}