const shopProduct = [
  {
    cardImg: 'db',
    cardName: 'Double Bed',
    cardPrice: 350,
  },
  {
    cardImg: 'arm',
    cardName: 'Armchair',
    cardPrice: 300,
  },
  {
    cardImg: 'dra',
    cardName: 'Drawers',
    cardPrice: 250,
  },
  {
    cardImg: 'sof',
    cardName: 'Sofa',
    cardPrice: 300,
  },
  {
    cardImg: 'tvhd',
    cardName: 'TV',
    cardPrice: 250,
  },
  {
    cardImg: 'yar',
    cardName: 'Yarn Basket',
    cardPrice: 200,
  },
  {
    cardImg: 'flx',
    cardName: 'Flaxplant',
    cardPrice: 100,
  },
  {
    cardImg: 'lmp',
    cardName: 'Lamp',
    cardPrice: 250,
  },
  {
    cardImg: 'rg',
    cardName: 'Rug',
    cardPrice: 100,
  },
]

const shopCategories = [
  {
    catName: 'all',
    catImg: 'allImg',
    catImgDark: 'allImgDark'
  },
  {
    catName: 'bad',
    catImg: 'badImg',
    catImgDark: 'allImgDark'
  },
  {
    catName: 'sofa',
    catImg: 'sofaImg',
    catImgDark: 'sofaImgDark'
  },
  {
    catName: 'garden',
    catImg: 'gardenImg',
    catImgDark: 'allImgDark'
  }
]

const money = document.querySelector('.money')
money.innerHTML = 1800

const boughtItemsContainer = document.querySelector('.boughtItemsContainer')
boughtItemsContainer.style.display = 'none'

const shopCards = document.querySelector('.shopCards')
const categories = document.querySelector('.categories')

const boughtShopCards = []

function createShopCard(imgName, cardName, price) {
  const shopCard = document.createElement('div')
  shopCard.classList.add('shopCard')
  shopCard.selected = false

  const imgContainer = document.createElement('div')
  imgContainer.classList.add('imgContainer')

  const cardImg = document.createElement('div')
  cardImg.classList.add('cardImg', imgName)

  const cardTitle = document.createElement('h3')
  cardTitle.classList.add('cardTitle')
  cardTitle.append(cardName)

  const cardPriceBg = document.createElement('div')
  cardPriceBg.classList.add('cardPriceBg')

  const cardPrice = document.createElement('p')
  cardPrice.classList.add('cardPrice')
  cardPrice.append(price)

  const shopCoinImg = document.createElement('div')
  shopCoinImg.classList.add('shopCoinImg')
  
  shopCards.append(shopCard)
  shopCard.append(imgContainer)
  imgContainer.append(cardImg)

  shopCard.append(cardTitle)

  shopCard.append(cardPriceBg)
  cardPriceBg.append(cardPrice)
  cardPriceBg.append(shopCoinImg)

  shopCard.onclick = () => {
    if (!shopCard.selected && (money.innerHTML - price) >= 0) {
      shopCard.selected = true;
      shopCard.style.opacity = 0.5;

      shopCoinImg.classList.remove('shopCoinImg');
      shopCoinImg.classList.add('bought');

      money.innerHTML -= price;
      boughtShopCards.push(shopCard);
  
      displayBoughtItems();
    } else if (shopCard.selected) {
      return;
    } else {
      alert('Not enough money!');
    }
  }
}

function createShopCategories(catName, catImg, catImgDark) {
  const catBg = document.createElement('div')
  catBg.classList.add('catBg')
  catBg.classList.add(catName)

  const img = document.createElement('div')
  img.classList.add('img')
  img.classList.add(catImg)
  
  
  
  categories.append(catBg)
  catBg.append(img)
  
  catBg.onclick = () => {
    document.querySelectorAll('.catBgLight').forEach((element) => {
      element.classList.remove('catBgLight');
      element.classList.add('catBg');
    });
    
    catBg.classList.remove('catBg');
    catBg.classList.add('catBgLight');
  };
}

function displayBoughtItems() {
  const boughtItemsContainer = document.querySelector('.boughtItems');
  boughtItemsContainer.innerHTML = '';

  boughtShopCards.forEach((item) => {
    const clonedItem = item.cloneNode(true);
    clonedItem.style.opacity = 1;

    const priceElement = clonedItem.querySelector('.cardPriceBg');
    if (priceElement) {
      priceElement.style.display = 'none';
    }

    clonedItem.addEventListener('click', () => {

      boughtItemsContainer.removeChild(clonedItem);
    });

    boughtItemsContainer.appendChild(clonedItem);
  });
}

shopProduct.map(({cardImg, cardName, cardPrice}) => {
  createShopCard(cardImg, cardName, cardPrice)
})

shopCategories.forEach(({catName, catImg, catImgDark}) => {
  createShopCategories(catName, catImg, catImgDark)
})

const first = document.querySelector('.all')
first.classList.remove('catBg')
first.classList.add('catBgLight')

document.querySelector(".shopCloseButton").onclick = function () {
  document.querySelector(".isHideShop").style.display = "none";
};
document.querySelector(".isHideShop").style.display = "block";

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    boughtItemsContainer.style.display = 'flex'
  }
})
