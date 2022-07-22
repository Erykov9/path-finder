const select = {
  navigation: {
    navDiv: '.navigation',
    navList: '.nav-list',
    navBtn: '.nav-btn',
    active: '.active'
  },
  pages: {
    content: '.content-container',
    finder: '#finder',
    about: '#about'
  }
};

const classNames = {
  navigation: {
    navDiv: 'navigation',
    navList: 'nav-list',
    navBtn: 'nav-btn',
    active: 'active'
  }
};


class Home {
  constructor() {
    const thisHome = this;

    thisHome.dataHolder();
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

      for (let content of thisHome.dom.contentPages) {
        content.classList.remove('active-page');
        if(content.getAttribute('id') == thisHome.navArr.join('')) {
          content.classList.add('active-page');
        }
      }
    });
  }

  pageSwitch() {

  }

  dataHolder() {
    const thisHome = this;
    
    thisHome.dom = {};
    thisHome.dom.navList = document.querySelector(select.navigation.navList);
    thisHome.dom.navBtn = document.querySelectorAll(select.navigation.navBtn);
    thisHome.dom.contentPages = document.querySelectorAll(select.pages.content);
    thisHome.dom.finder = document.getElementById(select.pages.finder);
    thisHome.dom.about = document.getElementById(select.pages.about);

  }
}


const app = {
  initHome: function() {
    const thisApp = this;

    thisApp.home = new Home();
  },

  init: function() {
    const thisApp = this;

    thisApp.initHome();
  }
};
app.init();