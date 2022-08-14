export const select = {
  navigation: {
    navDiv: '.navigation',
    navList: '.nav-list',
    navBtn: '.nav-btn',
    active: '.active'
  },
  pages: {
    content: '.content-container',
    finder: '#finder',
    about: '#about',
    selector: '.selector'
  },
  finder: {
    boxContainer: '.box-container',
    box: '.tile',
    boxRow: '.boxRow',
    clear: '.clear',
    submitBtn: '.btn',
    activeBox: '.active-box'
  },
  templates: {
    finder: '#template-finder',
    about: '#template-home'
  }
};

export const classNames = {
  navigation: {
    navDiv: 'navigation',
    navList: 'nav-list',
    navBtn: 'nav-btn',
    active: 'active'
  },
  finder: {
    active: 'active-box',
    tile: 'tile',
    clicked: 'clicked'
  }
};

export const templates = {
  finder: Handlebars.compile(document.querySelector(select.templates.finder).innerHTML),
  about: Handlebars.compile(document.querySelector(select.templates.about).innerHTML)
};