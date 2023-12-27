import { FurnitureC } from "./FurnitureC";
import {shopProduct, shopCategories, getDOMElements} from './Shop'

export let boughtItemsCounter = 0;
const {money, boughtItemsContainer, shopCards, categories} = getDOMElements()
money.innerHTML = 1700;
boughtItemsContainer.style.display = "none";

function createShopCard(imgName, cardName, price, id) {
  const shopCard = document.createElement("div");
  shopCard.classList.add("shopCard");
  shopCard.id = id;
  shopCard.selected = false;

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("imgContainer");

  const cardImg = document.createElement("div");
  cardImg.classList.add("cardImg");
  cardImg.style.backgroundImage = imgName;

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
      boughtItemsCounter++;
      displayBoughtItems(itemId, shopCard);
    } else if (shopCard.selected) {
      return;
    } else {
      alert("Not enough money!");
    }
  };
}

function createShopCategories(catBgImg, catImg) {
  const catBg = document.createElement("div");
  catBg.classList.add("catBg");
  catBg.style.backgroundImage = catBgImg;

  const img = document.createElement("div");
  img.classList.add("img");
  img.style.backgroundImage = catImg;

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
    boughtItemsCounter--;
    const itemId = event.currentTarget.id;
    FurnitureC.showBoughtFurniture(itemId);
    boughtItemsContainer.removeChild(clonedItem);
  });

  boughtItemsContainer.appendChild(clonedItem);
}

shopProduct.forEach(({ cardImg, cardName, cardPrice, id }) => {
  createShopCard(cardImg, cardName, cardPrice, id);
});

shopCategories.forEach(({ catBgImg, catImg }) => {
  createShopCategories(catBgImg, catImg);
});
