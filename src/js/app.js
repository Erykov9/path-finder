import Home from './components/Home.js';
import Finder from './components/Finder.js';

const app = {
  initHome: function() {
    const thisApp = this;

    thisApp.home = new Home();
  },

  initFinder: function() {
    const thisApp = this;

    thisApp.finder = new Finder();
  },

  init: function() {
    const thisApp = this;

    thisApp.initHome();
    thisApp.initFinder();
  }
};
app.init();