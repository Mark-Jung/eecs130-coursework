const makeBigger = () => {
   var el = document.querySelector('.content');
   var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
   var fontSize = parseFloat(style); 
   el.style.fontSize = (fontSize + 10) + 'px';
};

const makeSmaller = () => {
   var el = document.querySelector('.content');
   var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
   var fontSize = parseFloat(style); 
   el.style.fontSize = (fontSize - 10) + 'px';
};

document.querySelector('.a1').onclick = makeBigger;
document.querySelector('.a2').onclick = makeSmaller;
