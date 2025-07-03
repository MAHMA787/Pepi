import { rightClick, validBlocks, prefix } from "./utils/Utils";
import config from "../config";

let lastClick = 0;

register("tick", () => {
   if (!config().BonzoTriggerbot) return;
   const time = Date.now();
   let heldItem = Player.getHeldItem();
   if (heldItem && heldItem.getName().toLowerCase().includes("bonzo's staff")) {
      let la = Player.lookingAt()
      if (la instanceof Block) {
         const x = la.getX()
         const y = la.getY()
         const z = la.getZ()

         const block = World.getBlockAt(x, y, z);
         const id = block.type.getID();

         const metadata = block.getMetadata();
         const isValidBlock = validBlocks.some(validBlock => 
            validBlock.id === id &&
            (validBlock.metadata === undefined || validBlock.metadata === metadata)
         );
         
         if (isValidBlock && (time - lastClick >= 350)) {
            ChatLib.chat(`${prefix} &7Bonzoing!`)
            rightClick();
            lastClick = time;
         }
      }
   }
});