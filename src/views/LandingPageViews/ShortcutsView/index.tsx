import { Shortcut } from "@/components/HomePage/Shortcut";
import mockShortcuts from "@/mockdata/MockShortcuts";

export const Shortcuts = () => {

    return (
        <div>
            <h2 className="flex justify-center font-bold text-5xl mb-4">
                Shortcuts
            </h2>
            <div className="flex flex-row flex-wrap justify-center">
                {mockShortcuts.map((infoLink) => (
                    <Shortcut key={infoLink.header} url={infoLink.url} header={infoLink.header} description={infoLink.description}/>
                ))}
            </div>
        </div>
    )
}