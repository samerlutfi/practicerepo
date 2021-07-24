'use strict';
let allShops=[];
let times = ['8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
let container = document.getElementById('tableplace');
let tableEl = document.createElement('table');
container.appendChild(tableEl);
function saveToLocal (){
  let data= JSON.stringify(allShops);
  localStorage.setItem('shop',data);
}
function readFromLocal(){
  let stringObj=localStorage.getItem('shop');
  let normalObject=JSON.parse(stringObj);
  if (normalObject !== null) {
    allShops = normalObject;
  }

}
readFromLocal();
function Shops (name,minCus,maxCus,avg){
  this.name=name;
  this.minCus=minCus;
  this.maxCus=maxCus;
  this.avg=avg;
  this.randomCustomerNum=[],
  this.cookiesPerhour=[];
  allShops.push(this);

}
function randomCusNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
Shops.prototype.gettingRandomCus = function(){
  for (let i = 0; i < times.length; i++) {
    let value=randomCusNum(this.minCus,this.maxCus);
    this.randomCustomerNum.push(value);
    this.cookiesPerhour.push(this.randomCustomerNum[i] *this.avg);
  }
};
function createTableHeader(){
  let trEl=document.createElement('tr');
  let thEl=document.createElement('th');
  thEl.textContent='Shop';
  trEl.appendChild(thEl);
  tableEl.appendChild(trEl);
  for (let i = 0; i < times.length; i++) {
    let thEl=document.createElement('th');
    thEl.textContent=times[i];
    trEl.appendChild(thEl);


  }
  let totalDailyEl=document.createElement('th');
  totalDailyEl.textContent='total location';
  trEl.appendChild(totalDailyEl);

}
// createTableHeader();
Shops.prototype.render= function() {
  let trEl=document.createElement('tr');
  let tdEl=document.createElement('td');
  tdEl.textContent=this.name;
  trEl.appendChild(tdEl);
  for (let i = 0; i < times.length; i++) {
    let tdEl=document.createElement('td');
    tdEl.textContent=this.cookiesPerhour[i];
    trEl.appendChild(tdEl);
    tableEl.appendChild(trEl);
  }
};

let myform=document.getElementById('myform');
myform.addEventListener('submit',Addbranch);
function Addbranch(event) {
  event.preventDefault();
  let name=event.target.branchName.value;
  let minCus=event.target.minimumcus.value;
  let maxCus=event.target.maximumcus.value;
  let avg=event.target.AverageNum.value;
  let newbranch= new Shops(name,minCus,maxCus,avg);
  createTableHeader();
  newbranch.gettingRandomCus();
  newbranch.render();
  saveToLocal();

}

