import { select, templates } from '../settings.js';

class Finder {
  constructor(element) {
    const thisFinder = this;


    thisFinder.element = element;
    thisFinder.step = 1;
    thisFinder.render();
    thisFinder.generateNet();
    thisFinder.getData();


  }

  render() {
    const thisFinder = this;

    // determine what title and button content should be used
    let pageData = null;
    switch(thisFinder.step) {
    case 1:
      pageData = { title: 'Draw routes', btnText: 'Finish drawing' };
      break;
    case 2:
      pageData = { title: 'Pick start and finish', buttonText: 'Compute' };
      break;
    case 3:
      pageData = { title: 'The best route is', buttonText: 'Start again' };
      break;
    }

    const generatedHTML = templates.finder(pageData);
    thisFinder.element.innerHTML = generatedHTML;

  }

  generateNet() {
    const thisFinder = this;
    let html = '';

    for(let row = 1; row <= 10; row++) {
      for(let col = 1; col <= 10; col++) {
        html += '<div class="tile" data-row="' + row + '" data-col="' + col + '"></div>';
      }
    }
    thisFinder.element.querySelector(select.finder.boxContainer).innerHTML = html;
  }

  getData() {
    const thisHome = this;
    
    thisHome.dom = {};
    thisHome.dom.navList = document.querySelector(select.navigation.navList);
    thisHome.dom.navBtn = document.querySelectorAll(select.navigation.navBtn);
    thisHome.dom.contentPages = document.querySelectorAll(select.pages.content);

    console.log(thisHome.dom.contentPages);
  }
}

export default Finder;