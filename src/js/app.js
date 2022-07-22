/* eslint-disable */
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
}

const classNames = {
  navigation: {
    navDiv: 'navigation',
    navList: 'nav-list',
    navBtn: 'nav-btn',
    active: 'active'
  }
}


class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.dataHolder();
    thisHome.navListener();
  }

  navListener() {
    const thisHome = this;
    console.log(thisHome);
  
    thisHome.navList.addEventListener('click', function(e){
      const clicked = e.target;
  
  
      if(clicked.classList.contains(classNames.navigation.navBtn)) {
        if(!clicked.classList.contains(classNames.navigation.active)) {
          for (let btn of thisHome.navBtn) {
            btn.classList.remove(classNames.navigation.active)
          }
          clicked.classList.add(classNames.navigation.active)
        }
      }
    })
  }

  dataHolder() {
    const thisHome = this;
    
    thisHome.navList = document.querySelector(select.navigation.navList);
    thisHome.navBtn = document.querySelectorAll(select.navigation.navBtn);
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
}
app.init();