//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded








let breakfast;
let labelSize = 25;
let rlabel = 1.1

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(RADIANS);
  //no animation / interaction chart
  noLoop();


  fetch("./json/breakfast.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    // console.log(data);
    
    breakfast = data.myplaces;

    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(255);

  stroke(0,0,0);
  fill(0,0,0);
  textWrap(WORD);
  // text("The idea of home is tricky: when I was building my memory database,",width/8,height/8);
  // text("  ",width/8,height/8+12);
  // text(" I had labelled them to be my 'home address', I had my breakdown or go-to places in Amsterdam, California,...",width/8,height/8+24);
  

}

function drawChart(){

  console.log(breakfast);
  
  
  let total = 0;
  for(let i = 0; i < breakfast.length; i++){
    //get total
    total += breakfast[i].amount;
    
  }
  
  console.log(total);
  
  let centerX = width/2;
  let centerY = height/2;
  let diam = 300;
  let angleStart = TWO_PI*0.2;
  
  for(let i = 0; i < breakfast.length; i++){
    //draw
    let item = breakfast[i];
    
    let itemFraction = item.amount/total;
    let itemAngle = itemFraction * TWO_PI;
    let angleEnd = angleStart + itemAngle;
    
    let lineEndX = cos(angleEnd) * (diam*0.75);
    let lineEndY = sin(angleEnd) * (diam*0.75);
    
    
    stroke(0,0,0);
    strokeWeight(1);
    
    line(centerX,centerY,centerX+lineEndX,centerY+lineEndY);
    textSize(labelSize);

    
    fill(item.color);
    arc(centerX,centerY,diam,diam,angleStart,angleEnd,PIE);
    
    angleStart += itemAngle;
  }
  

  textSize(32);
  stroke(0,0,0);
  fill(0,0,0);
  text("California",centerX-200,centerY);
  text("Amsterdam",centerX+50,centerY);
  text("Beijing",centerX,centerY+200);


}