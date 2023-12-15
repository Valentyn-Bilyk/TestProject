document.querySelector(".shopCloseButton").onclick = function () {
  document.querySelector(".isHideShop").style.display = "none";
};

document.querySelector(".isHideShop").style.display = "block";

const shopCards = document.querySelector('.shopCards')
const categories = document.querySelector('.categories')

function createShopCard(imgName, cardName, price) {
  const shopCard = document.createElement('div')
  shopCard.classList.add('shopCard')

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
    shopCard.style.opacity = 0.5
    shopCoinImg.classList.remove('shopCoinImg')
    shopCoinImg.classList.add('bought')
  }
}

function createShopCategories(catName, catImg) {
  const catBg = document.createElement('div')
  catBg.classList.add('catBg')

  const img = document.createElement('div')
  img.classList.add('img')

  categories.append(catBg)
  catBg.append(img)
}
createShopCategories()
createShopCategories()
createShopCategories()
createShopCategories()
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
    catImg: 'allImg'
  },
  {
    catName: 'bad',
    catImg: 'badImg'
  },
  {
    catName: 'furni',
    catImg: 'furniImg'
  },
  {
    catName: 'garden',
    catImg: 'gardenImg'
  }
]

shopProduct.map(({cardImg, cardName, cardPrice}) => {
  createShopCard(cardImg, cardName, cardPrice)
})

