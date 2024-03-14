import { Shortcut } from "@/components/HomePage/Shortcut";
import mockShortcuts from "@/mockdata/MockShortcuts";

export const Shortcuts = () => {

    return (
        <div>
            <h2 className="flex font-bold text-5xl mb-4">
                Shortcuts
            </h2>
            <div className="flex flex-col justify-center">

                {/* Display each group of shortcuts */}
                {mockShortcuts.map((shortcutGroup) => (
                    <div key={shortcutGroup.type}>
                        <h2>{shortcutGroup.type}</h2>
                        <div className="flex flex-row flex-wrap">
                            {shortcutGroup.shortcuts.map((infoLink) => (
                                <Shortcut key={infoLink.header} url={infoLink.url} header={infoLink.header} description={infoLink.description}/>
                            ))}
                        </div>                            
                    </div>
                ))}

            </div>
        </div>
    )
}