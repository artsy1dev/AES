import { getRandomInt } from "./utils";

export function wearBind(player, assetName, assetGroup, color, difficulty, refresh = false) {
	if (InventoryGet(player, assetGroup) == null) InventoryWear(Player, assetName, assetGroup, color, difficulty, false);
}

export function swapBind(player, assetName, assetGroup, color, difficulty, refresh = false) {
	if (InventoryRemove(player, assetGroup) == null) InventoryWear(Player, assetName, assetGroup, color, difficulty, false);
}

export function breakRandomClothes(player) {
	let breakInt = getRandomInt(20)
	switch (breakInt) {
		case 0:
			InventoryRemove(player, "Cloth");
			break;
		case 1:
			InventoryRemove(player, "ClothAccessory");
			break;
		case 2:
			InventoryRemove(player, "Suit");
			break;
		case 3:
			InventoryRemove(player, "ClothLower");
			break;
		case 4:
			InventoryRemove(player, "SuitLower");
			break;
		case 5:
			InventoryRemove(player, "Bra");
			break;
		case 6:
			InventoryRemove(player, "Corset");
			break;
		case 7:
			InventoryRemove(player, "Panties");
			break;
		case 8:
			InventoryRemove(player, "SocksLeft");
			break;
		case 9:
			InventoryRemove(player, "SocksRight");
			break;
		case 10:
			InventoryRemove(player, "Socks");
			break;
		case 11:
			InventoryRemove(player, "Garters");
			break;
		case 12:
			InventoryRemove(player, "Shoes");
			break;
		case 13:
			InventoryRemove(player, "Hat");
			break;
		case 14:
			InventoryRemove(player, "Gloves");
			break;
		case 15:
			InventoryRemove(player, "LeftHand");
			break;
		case 16:
			InventoryRemove(player, "RightHand");
			break;
		case 17:
			InventoryRemove(player, "Bracelet");
			break;
		case 18:
			InventoryRemove(player, "Mask");
			break;
		default:
			break;
	}
}