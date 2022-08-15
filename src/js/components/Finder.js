import { select, templates, classNames } from '../settings.js';

class Finder {
  constructor(element) {
    const thisFinder = this;


    thisFinder.element = element;
    thisFinder.step = 1;
    thisFinder.render();
    thisFinder.generateNet();

    thisFinder.grid = {};
    for(let row = 1; row <= 10; row++) {
      thisFinder.grid[row] = {};
      for(let col = 1; col <= 10; col++) {
        thisFinder.grid[row][col] = false;
      }
    }

    thisFinder.start = [];
    thisFinder.finish = [];
  }

  render() {
    const thisFinder = this;

    let pageData = null;
    switch(thisFinder.step) {
    case 1:
      pageData = { title: 'Draw routes', btnText: 'Finish drawing' };
      break;
    case 2:
      pageData = { title: 'Pick start and finish', btnText: 'Compute' };
      break;
    case 3:
      pageData = { title: 'The best route is', btnText: 'Start again' };
      break;
    }

    const generatedHTML = templates.finder(pageData);
    thisFinder.element.innerHTML = generatedHTML;
    thisFinder.initActions();
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

  changeStep(newStep) {
    const thisFinder = this;
    thisFinder.step = newStep;
    thisFinder.render();
  }
  
  initActions() {
    const thisFinder = this;

    if(thisFinder.step === 1) {
      document.querySelector(select.finder.submitBtn).addEventListener('click', function(e) {
        e.preventDefault();
        thisFinder.changeStep(2);
        document.querySelector(select.finder.boxContainer).innerHTML = thisFinder.activeBox.join('');
      });
  
      document.querySelector(select.finder.boxContainer).addEventListener('click', function(e) {
        e.preventDefault();
        const clicked = e.target;

        if(clicked.classList.contains(classNames.finder.tile)) {
          thisFinder.toggleField(clicked);
        }
      });
    }
    else if(thisFinder.step === 2) {
      document.querySelector(select.finder.submitBtn).addEventListener('click', function(e) {
        e.preventDefault();
        thisFinder.changeStep(3);
        document.querySelector(select.finder.boxContainer).innerHTML = thisFinder.startFinish.join('');
      });
      document.querySelector(select.finder.boxContainer).addEventListener('click', function(e) {
        e.preventDefault();
        const clicked = e.target;

        if(clicked.classList.contains(classNames.finder.tile)) {
          thisFinder.startAndFinish(clicked);
        }
      });
    }
    else if(thisFinder.step === 3) {
      document.querySelector(select.finder.submitBtn).addEventListener('click', function(e) {
        e.preventDefault();
        thisFinder.changeStep(1);
      });
    }
  }

  toggleField(fieldElem) {
    const thisFinder = this;
  
    const field = {
      row: parseInt(fieldElem.getAttribute('data-row')),
      col: parseInt(fieldElem.getAttribute('data-col'))
    };

    if(thisFinder.grid[field.row][field.col]) {
      thisFinder.grid[field.row][field.col] = false;
      fieldElem.classList.remove(classNames.finder.active);
    }
  
    else {
      const gridValues = Object.values(thisFinder.grid)
        .map(col => Object.values(col))
        .flat();
  
  
      // if grid isn't empty...
      if(gridValues.includes(true)) {
  
        // determine edge fields
        const edgeFields = [];
        if(field.col > 1) edgeFields.push(thisFinder.grid[field.row][field.col-1]); //get field on the left value
        if(field.col < 10) edgeFields.push(thisFinder.grid[field.row][field.col+1]); //get field on the right value
        if(field.row > 1) edgeFields.push(thisFinder.grid[field.row-1][field.col]); //get field on the top value
        if(field.row < 10) edgeFields.push(thisFinder.grid[field.row+1][field.col]); //get field on the bottom value

        
        if(!edgeFields.includes(true)) {
          alert('A new field should touch at least one that is already selected!');
          return;
        }
      }

      thisFinder.grid[field.row][field.col] = true;
      fieldElem.classList.add(classNames.finder.active);

      const exp = document.querySelectorAll(select.finder.box);
      thisFinder.activeBox = [];

      for (let e of exp) {
        thisFinder.activeBox.push(e.outerHTML);
      }
    }
  }

  startAndFinish(clicked) {
    const thisFinder = this;

    if(clicked.classList.contains(classNames.finder.active)) {
      if(!clicked.classList.contains(classNames.finder.start) && thisFinder.start.length == 0) {
        clicked.classList.add(classNames.finder.start);
        thisFinder.start.push(clicked);
      }
      else if (clicked.classList.contains(classNames.finder.start)) {
        clicked.classList.remove(classNames.finder.start);
        thisFinder.start.pop();
      }
    }

    if(clicked.classList.contains(classNames.finder.active)) {
      if(thisFinder.start.length == 1 && !clicked.classList.contains(classNames.finder.start) && thisFinder.finish.length == 0) {
        clicked.classList.add(classNames.finder.finish);
        thisFinder.finish.push(clicked);
      }
      else if (clicked.classList.contains(classNames.finder.finish)){
        clicked.classList.remove(classNames.finder.finish);
        thisFinder.finish.pop();
      }
    }


    const exp = document.querySelectorAll(select.finder.box);
    thisFinder.startFinish = [];

    for (let e of exp) {
      thisFinder.startFinish.push(e.outerHTML);
    }
  }
}

export default Finder;