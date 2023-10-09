import { Shortcut } from "@/components/Shortcut";
import { ShortcutLink } from "@/interfaces/ShortcutLink";
import mockShortcuts from "@/mockdata/MockShortcuts";

interface ShortcutsProps {
    info: ShortcutLink[];
}

export const Shortcuts = () => {

    return (
        <div>
            <h2 className="flex justify-center font-bold text-5xl">
                Shortcuts
            </h2>
            <hr className="border-t-4 border-accentColorTwo my-2"/>
            <div className="flex flex-row flex-wrap justify-center">
                {mockShortcuts.map((infoLink) => (
                    <Shortcut url={infoLink.url} header={infoLink.header} description={infoLink.description}/>
                ))}
            </div>
        </div>
    )
}