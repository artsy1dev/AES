import { getRandomInt } from "./utils";

export function wearBind(player, assetName, assetGroup, color, difficulty, refresh = false) {
	if (InventoryGet(player, assetGroup) == null) InventoryWear(Player, assetName, assetGroup, color, difficulty, false);
}

export function swapBind(player, assetName, assetGroup, color, difficulty, refresh = false) {
	if (InventoryRemove(player, assetGroup) == null) InventoryWear(Player, assetName, assetGroup, color, difficulty, false);
}

export function breakRandomClothes(player) {
	const clothItems = [
    "Cloth", "ClothAccessory", "Suit", "ClothLower", "SuitLower",
    "Bra", "Corset", "Panties", "SocksLeft", "SocksRight",
    "Socks", "Garters", "Shoes", "Hat", "Gloves",
    "LeftHand", "RightHand", "Bracelet", "Mask"
  	];

	const clothItemsInInventory = [];
	
	for (const clothItem of clothItems) {
		if (InventoryGet(player, clothItem) != null) {
		clothItemsInInventory.push(clothItem);
		}
	}
	if (clothItemsInInventory.length > 0) {
		// Generate a random index to select a cloth item
		const randomIndex = getRandomInt(clothItemsInInventory.length);

		// Remove the selected cloth item from the player's inventory
		InventoryRemove(player, clothItemsInInventory[randomIndex]);
		return true;
	} else {
		CharacterNaked(Player);
		return false;
	}
}