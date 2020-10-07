'use strict';
var form = document.getElementsByTagName('form')[0];
let result = document.getElementById('searchResult');
let roomType;
let roomss = ['single', 'double', 'triple'];
let hotels = [];
let groupA = [];
let groupB = [];
let groupC = [];
let groupRooms = [];
let count = 1;

let groupD = [];


function Hotel(name, image, room, day, wifi, jym, swimmingPool) {
  this.name = name,
    this.image = image,
    this.room = room,
    this.day = day,
    this.wifi = wifi,
    this.jym = jym,
    this.swimmingPool = swimmingPool,
    this.pricePerPerson = 140;
  hotels.push(this);
}

Hotel.prototype.calculatepricePerPerson = function () {
  if (this.day === 'week-end') {
    this.pricePerPerson = this.pricePerPerson + 20;
  }
  if (this.wifi === 'yes') {
    this.pricePerPerson = this.pricePerPerson + 10;
  }
  if (this.jym === 'yes') {
    this.pricePerPerson = this.pricePerPerson + 25;
  }
  if (this.swimmingPool === 'yes') {
    this.pricePerPerson = this.pricePerPerson + 20;
  }
  if (this.room === 'single') {
    this.pricePerPerson = this.pricePerPerson + 5;
  }
  if (this.room === 'double') {
    this.pricePerPerson = this.pricePerPerson + 35;
  }
  if (this.room === 'triple') {
    this.pricePerPerson = this.pricePerPerson + 45;
  }
};


for (let j = 0; j < roomss.length; j++) {
  new Hotel('Hilton Hotel and Resorts', '../img/hotels/Hilton.jpg', roomss[j], 'week-end', 'yes', 'no', 'yes');
  new Hotel('Hyatt Hotel Corporation', '../img/hotels/Hyatt.jpg', roomss[j], 'week-days', 'no', 'yes', 'yes');
  new Hotel('Marriott', '../img/hotels/Marriott.jpg', roomss[j], 'week-end', 'yes', 'yes', 'yes');
  new Hotel('InterContinental Hotels Group', '../img/hotels/IHG.jpg', roomss[j], 'week-end', 'no', 'yes', 'no');
  new Hotel('Wyndham', '../img/hotels/Wyndham.jpg', roomss[j], 'week-days', 'yes', 'no', 'no');
  new Hotel('Accor Group', '../img/hotels/AccorHotels.jpg', roomss[j], 'week-end', 'yes', 'yes', 'no');
  new Hotel('Choice Hotels', '../img/hotels/Choice.jpg', roomss[j], 'week-end', 'no', 'no', 'yes');
  new Hotel('Best Western', '../img/hotels/Bestwestern.jpg', roomss[j], 'week-end', 'yes', 'no', 'yes');
  new Hotel('First world Hotel', '../img/hotels/firstworldhotel.jpg', roomss[j], 'week-end', 'yes', 'yes', 'yes');
  new Hotel('Caesars Palace', '../img/hotels/caesars.jpg', roomss[j], 'week-end', 'yes', 'no', 'no');
  new Hotel('Galaxy Macau', '../img/hotels/Galaxy.jpg', roomss[j], 'week-end', 'no', 'no', 'no');
  new Hotel('Disney Caribbean Beach Resort', '../img/hotels/disney.jpg', roomss[j], 'week-end', 'yes', 'yes', 'no');

}

if (localStorage.getItem('hotels')) {
  let hotelsArr = JSON.parse(localStorage.getItem('hotels'));
  for (let i = 0; i < hotelsArr.length; i++) {
    new Hotel(
      hotelsArr[i].name,
      hotelsArr[i].image,
      hotelsArr[i].room,
      hotelsArr[i].day,
      hotelsArr[i].wifi,
      hotelsArr[i].jym,
      hotelsArr[i].swimmingPool
    );
  }
}

form.addEventListener('submit', findHotel);

function findHotel(event) {

  if (count === 1) {
    count--;
    // form.removeEventListener('click', findHotel);
    event.preventDefault();
    var wifi = event.target.wifi.value;
    var jym = event.target.jym.value;
    var pool = event.target.pool.value;

    if (document.getElementById('single').checked) {
      roomType = 'single';
    } else if (document.getElementById('double').checked) {
      roomType = 'double';
    } else if (document.getElementById('triple').checked) {
      roomType = 'triple';
    }
    console.log(roomType);

    for (let i = 0; i < hotels.length; i++) {
      if (wifi === hotels[i].wifi) {
        groupA.push(hotels[i].name);
        //   console.log('a',groupA);

      } else {
        groupA.push('not in group A');
      }
      if (jym === hotels[i].jym) {
        groupB.push(hotels[i].name);
        //   console.log('b',groupB);

      } else {
        groupB.push('not in group B');
      }
      if (pool === hotels[i].swimmingPool) {
        groupC.push(hotels[i].name);
        //   console.log('c',groupC);

      } else {
        groupC.push('not in group C');
      }

      if (roomType === hotels[i].room) {
        groupRooms.push(hotels[i]);
        console.log('rooms', groupRooms);
      }

      // console.log((groupA[i] === groupB[i]) && (groupA[i] === groupC[i]) && (groupB[i] === groupC[i]));

      if ((groupA[i] === groupB[i]) && (groupA[i] === groupC[i]) && (groupB[i] === groupC[i])) {

        groupD.push(hotels[i]);
        console.log('d', groupD);

      } else {
        groupD.push('not in group D');
      }

    }
    tableRender();
    form.reset();
    localStorage.setItem('hotels', JSON.stringify(hotels));
  }
}

function tableRender() {
  for (let i = 0; i < hotels.length; i++) {
    if (groupD[i] === groupRooms[i]) {
      let ul = document.createElement('ul');
      result.appendChild(ul);
      let img = document.createElement('img');
      ul.appendChild(img);
      img.setAttribute('src', hotels[i].image);
      let liEl1 = document.createElement('li');
      ul.appendChild(liEl1);
      liEl1.textContent = hotels[i].name;
      liEl1.setAttribute('id', 'first');
      let liEl2 = document.createElement('li');
      ul.appendChild(liEl2);
      liEl2.textContent = 'Cost per person : ' + hotels[i].pricePerPerson + '$';
      let liEl3 = document.createElement('li');
      ul.appendChild(liEl3);
      liEl3.textContent = 'Available on : ' + hotels[i].day;
      let liEl4 = document.createElement('li');
      ul.appendChild(liEl4);
      liEl4.textContent = 'room : ' + hotels[i].room;
      let input = document.createElement('input');
      ul.appendChild(input);
      input.setAttribute('type', 'submit');
      input.setAttribute('id', 'submit3');
      input.setAttribute('value', 'Price details');
    }
  }
}


console.log(hotels);
for (let i = 0; i < hotels.length; i++) {
  hotels[i].calculatepricePerPerson();
}
