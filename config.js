import Settings from "../Amaterasu/core/Settings";
import DefaultConfig from "../Amaterasu/core/DefaultConfig";
import { prefix } from "./features/utils/Utils";

const PepiConfig = new DefaultConfig("Pepi", "data/settings.json")

PepiConfig
/* Pepi | Toggle */
.addSwitch({
    category: "Pepi",
    subcategory: "Toggle",
    configName: "PepiEnabled",
    title: "Toggle Pepi",
    description: "",
})

.addSwitch({
    category: "Pepi",
    subcategory: "Toggle",
    configName: "DebugMode",
    title: "Debug Mode",
    description: "Recommended when configging",
    shouldShow: data => data.PepiEnabled,
})

.addSwitch({
    category: "Pepi",
    subcategory: "Toggle",
    configName: "RenderRingThroughWall",
    title: "Render Rings Through Walls",
    description: "",
    shouldShow: data => data.PepiEnabled,
})

.addSwitch({
    category: "Pepi",
    subcategory: "Toggle",
    configName: "DisableRingRendering",
    title: "Disable Ring Rendering",
    description: "Disables rings from rendering, to give a clean look. Might help you hide routes or whatever",
    shouldShow: data => data.PepiEnabled,
})

.addButton({
    category: "Pepi",
    subcategory: "Toggle",
    configName: "PepiCommands",
    title: "Pepi Commands",
    description: "Pepi is mostly configured by using commands, click the button to see all available commands",
    shouldShow: data => data.PepiEnabled,
    onClick(){
        let pepiCommands = [
            `&8&m${ChatLib.getChatBreak(" ")}`,
            `${prefix} &c&l- &7&lHelp`,
            `&f&lAll examples of routes:`,
            `&c/pepi add rotate <yaw> <pitch> <stopmotion> <radius> &8- &7Rotates to specified yaw pitch with optional stopmotion`,
            `&c/pepi add jump <radius> &8- &7Jumps!`,
            `&c/pepi add hclip <yaw> <radius> &8- &7HClips in the specified direction`,
            `&c/pepi add command <command> &8- &7Executes a command`,
            `&c/pepi add stop <yaw> <pitch> <center> <radius> &8- &7Stops movement and rotates to specified yaw and pitch, optionally centering yourself in the middle of the block`,
            ``,
            `&f&lCommands:`,
            `&7/center &8- &7Centers you on the block you are standing on`,
            `&7/pepi em &8- &7Toggles editmode, disables rings so they don't annoy you while configging`,
            `&7/pepi exactmode &8- &7Toggles exactmode, rings will be placed in the middle of the block you're standing on`,
            `&7/pepi currentroute &8- &7Says your current selected route`,
            `&7/pepi createroute <name> &8- &7Creates a new route`,
            `&7/pepi deleteroute <name> &8- &7Deletes the specified route`,
            `&7/pepi switchroute <name> &8- &7Switches to the specified route`,
            ``,
            `&7I'd recommend using stopmotion on rotates for chains of\n&7movement, and in no other situations\n&7Also, for example 0.5 radius covers 1 block`,
            `&8&m${ChatLib.getChatBreak(" ")}`
        ]
        ChatLib.chat(pepiCommands.join("\n"))
    }
})

/* Pepi | Triggerbot */
.addSwitch({
    category: "Pepi",
    subcategory: "Triggerbot",
    configName: "BonzoTriggerbot",
    title: "Bonzo Triggerbot",
    description: "Automatically right clicks bonzo staff when holding it and looking at Bricks, Sandstone, or Red Sandstone",
})

/* Leap | Fast Leap */
.addSwitch({
    category: "Leap",
    subcategory: "Fast Leap",
    configName: "FastLeapEnabled",
    title: "Toggle Terminal Fast Leap",
    description: "",
})

.addTextInput({
    category: "Leap",
    subcategory: "Fast Leap",
    configName: "S1Leap",
    title: "S1 Leap",
    description: "",
    shouldShow: data => data.FastLeapEnabled,
})

.addTextInput({
    category: "Leap",
    subcategory: "Fast Leap",
    configName: "S2Leap",
    title: "S2 Leap",
    description: "",
    shouldShow: data => data.FastLeapEnabled,
})

.addTextInput({
    category: "Leap",
    subcategory: "Fast Leap",
    configName: "S3Leap",
    title: "S3 Leap",
    description: "",
    shouldShow: data => data.FastLeapEnabled,
})

.addTextInput({
    category: "Leap",
    subcategory: "Fast Leap",
    configName: "S4Leap",
    title: "S4 Leap",
    description: "",
    shouldShow: data => data.FastLeapEnabled,
})

const config = new Settings("Pepi", PepiConfig, "data/ColorScheme.json", "§8§l[§c§lPepi§8§l] §7§lBy §f§lSnowyy & Alaricat")
.setPos(15, 15)
.setSize(70, 70)
.apply()
export default () => config.settings