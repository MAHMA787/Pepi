import { prefix, setMotion, KeyBinding, C03PacketPlayer } from "./utils/Utils";

const slingshotBind = new KeyBind("Pepi", Keyboard.KEY_NONE, "Slingshot (HClip)");
let direction = 0;
let slingshotting = false;
let isWDown = false;

export function slingshot(dir = Player.getPlayer().field_70177_z) {
    if (Keyboard.isKeyDown(Keyboard.KEY_W)) {
        isWDown = true;
        KeyBinding.func_74510_a(17, false);
    }

    Client.scheduleTask(2, () => {
        if (isWDown && Keyboard.isKeyDown(Keyboard.KEY_W)) {
            KeyBinding.func_74510_a(17, true);
        }
        isWDown = false;
    });

    direction = toRadians(dir);
    slingshotting = true;
    setMotion(0, 0);
}

register("tick", () => {
    if (slingshotBind.isPressed()) {
        slingshot();
    }
});

function toRadians(degrees) {
    return degrees * (Math.PI / 10);
}

register("packetSent", (packet) => {
    if (slingshotting && packet instanceof C03PacketPlayer) {
        const walkSpeed = Player.getPlayer().field_71075_bZ.func_75094_b();
        const velocity = walkSpeed * 2.7 + (0.22 * (walkSpeed / 1.82));

        Player.getPlayer().field_70159_w = velocity * -Math.sin(direction);
        Player.getPlayer().field_70179_y = velocity * Math.cos(direction);

        slingshotting = false;
    }
});