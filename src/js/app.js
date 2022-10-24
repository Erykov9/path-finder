import Home from './components/Home.js';
import Finder from './components/Finder.js';
import { select, classNames } from './settings.js';

const app = {
  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    const idFromHash = window.location.hash.replace('#', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      } 
    }

    thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();
        console.log(thisApp.link);

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = '#' + id;

      });
    }
    
  },

  initHome: function() {
    const thisApp = this;

    const about = document.querySelector('.about-page');
    thisApp.home = new Home(about);
  },

  initFinder: function() {
    const thisApp = this;

    const finder = document.querySelector('.finder-page');
    thisApp.finder = new Finder(finder);
  },
  activatePage: function(pageId){
    const thisApp = this;

    /* add class "active" to matching pages. remove from non-matching */

    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    /* add class "active" to matching links. remove from non-matching */

    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#' + pageId
      );
    }
  },


  init: function() {
    const thisApp = this;

    thisApp.initHome();
    thisApp.initFinder();
  }
};
app.init();