import {select, classNames} from '../settings.js';

class Home {
  constructor() {
    const thisHome = this;

    thisHome.getData();
    thisHome.navPanel();


    thisHome.navArr = [];
  }

  navPanel() {
    const thisHome = this;
  
    thisHome.dom.navList.addEventListener('click', function(e){
      const clicked = e.target;
      const attribute = clicked.getAttribute('href');
  
      if(clicked.classList.contains(classNames.navigation.navBtn)) {
        if(!clicked.classList.contains(classNames.navigation.active)) {
          for (let btn of thisHome.dom.navBtn) {
            btn.classList.remove(classNames.navigation.active);
            thisHome.navArr.pop();
          }
          clicked.classList.add(classNames.navigation.active);
          thisHome.navArr.push(attribute);
        }
      }
      thisHome.pageSwitch();
    });
  }

  pageSwitch() {
    const thisHome = this;

    for (let content of thisHome.dom.contentPages) {
      content.classList.remove('active-page');
      if(content.getAttribute('id') == thisHome.navArr.join('')) {
        content.classList.add('active-page');
      }
    }
  }

  getData() {
    const thisHome = this;
    
    thisHome.dom = {};
    thisHome.dom.navList = document.querySelector(select.navigation.navList);
    thisHome.dom.navBtn = document.querySelectorAll(select.navigation.navBtn);
    thisHome.dom.contentPages = document.querySelectorAll(select.pages.content);
  }
}

export default Home;