import config from "../../config";
import { KeyBinding } from "./Utils";

export function startMoving() {
    KeyBinding.func_74510_a(17, true);
    if (!config().AutoP5Sprint) { KeyBinding.func_74510_a(42, true) }
}

export function stopMoving() {
    KeyBinding.func_74510_a(17, false);
    if (!config().AutoP5Sprint) { KeyBinding.func_74510_a(42, false) }
}