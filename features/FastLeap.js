import config from "../config"
import leapHelper from "./utils/LeapUtils"
import { isPlayerInBox, rightClick, MouseEvent, getHeldItemID } from "./utils/Utils";

export function getLeap() {
    let leapString = ""
    if (config().PositionalFastLeap) {
        if (isPlayerInBox(113, 160, 48, 89, 100, 122)) {
            leapString = config().S1Leap
        }
        if (isPlayerInBox(91, 160, 145, 19, 100, 121)) {
            leapString = config().S2Leap
        }
        if (isPlayerInBox(-6, 160, 123, 19, 100, 50)) {
            leapString = config().S3Leap
        }
        if (isPlayerInBox(17, 160, 27, 90, 100, 50)) {
            leapString = config().S4Leap
        }

        return leapString
    }
}

register(MouseEvent, (event) => {
    if (!config().FastLeapEnabled) return;

    const button = event.button
    const state = event.buttonstate

    if (!state) return
    if (button !== 0) return;

    if (getHeldItemID() !== "INFINITE_SPIRIT_LEAP") return;
    cancel(event)

    rightClick()

    let leapTo = getLeap()
    if (!leapTo || !leapTo.length) return;

    ChatLib.chat(leapTo)
    leapHelper.queueLeap(leapTo)

})
