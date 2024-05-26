import { Shortcut } from "@/components/HomePage/Shortcut";
import mockShortcuts from "@/mockdata/MockShortcuts";

export const Shortcuts = () => {

    return (
        <div>
            <h2 className="flex font-bold text-5xl mb-4">
                Shortcuts
            </h2>
            <div className="flex flex-col justify-center gap-4 ">
                {/* Display each group of shortcuts */}
                {mockShortcuts.map((shortcutGroup) => (
                    <div key={shortcutGroup.type}>
                        <h2 className="flex flex-row justify-center">{shortcutGroup.type}</h2>
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