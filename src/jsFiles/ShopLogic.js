import { FurnitureC } from "./FurnitureC";

const shopProduct = [
  {
    cardImg: "db",
    cardName: "Double Bed",
    cardPrice: 350,
    id: "1",
  },
  {
    cardImg: "arm",
    cardName: "Armchair",
    cardPrice: 300,
    id: "0",
  },
  {
    cardImg: "dra",
    cardName: "Drawers",
    cardPrice: 250,
    id: "2",
  },
  {
    cardImg: "sof",
    cardName: "Sofa",
    cardPrice: 300,
    id: "6",
  },
  {
    cardImg: "tvhd",
    cardName: "TV",
    cardPrice: 250,
    id: "7",
  },
  {
    cardImg: "yar",
    cardName: "Yarn Basket",
    cardPrice: 200,
    id: "8",
  },
  {
    cardImg: "flx",
    cardName: "Flaxplant",
    cardPrice: 100,
    id: "3",
  },
  {
    cardImg: "lmp",
    cardName: "Lamp",
    cardPrice: 250,
    id: "4",
  },
  {
    cardImg: "rg",
    cardName: "Rug",
    cardPrice: 100,
    id: "5",
  },
];

const shopCategories = [
  {
    catName: "all",
    catImg: "allImg",
  },
  {
    catName: "bed",
    catImg: "bedImg",
  },
  {
    catName: "sofa",
    catImg: "sofaImg",
  },
  {
    catName: "garden",
    catImg: "gardenImg",
  },
];

const money = document.querySelector(".money");
money.innerHTML = 1700;

const boughtItemsContainer = document.querySelector(".boughtItemsContainer");
boughtItemsContainer.style.display = "none";

const shopCards = document.querySelector(".shopCards");
const categories = document.querySelector(".categories");

export let boughtShopCardsCount = 0;

function createShopCard(imgName, cardName, price, id) {
  const shopCard = document.createElement("div");
  shopCard.classList.add("shopCard");
  shopCard.id = id;
  shopCard.selected = false;

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("imgContainer");

  const cardImg = document.createElement("div");
  cardImg.classList.add("cardImg", imgName);

  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("cardTitle");
  cardTitle.append(cardName);

  const cardPriceBg = document.createElement("div");
  cardPriceBg.classList.add("cardPriceBg");

  const cardPrice = document.createElement("p");
  cardPrice.classList.add("cardPrice");
  cardPrice.append(price);

  const shopCoinImg = document.createElement("div");
  shopCoinImg.classList.add("shopCoinImg");

  shopCards.append(shopCard);
  shopCard.append(imgContainer);
  imgContainer.append(cardImg);

  shopCard.append(cardTitle);

  shopCard.append(cardPriceBg);
  cardPriceBg.append(cardPrice);
  cardPriceBg.append(shopCoinImg);

  shopCard.onclick = (event) => {
    const itemId = event.currentTarget.id;
    if (!shopCard.selected && money.innerHTML - price >= 0) {
      shopCard.selected = true;
      shopCard.style.opacity = 0.5;

      shopCoinImg.classList.remove("shopCoinImg");
      shopCoinImg.classList.add("bought");

      money.innerHTML -= price;
      boughtShopCardsCount++;
      displayBoughtItems(itemId, shopCard);
    } else if (shopCard.selected) {
      return;
    } else {
      alert("Not enough money!");
    }
  };
}

function createShopCategories(catName, catImg) {
  const catBg = document.createElement("div");
  catBg.classList.add("catBg");
  catBg.classList.add(catName);

  const img = document.createElement("div");
  img.classList.add("img");
  img.classList.add(catImg);

  categories.append(catBg);
  catBg.append(img);
}

function displayBoughtItems(itemId, shopCard) {
  const boughtItemsContainer = document.querySelector(".boughtItems");

  const clonedItem = shopCard.cloneNode(true);
  clonedItem.style.opacity = 1;
  clonedItem.id = +itemId;
  clonedItem.classList.add("boughtCard");

  const priceElement = clonedItem.querySelector(".cardPriceBg");
  if (priceElement) priceElement.style.display = "none";

  const imgContainer = clonedItem.querySelector(".imgContainer");
  if (imgContainer) imgContainer.style.display = "unset";

  const img = clonedItem.querySelector(".cardImg");
  if (img) img.classList.add("boughtImg");

  const title = clonedItem.querySelector(".cardTitle");
  if (title) title.classList.add("title");

  clonedItem.addEventListener("click", (event) => {
    boughtShopCardsCount--;
    const itemId = event.currentTarget.id;
    FurnitureC.showBoughtFurniture(itemId);
    console.log(itemId);
    boughtItemsContainer.removeChild(clonedItem);
  });

  boughtItemsContainer.appendChild(clonedItem);
}

shopProduct.forEach(({ cardImg, cardName, cardPrice, id }) => {
  createShopCard(cardImg, cardName, cardPrice, id);
});

shopCategories.forEach(({ catName, catImg, catImgDark }) => {
  createShopCategories(catName, catImg, catImgDark);
});

const first = document.querySelector(".all");
first.classList.remove("catBg");
first.classList.add("catBgLight");

document.querySelector(".shopCloseButton").onclick = function () {
  document.querySelector(".isHideShop").style.display = "none";
};
