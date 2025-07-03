import config from "../config";
import { prefix, KeyBinding, swapFromName, doJump, setMotion } from "./utils/Utils"
import { startMoving, stopMoving } from "./utils/AutoP5Utils";

const dragLocations = {
    purple: [56, 8, 126],
    red: [28, 6, 56],
    orange: [83, 6, 58],
    green: [28, 6, 91],
    blue: [83, 6, 97],
    middle: [54.5, 5, 76.5]
}

let moving = false;

export function pathfindDragon(drag) {
    if (!["Tank", "Healer"].includes(playerClass())) {
        ChatLib.chat(`${prefix} &7Pathfinding Disabled! &c(Invalid Class)`);
        return;
    }

    if (!config().AutoP5Debug) { ChatLib.chat(`${prefix} &7Moving Towards ` + drag`!`); }
    startMoving();
    moving = true;

    const pathfind = register("step", () => {
        const [x, z] = dragLocations[drag];

        if (getDistance(x, z) < 1.25) {
            if (!(drag == "middle")) {
                if (!config().AutoP5Debug) { ChatLib.chat(`${prefix} &7Motion: &b0&7, Pitch:&b-90`) }
                setMotion(0, 0);
                setPitch(-90);
            }
            swapFromName("last breath");
            stopMoving();
            moving = false;
            pathfind.unregister();
            return;
        }

        const block = Player.lookingAt();
        if (block instanceof Block) {
            if (!config().AutoP5Debug) { ChatLib.chat(`${prefix} &7Jumping!`) }
            doJump();
        }

        setYaw(calculateAngle(Player.getX(), Player.getZ(), x, z));
        setPitch(17)
    }).setFps(200)
}