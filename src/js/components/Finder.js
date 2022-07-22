import {classNames, select} from '../settings.js';

class Finder {
  constructor() {
    const thisFinder = this;

    thisFinder.getData();
    thisFinder.checkBox();
    thisFinder.reset();

    thisFinder.boxArray = [];

  }

  getClosestActiveElement() {
    const thisFinder = this;
    const boxes = thisFinder.dom.box;

    for(let box of boxes) {
      console.log(box.classList.contains(classNames.finder.active));
    }
  }

  checkBox()  {
    const thisFinder = this;

    thisFinder.dom.wrapper.addEventListener('click', function(e) {
      e.preventDefault();
      const clicked = e.target;

      if (clicked.getAttribute('class') == 'box' || clicked.getAttribute('class') == 'box active-box') {
        clicked.classList.toggle(classNames.finder.active);
      }
      thisFinder.getClosestActiveElement();
    });
  }

  reset() {
    const thisFinder = this;

    thisFinder.dom.clear.addEventListener('click', function() {
      for (let box of thisFinder.dom.box) {
        box.classList.remove(classNames.finder.active);
      }
    });
  }

  getData() {
    const thisFinder = this;

    thisFinder.dom = {};
    thisFinder.dom.wrapper = document.querySelector(select.finder.boxContainer);
    thisFinder.dom.boxRow = document.querySelectorAll(select.finder.boxRow);
    thisFinder.dom.box = document.querySelectorAll(select.finder.box);
    thisFinder.dom.clear = document.querySelector(select.finder.clear);
  }
}

export default Finder;