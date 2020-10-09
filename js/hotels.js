'use strict';
var form = document.getElementsByTagName('form')[0];
let result = document.getElementById('searchResult');
let roomType;
let roomss = ['Single', 'Double', 'Triple'];
let hotels = [];
let groupA = [];
let groupB = [];
let groupC = [];
let groupRooms = [];
let groupD = [];
let section = document.getElementById('sec4');

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
  if (this.room === 'Single') {
    this.pricePerPerson = this.pricePerPerson + 5;
  }
  if (this.room === 'Double') {
    this.pricePerPerson = this.pricePerPerson + 35;
  }
  if (this.room === 'Driple') {
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



form.addEventListener('submit', findHotel);

function findHotel(event) {

  event.preventDefault();
  var wifi = event.target.wifi.value;
  var jym = event.target.jym.value;
  var pool = event.target.pool.value;

  if (document.getElementById('single').checked) {
    roomType = 'Single';
  } else if (document.getElementById('double').checked) {
    roomType = 'Double';
  } else if (document.getElementById('triple').checked) {
    roomType = 'Triple';
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

      // console.log('rooms', groupRooms);
    } else {
      groupRooms.push('not in group Rooms');
    }

    if ((groupA[i] === groupB[i]) && (groupA[i] === groupC[i]) && (groupB[i] === groupC[i])) {

      groupD.push(hotels[i]);
      // console.log('d', groupD);

    } else {
      groupD.push('not in group D');
    }
  }
  console.log('rooms', groupRooms);
  console.log('d', groupD);
  tableRender();
  form.reset();
  document.getElementById('form1').removeEventListener('submit', findHotel);
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
      let a = document.createElement('a');
      ul.appendChild(a);
      let input = document.createElement('input');
      a.appendChild(input);
      a.setAttribute('href','#details');
      input.setAttribute('id','submit3');
      input.setAttribute('value', 'Price Details');
      input.setAttribute('type','submit');
      input.addEventListener('click' , priceDetails);

      if (localStorage.getItem('hotel1')) {
        localStorage.setItem('hotel2', JSON.stringify(hotels[i]));
      } else {
        localStorage.setItem('hotel1', JSON.stringify(hotels[i]));
      }
    }

  }

}


let count =1;
function priceDetails(event){

  event.preventDefault();
  for (let i = 0; i < hotels.length; i++) {
    if (count === 1) {

      if (groupD[i] === groupRooms[i]) {
        let details = document.createElement('p');
        details.setAttribute('id' , 'details');
        section.appendChild(details);
        let ulEl = document.createElement('ul');
        details.appendChild(ulEl);
        let liEl1 = document.createElement('li');
        liEl1.setAttribute('id','liEl1');
        ulEl.appendChild(liEl1);
        liEl1.textContent = 'Fixed amount = 140$';
        let liEl2 = document.createElement('li');
        liEl2.setAttribute('id','liEl2');
        ulEl.appendChild(liEl2);
        liEl2.textContent = '   Week-end Check In : + 20$';
        let liEl3 = document.createElement('li');
        liEl3.setAttribute('id','liEl3');
        ulEl.appendChild(liEl3);
        liEl3.textContent = '   Wifi service : + 10$';
        let liEl4 = document.createElement('li');
        liEl4.setAttribute('id','liEl4');
        ulEl.appendChild(liEl4);
        liEl4.textContent = '   JYM service : + 25$';
        let liEl5 = document.createElement('li');
        liEl5.setAttribute('id','liEl5');
        ulEl.appendChild(liEl5);
        liEl5.textContent = '   Swimming pool : + 20$';
        let liEl6 = document.createElement('li');
        liEl6.setAttribute('id','liEl6');
        ulEl.appendChild(liEl6);
        if (hotels[i].room === 'Single'){
          liEl6.textContent = '   ' + hotels[i].room + ' Room : + 5$';
        } else if (hotels[i].room === 'Double'){
          liEl6.textContent = '   ' + hotels[i].room + ' Room : + 35$';
        } else if (hotels[i].room === 'Triple'){
          liEl6.textContent = '   ' + hotels[i].room + ' Room : + 45$';
        }

        let liEl7 = document.createElement('li');
        liEl7.setAttribute('id','liEl7');
        ulEl.appendChild(liEl7);
        liEl7.textContent = 'Please contact us for further details';

        let facebook = document.createElement('a');
        facebook.setAttribute('id','facebook');
        facebook.setAttribute('href','https://web.facebook.com/?_rdc=1&_rdr');

        ulEl.appendChild(facebook);
        let facebookImg = document.createElement('img');
        facebookImg.setAttribute('src','../img/icons/facebook1.png');
        facebook.appendChild(facebookImg);

        let instagram = document.createElement('a');
        instagram.setAttribute('id','instagram');
        instagram.setAttribute('href','https://www.instagram.com/');

        ulEl.appendChild(instagram);
        let instagramImg = document.createElement('img');
        instagramImg.setAttribute('src','../img/icons/instagram1.png');
        instagram.appendChild(instagramImg);

        let pinterest = document.createElement('a');
        pinterest.setAttribute('id','pinterest');
        pinterest.setAttribute('href','https://www.pinterest.com/');

        ulEl.appendChild(pinterest);
        let pinterestImg = document.createElement('img');
        pinterestImg.setAttribute('src','../img/icons/pinterest-logo.png');
        pinterest.appendChild(pinterestImg);

        let twitter = document.createElement('a');
        twitter.setAttribute('id','twitter');
        twitter.setAttribute('href','https://twitter.com/twitter?lang=ar');

        ulEl.appendChild(twitter);
        let twitterImg = document.createElement('img');
        twitterImg.setAttribute('src','../img/icons/twitter-sign.png');
        twitter.appendChild(twitterImg);

        count --;
      }
    }
  }

}





function getHotel() {
  if (localStorage.getItem('hotel1')) {
    let hotelsArr1 = JSON.parse(localStorage.getItem('hotel1'));
    for (let i = 0; i < hotelsArr1.length; i++) {
      new Hotel(
        hotelsArr1[i].name,
        hotelsArr1[i].image,
        hotelsArr1[i].room,
        hotelsArr1[i].day,
        hotelsArr1[i].wifi,
        hotelsArr1[i].jym,
        hotelsArr1[i].swimmingPool
      );
    }
  }
  if (localStorage.getItem('hotel2')) {
    let hotelsArr = JSON.parse(localStorage.getItem('hotel2'));
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
}
console.log(hotels);
for (let i = 0; i < hotels.length; i++) {
  hotels[i].calculatepricePerPerson();
}
getHotel();

