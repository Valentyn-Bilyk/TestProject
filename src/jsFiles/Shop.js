import { handleCloseShopAnimation } from "./HandleC";
import { Joy } from "./JoystickC";

const shopProduct = [
  {
    cardImg: 'url("UI/icon_shopItem_DoubleBed.webp")',
    cardName: "Double Bed",
    cardPrice: 350,
    id: "1",
  },
  {
    cardImg: 'url("UI/icon_shopItem_Armchair.webp")',
    cardName: "Armchair",
    cardPrice: 300,
    id: "0",
  },
  {
    cardImg: 'url("UI/icon_shopItem_Drawers.webp")',
    cardName: "Drawers",
    cardPrice: 250,
    id: "2",
  },
  {
    cardImg: 'url("UI/icon_shopItem_Sofa.webp")',
    cardName: "Sofa",
    cardPrice: 300,
    id: "6",
  },
  {
    cardImg: 'url("UI/icon_shopItem_TV.webp")',
    cardName: "TV",
    cardPrice: 250,
    id: "7",
  },
  {
    cardImg: 'url("UI/icon_shopItem_YarnBasket.webp")',
    cardName: "Yarn Basket",
    cardPrice: 200,
    id: "8",
  },
  {
    cardImg: 'url("UI/icon_shopItem_FlaxPlant.webp")',
    cardName: "Flaxplant",
    cardPrice: 100,
    id: "3",
  },
  {
    cardImg: 'url("UI/icon_shopItem_Lamp.webp")',
    cardName: "Lamp",
    cardPrice: 250,
    id: "4",
  },
  {
    cardImg: 'url("UI/icon_shopItem_Rug.webp")',
    cardName: "Rug",
    cardPrice: 100,
    id: "5",
  },
];

const shopCategories = [
  {
    catBgImg: 'url("UI/buyButtonShop.png")',
    catImg: 'url("UI/icon_shopAll_active.webp")',
  },
  {
    catBgImg: 'url("UI/button_sectionShop_Inactive.png")',
    catImg: 'url("UI/icon_shopCategory_Sofa_Dark.png")',
  },
  {
    catBgImg: 'url("UI/button_sectionShop_Inactive.png")',
    catImg: 'url("UI/icon_shopCategory_Bed_Dark.png")',
  },
  {
    catBgImg: 'url("UI/button_sectionShop_Inactive.png")',
    catImg: 'url("UI/icon_shopCategory_fence_Dark.png")',
  },
];

function getDOMElements() {
  const money = document.querySelector(".money");
  const boughtItemsContainer = document.querySelector(".boughtItemsContainer");
  const shopCards = document.querySelector(".shopCards");
  const categories = document.querySelector(".categories");

  return {money, boughtItemsContainer, shopCards, categories}
}

document.querySelector(".shopCloseButton").onclick = function () {
  handleCloseShopAnimation(".isHideShop", "none")
  Joy.nippleUnlock()
};

document.querySelector(".closeBoughtItems").onclick = function () {
  handleCloseShopAnimation(".boughtItemsContainer", "none")
  Joy.nippleUnlock()
};

export {shopProduct, shopCategories, getDOMElements}