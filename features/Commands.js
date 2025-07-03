import routeHandler from "./utils/CyilinderUtils";
import { calcFloorPos, prefix } from "./utils/Utils";
import { getLeap } from "./FastLeap";
import config from "../config";

register("command", () => {
   if (Player.getZ() < 0) Player.getPlayer().func_70107_b(calcFloorPos(Player.getX(), 5), Player.getY(), calcFloorPos(Player.getZ(), 5));
   if (Player.getZ() > 0) Player.getPlayer().func_70107_b(calcFloorPos(Player.getX(), 5), Player.getY(), calcFloorPos(Player.getZ(), 5));
}).setName("center")


register("command", () => { ChatLib.chat(`${prefix} &aLeap: ` + config().PositionalFastLeap) }).setName("GetTermLeap");
register("command", () => { ChatLib.chat(`${prefix} &aS1Leap: ${config().S1Leap}`) }).setName("GetS1Leap");                         
register("command", () => { ChatLib.chat(`${prefix} &aS2Leap: ${config().S2Leap}`) }).setName("GetS2Leap");                                                                                                                                                                                       
register("command", () => { ChatLib.chat(`${prefix} &aS3Leap: ${config().S3Leap}`) }).setName("GetS3Leap");
register("command", () => { ChatLib.chat(`${prefix} &aS4Leap: ${config().S4Leap}`) }).setName("GetS4Leap");

register("command", () => { 
   ChatLib.chat(`${prefix} &7Current leap: &b${getLeap()}`)
}).setName("getleap")
let leap;                                                                                                                                                                 

/* cylinder commands */
register("command", (...args) => {
    if (!args.length) return;

    const x = Player.getX();
    const y = Player.getY();
    const z = Player.getZ();
    let data = {};
    let radius = args[args.length - 1];

    radius = isNaN(parseFloat(radius)) ? 1.2 : parseFloat(radius);

    if (args[0] === "add") {
        if (args[1] === "hclip") {
            data.dir = parseFloat(args[2]);
            const route = { type: "hclip", data, x, y, z, radius };
            routeHandler.addRoute(route);
        } else if (args[1] === "rotate") {
            data.yaw = parseFloat(args[2]);
            data.pitch = parseFloat(args[3]);
            data.stopMotion = args[4] === "true";
            const route = { type: "rotate", data, x, y, z, radius };
            routeHandler.addRoute(route);
        } else if (args[1] === "command") {
            data.command = args.slice(2, -1).join(" ");
            const route = { type: "command", data, x, y, z, radius };
            routeHandler.addRoute(route);
        } else if (args[1] === "jump") {
            const route = { type: "jump", data, x, y, z, radius };
            routeHandler.addRoute(route);
        } else if (args[1] === "stop") {
            data.yaw = parseFloat(args[2]);
            data.pitch = parseFloat(args[3]);
            data.center = args[4] === "true";
            const route = { type: "stop", data, x, y, z, radius };
            routeHandler.addRoute(route);
        } else {
            ChatLib.chat(`${prefix} &cInvalid cylinder type.`);
        }
    } else if (args[0] === "remove") {
        routeHandler.removeRoute();
    } else if (args[0] === "em") {
        routeHandler.toggleEditMode();
    } else if (args[0] === "exactmode") {
        routeHandler.toggleExactMode();
    } else if (["createroute", "switchroute", "deleteroute"].includes(args[0])) {
        const routeName = args[1];
        if (routeName) {
            if (args[0] === "createroute") {
                routeHandler.createRoute(routeName);
            } else if (args[0] === "switchroute") {
                routeHandler.switchRoute(routeName);
            } else if (args[0] === "deleteroute") {
                routeHandler.deleteRoute(routeName);
            }
        }
    } else if (args[0] === "currentroute") {
        ChatLib.chat(`${prefix} &7Current Route: &a${routeHandler.routeName}`);
    } else {
        config().getConfig().openGui();
    }
}).setName("pepi");