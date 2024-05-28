import BreakLine from "@/components/General/Breakline";
import { Shortcut } from "@/components/HomePage/Shortcut";
import mockShortcuts from "@/mockdata/MockShortcuts";

export const Shortcuts = () => {

    return (
        <div className="w-full p-4 rounded-2xl shadow-2xl">
            <span className="flex font-bold text-5xl my-2">
                Shotcuts
            </span>
            <BreakLine/>
            <div className="flex flex-col justify-center gap-4 mb-6 ">
                {/* Display each group of shortcuts */}
                {mockShortcuts.map((shortcutGroup) => (
                    <div key={shortcutGroup.type}>
                        <div className="flex flex-row flex-wrap justify-center">
                            {shortcutGroup.shortcuts.map((infoLink) => (
                                <Shortcut key={infoLink.header} type={shortcutGroup.type} shortcut={infoLink}/>
                            ))}
                        </div>                            
                    </div>
                ))}
            </div>
        </div>
    )
}