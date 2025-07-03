/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

/* Utils */
export const prefix = "&8&l[&c&lPepi&8&l]";

export const S2DPacketOpenWindow = Java.type("net.minecraft.network.play.server.S2DPacketOpenWindow")
export const C03PacketPlayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
export const S2FPacketSetSlot = Java.type("net.minecraft.network.play.server.S2FPacketSetSlot")
export const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow")

export const KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding")
export const Jump = new KeyBind(Client.getMinecraft().field_71474_y.field_74314_A);
export const getDistance3D = (x1, y1, z1, x2, y2, z2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
export const forward = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w);
export const MouseEvent = Java.type("net.minecraftforge.client.event.MouseEvent")

export function snapTo(yaw, pitch) {
    if (Math.abs(pitch) <= 90) {
        const player = Player.getPlayer();
        player.field_70177_z = yaw;
        player.field_70125_A = pitch;
    }
}

export function doJump() {
    KeyBinding.func_74510_a(57, true)
    Client.scheduleTask(2, () => KeyBinding.func_74510_a(57, false));
}

export function setMotion(motionX, motionZ) {
    Player.getPlayer().field_70159_w = motionX;
    Player.getPlayer().field_70179_y = motionZ;
}

export function rightClick() {
    const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null)
    rightClickMethod.setAccessible(true);
    rightClickMethod.invoke(Client.getMinecraft(), null);
}

export function calcFloorPos(c, v) {
    if (c < 0) {
        return Math.ceil(c) - v / 10;
    } else {
        return Math.floor(c) + v / 10;
    }
}

export function center() {
    if (Player.getZ() < 0) Player.getPlayer().func_70107_b(calcFloorPos(Player.getX(), 5), Player.getY(), calcFloorPos(Player.getZ(), 5));
    if (Player.getZ() > 0) Player.getPlayer().func_70107_b(calcFloorPos(Player.getX(), 5), Player.getY(), calcFloorPos(Player.getZ(), 5));
}

export function getHeldItemID() {
    const item = Player.getHeldItem();
    const itemId = item?.getNBT()?.get("tag")?.get("ExtraAttributes")?.getString("id");
    return itemId;
}

export function isPlayerInBox(x1, y1, z1, x2, y2, z2) {
    const x = Player.getX();
    const y = Player.getY();
    const z = Player.getZ();

    return (x >= Math.min(x1, x2) && x <= Math.max(x1, x2) &&
            y >= Math.min(y1, y2) && y <= Math.max(y1, y2) &&
            z >= Math.min(z1, z2) && z <= Math.max(z1, z2));
}

export const sendWindowClick = (windowId, slot, clickType, actionNumber=0) => Client.sendPacket(new C0EPacketClickWindow(windowId ?? Player.getContainer().getWindowId(), slot, clickType ?? 0, 0, null, actionNumber))

export const validBlocks = [
//    { id: 44, metadata: 4 },  // Brick slab
//    { id: 45 },               // Bricks
//    { id: 108 },              // Brick Stairs
    { id: 24 },               // Sandstone
    { id: 44, metadata: 1 },  // Sandstone Slab
    { id: 128 },              // Sandstone Stairs
    { id: 179 },              // Red Sandstone
    { id: 180 },              // Red Sandstone Stairs
    { id: 182 }               // Red Sandstone Slab
]

export function swapFromName(items) {
    index = Player?.getInventory()?.getItems()?.findIndex(item => item?.getName()?.toLowerCase()?.includes(items))
    if (index < 0 || index > 8) {
        ChatLib.chat(`${prefix} &cCannot swap to ` + items + `&c. Not in hotbar.`)
        return
    }
    Player.setHeldItemIndex(index)
}

class ServerRotations {
    constructor() {
        register("packetSent", (packet, event) => {
            if (this.sending) return
            if (!this.yaw || !this.pitch || Player.getPlayer().field_70154_o) return
            if (this.yaw == packet.func_149462_g() && this.pitch == packet.func_149470_h()) return
            if (!event.isCancelled()) cancel(event)
            this.sending = true
            let wasOnGround = packet.func_149465_i()
            if (this.yaw && this.pitch) {
                if (packet.class.getSimpleName() == "C05PacketPlayerLook") Client.sendPacket(
                    new net.minecraft.network.play.client.C03PacketPlayer$C05PacketPlayerLook(
                        this.yaw,
                        this.pitch,
                        wasOnGround
                    )
                )
                else Client.sendPacket(
                    new net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook(
                        Player.getX(),
                        Player.getPlayer().func_174813_aQ().field_72338_b,
                        Player.getZ(),
                        this.yaw,
                        this.pitch,
                        wasOnGround
                    )
                )
            }
            if (this.resetRot) {
                this.resetRot = false
                this.yaw = null
                this.pitch = null
            }
            this.sending = false
        }).setPacketClasses([net.minecraft.network.play.client.C03PacketPlayer])

        register("renderEntity", (entity) => {
            if (entity.getEntity() != Player.getPlayer() || !this.yaw || !this.pitch || Player.getPlayer().field_70154_o) return
            Player.getPlayer().field_70761_aq = this.yaw
            Player.getPlayer().field_70759_as = this.yaw
        })

        register("gameUnload", this.reset)
    }

    set(y, p) {
        this.yaw = y
        this.pitch = p
    }

    reset() {
        this.yaw = null
        this.pitch = null
    }

    resetRotations() {
        this.set(Player.getYaw(), Player.getPitch())
        this.resetRot = true
    }

}

export default new ServerRotations()