document.querySelector(".shopCloseButton").onclick = function () {
  document.querySelector(".isHideShop").style.display = "none";
};

document.querySelector(".isHideShop").style.display = "block";

const armchair = document.getElementById("armchair");
armchair.onclick = function () {
  armchair.style.opacity = 0.5;

  document.getElementById("armchairIcn").style.backgroundImage =
    "url('../../static/UI/circle_OKmark.webp')";
    
  console.log("armchair");
};

const dbBed = document.getElementById("dbBed");
dbBed.onclick = function () {
  console.log("dbBed");
};

const drawers = document.getElementById("drawers");
drawers.onclick = function () {
  console.log("drawers");
};

const sofa = document.getElementById("sofa");
sofa.onclick = function () {
  console.log("sofa");
};

const tv = document.getElementById("tv");
tv.onclick = function () {
  console.log("tv");
};

const yarn = document.getElementById("yarn");
yarn.onclick = function () {
  console.log("yarn");
};

const flaxplant = document.getElementById("flaxplant");
flaxplant.onclick = function () {
  console.log("flaxplant");
};

const lamp = document.getElementById("lamp");
lamp.onclick = function () {
  console.log("lamp");
};

const rug = document.getElementById("rug");
rug.onclick = function () {
  console.log("rug");
};
