import { select, templates, classNames } from '../settings.js';

class Finder {
  constructor(element) {
    const thisFinder = this;


    thisFinder.element = element;
    thisFinder.step = 1;
    thisFinder.render();
    thisFinder.generateNet();



    thisFinder.grid = [];
    for(let row = 0; row < 10; row++) {
      thisFinder.grid[row] = {};
      for(let col = 0; col < 10; col++) {
        thisFinder.grid[row][col] = false;
      }
    }

    thisFinder.path = [];
    thisFinder.start = [];
    thisFinder.finish = [];
    thisFinder.pathNet = [];

    thisFinder.correctPath = [];

    thisFinder.road = document.querySelectorAll(select.finder.box);
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

  newDiv() {
    const thisFinder = this;
    console.log(thisFinder.road);

    let html = '';
    for (let tile of thisFinder.road) {
      html += tile.outerHTML;
    }

    thisFinder.element.querySelector(select.finder.boxContainer).innerHTML = html;
  }

  generateNet() {
    const thisFinder = this;

    let html = '';

    for(let row = 0; row < 10; row++) {
      for(let col = 0; col < 10; col++) {
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
      thisFinder.generateNet();
      document.querySelector(select.finder.submitBtn).addEventListener('click', function(e) {
        e.preventDefault();
        thisFinder.changeStep(2);
        thisFinder.newDiv();
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
        thisFinder.newDiv();
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
      thisFinder.newDiv();
      thisFinder.findRoad();



      document.querySelector(select.finder.submitBtn).addEventListener('click', function(e) {
        e.preventDefault();
        thisFinder.changeStep(1);
        thisFinder.clearData();
      });
    }
  }

  colorTiles(pathArray) {
    const thisFinder = this;
    thisFinder.currentLocation = thisFinder.start;
    let row = parseInt(thisFinder.currentLocation[0][0]);
    let col = parseInt(thisFinder.currentLocation[0][1]);
    let boxContainer = document.querySelector(select.finder.boxContainer);
    thisFinder.road = boxContainer;


    for (let a of pathArray) {
      if (a == 'East') {

        col = parseInt(col) + 1;
        col = col + '';
        console.log('col:', col);
        thisFinder.currentLocation = [`${row}`, `${col}`];
        console.log('curret location:', thisFinder.currentLocation);

        console.log(document.querySelector('[data-row="' + row + '"]' + '[data-col="' + col + '"]' ));
        boxContainer.querySelector('[data-row="' + row + '"]' + '[data-col="' + col + '"]').classList.add(classNames.finder.found);
      }

      if(a == 'West') {
        
        col = parseInt(col) - 1;
        col = col + '';
        console.log('col:', col);
        thisFinder.currentLocation = [`${row}`, `${col}`];
        console.log('curret location:', thisFinder.currentLocation);

        console.log(document.querySelector('[data-row="' + row + '"]' + '[data-col="' + col + '"]' ));
        document.querySelector('[data-row="' + row + '"]' + '[data-col="' + col + '"]').classList.add(classNames.finder.found);
      }

      if (a == 'North') {
        
        row = parseInt(row) - 1;
        row = row + '';
        console.log('row:', row);
        thisFinder.currentLocation = [`${row}`, `${col}`];
        console.log('curret location:', thisFinder.currentLocation);

        console.log(document.querySelector('[data-row="' + row + '"]' + '[data-col="' + col + '"]' ));
        document.querySelector('[data-row="' + row + '"]' + '[data-col="' + col + '"]').classList.add(classNames.finder.found);
      }

      if(a == 'South') {
        row = parseInt(row) + 1;
        row = row + '';
        console.log('row:', row);
        thisFinder.currentLocation = [`${row}`, `${col}`];
        console.log('curret location:', thisFinder.currentLocation);

        console.log(document.querySelector('[data-row="' + row + '"]' + '[data-col="' + col + '"]' ));
        document.querySelector('[data-row="' + row + '"]' + '[data-col="' + col + '"]').classList.add(classNames.finder.found);
      }
    }


  }
  


  findRoad() {
    const thisFinder = this;
    const start = thisFinder.start;
    const grid = thisFinder.grid;

 


    let findShortestPath = function(startCoordinates, grid) {
      let distanceFromTop = parseInt(startCoordinates[0][0]);
      let distanceFromLeft = parseInt(startCoordinates[0][1]);


      let location = {
        distanceFromTop: distanceFromTop,
        distanceFromLeft: distanceFromLeft,
        path: [],
        status: 'start'
      };

      let queue = [location];




      while (queue.length > 0) {
        
        let currentLocation = queue.shift();


        thisFinder.newLocation = exploreInDirection(currentLocation, 'North', grid);
        if (thisFinder.newLocation.status === 'finish') {
          return thisFinder.newLocation.path;
        } else if (thisFinder.newLocation.status == true) {
          queue.push(thisFinder.newLocation);
          thisFinder.correctPath.push(thisFinder.newLocation);

        }

        thisFinder.newLocation = exploreInDirection(currentLocation, 'East', grid);
        if (thisFinder.newLocation.status === 'finish') {
          return thisFinder.newLocation.path;
        } else if (thisFinder.newLocation.status == true) {
          queue.push(thisFinder.newLocation);
          thisFinder.correctPath.push(thisFinder.newLocation);

        }

        thisFinder.newLocation = exploreInDirection(currentLocation, 'South', grid);
        if (thisFinder.newLocation.status === 'finish') {
          return thisFinder.newLocation.path;
        } else if (thisFinder.newLocation.status == true) {
          queue.push(thisFinder.newLocation);
          thisFinder.correctPath.push(thisFinder.newLocation);

        }

        thisFinder.newLocation = exploreInDirection(currentLocation, 'West', grid);
        if (thisFinder.newLocation.status === 'finish') {
          return thisFinder.newLocation.path;
        } else if (thisFinder.newLocation.status == true) {
          queue.push(thisFinder.newLocation);
          thisFinder.correctPath.push(thisFinder.newLocation);

        }

      }

      return false;
    };

    let locationStatus = function(location, grid) {
      let gridSize = grid.length;
      let dft = location.distanceFromTop;
      let dfl = location.distanceFromLeft;

      if(location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {
        return false;
      } else if (grid[dft][dfl] === 'finish') {
        return 'finish';
      } else if (grid[dft][dfl] !== true) {
        return false;
      } else {
        return true;
      }
    };

    let exploreInDirection = function(currentLocation, direction, grid) {

      let newPath = currentLocation.path.slice();
      newPath.push(direction);
  
      let dft = currentLocation.distanceFromTop;
      let dfl = currentLocation.distanceFromLeft;
  
      if (direction === 'North') {
        dft -= 1;
      } else if (direction === 'East') {
        dfl += 1;
      } else if (direction === 'South') {
        dft += 1;
      } else if (direction === 'West') {
        dfl -= 1;
      }
  
      let newLocation = {
        distanceFromTop: dft,
        distanceFromLeft: dfl,
        path: newPath,
        status: 'Unknown'
      };
      newLocation.status = locationStatus(newLocation, grid);
  
      if(newLocation.status === true) {
        grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
      }

      return newLocation;
    };

    console.log(findShortestPath(start, grid));
    thisFinder.grid = grid;


    thisFinder.colorTiles(thisFinder.newLocation.path);
    alert(`The shortest path is ${thisFinder.newLocation.path.length} steps!`);
  }

  toggleField(clicked) {
    const thisFinder = this;
    thisFinder.activeBox = [];
  
    const field = {
      row: parseInt(clicked.getAttribute('data-row')),
      col: parseInt(clicked.getAttribute('data-col'))
    };

    if(thisFinder.grid[field.row][field.col]) {
      thisFinder.grid[field.row][field.col] = false;
      clicked.classList.remove(classNames.finder.active);
    } else {
      const gridValues = Object.values(thisFinder.grid)
        .map(col => Object.values(col))
        .flat();

      if(gridValues.includes(true)) {
        const edgeFields = [];
        if(field.col > 0) edgeFields.push(thisFinder.grid[field.row][field.col-1]); //get field on the left value
        if(field.col < 9) edgeFields.push(thisFinder.grid[field.row][field.col+1]); //get field on the right value
        if(field.row > 0) edgeFields.push(thisFinder.grid[field.row-1][field.col]); //get field on the top value
        if(field.row < 9) edgeFields.push(thisFinder.grid[field.row+1][field.col]); //get field on the bottom value

        if(!edgeFields.includes(true)) {
          alert('A new field should touch at least one that is already selected!');
          return;
        }
      }

      thisFinder.grid[field.row][field.col] = true;
      clicked.classList.add(classNames.finder.active);

      const exp = document.querySelectorAll(select.finder.box);


      for (let e of exp) {
        thisFinder.activeBox.push(e.outerHTML);
      }

      if(clicked.classList.contains('active-box')) {
        thisFinder.path.push([clicked.getAttribute('data-row'), clicked.getAttribute('data-col')]);
      }
    }
  }

  startAndFinish(clicked) {
    const thisFinder = this;
    

    const field = {
      row: parseInt(clicked.getAttribute('data-row')),
      col: parseInt(clicked.getAttribute('data-col'))
    };


    if(clicked.classList.contains(classNames.finder.active)) {
      if(!clicked.classList.contains(classNames.finder.start) && thisFinder.start.length == 0) {
        clicked.classList.add(classNames.finder.start);
        thisFinder.start.push([clicked.getAttribute('data-row'), clicked.getAttribute('data-col')]);
        thisFinder.grid[field.row][field.col] = 'start';
      }
      else if (clicked.classList.contains(classNames.finder.start)) {
        clicked.classList.remove(classNames.finder.start);
        thisFinder.start.pop();
        thisFinder.grid[field.row][field.col] = false;
      }
    }

    if(clicked.classList.contains(classNames.finder.active)) {
      if(thisFinder.start.length == 1 && !clicked.classList.contains(classNames.finder.start) && thisFinder.finish.length == 0) {
        clicked.classList.add(classNames.finder.finish);
        thisFinder.finish.push([clicked.getAttribute('data-row'), clicked.getAttribute('data-col')]);
        thisFinder.grid[field.row][field.col] = 'finish';
      }
      else if (clicked.classList.contains(classNames.finder.finish)){
        clicked.classList.remove(classNames.finder.finish);
        thisFinder.finish.pop();
        thisFinder.grid[field.row][field.col] = false;
      }
    }


    const exp = document.querySelectorAll(select.finder.box);
    thisFinder.startFinish = [];

    thisFinder.road = exp;
  }

  clearData() {
    const thisFinder = this;

    thisFinder.path = [];
    thisFinder.start = [];
    thisFinder.finish = [];
    thisFinder.road = document.querySelectorAll(select.finder.box);

    thisFinder.grid = [];
    for(let row = 0; row < 10; row++) {
      thisFinder.grid[row] = {};
      for(let col = 0; col < 10; col++) {
        thisFinder.grid[row][col] = false;
      }
    }
  }

}

export default Finder;