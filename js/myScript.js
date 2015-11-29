
(function main(){
    //createGame(5);
    spashScreen();
})();
function spashScreen(){
    // the ihop logo
    var logo = document.createElement("div");
    var logoURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/IHOP_Restaurant_logo.svg/1000px-IHOP_Restaurant_logo.svg.png";
    logo.innerHTML = "<img src= " + logoURL +"> <\img>";
    //buttons
    var levelList = document.createElement("select");
    levelList.setAttribute("onchange","var n = this.value; clearScreen(); createGame(n);");
    var optionStr = "";
    for (var i = 1; i <= 12; ++i){
        optionStr += ("<option value=" + i + ">" + "Level "+ i +"</option>");
    }
    levelList.innerHTML = optionStr;
    var root = document.getElementsByTagName("body")[0];
    root.appendChild(logo);
    root.appendChild(levelList);
}
function clearScreen(){
    var root = document.getElementsByTagName("body")[0];
    /*var allNodes = root.childNodes;
    for (var i = 0; i < allNodes.length; ++i){
        root.removeChild(allNodes[i]);
    }*/
    root.innerHTML = "";
}
function createGame(numberOfCakes){
    numberOfCakes = parseInt(numberOfCakes);
    var root = document.getElementsByTagName("body")[0];
    pancakes = new Pancake(numberOfCakes);
    pancakes.attach(root);
    root.appendChild(document.createElement("p"));
    var flipLabel = document.createElement("span");
    flipLabel.innerHTML = "Flip: ";
    root.appendChild(flipLabel);
    var dropDownList = document.createElement("select");
    dropDownList.setAttribute("id","dropDownList");
    dropDownList.setAttribute("onchange","pancakes.flip(this.value);");
    var optionStr = "";
    for (var i = 1; i <= numberOfCakes; ++i){
        optionStr += ("<option value=" + i + ">" + i +"</option>");
    }
    dropDownList.innerHTML = optionStr;
    root.appendChild(dropDownList);
}
function Pancake(n){
    var cakeWidthList = [];
    /*
     * create the canvas node
     */
    var numberOfCakes = n;
    function drawPancakes(canvas, cakeWidthList){
        var width = canvas.width;
        var gc = canvas.getContext("2d");
        gc.clearRect(0,0,canvas.width,canvas.height);
        gc.lineWidth = 10;
        gc.strokeStyle = "rgb(236,162,77)";
        gc.fillStyle = "rgb(255,242,164)";
        /*
         * draw pancakes
         */
        for (var i = 0; i < numberOfCakes; ++i){
            gc.beginPath();
            gc.ellipse(width/2,50+30*i,15,cakeWidthList[i],Math.PI/2,0,2 * Math.PI);
            gc.stroke();
            gc.fill();
            gc.closePath();
        }
    }
    this.canvasNode = (function(){
        var canvas = document.createElement("canvas");
        canvas.setAttribute("width","800");
        canvas.setAttribute("height","400");
        canvas.setAttribute("style","border:1px solid #000000;");
        var randomNumbers = [0,1,2,3,4,5,6,7,8,9,10,11];
        shuffle(randomNumbers);
        for (var i = 0; i < 12; ++i){
            cakeWidthList.push(45+30*randomNumbers[i]);
         }
        drawPancakes(canvas, cakeWidthList);
        return canvas;
    })(); 
    this.attach = function(node){
        node.appendChild(this.canvasNode);
    };
    this.flip = function(n){
        n = parseInt(n) - 1;
        //flip width too
        flippedArray = cakeWidthList.slice(0,n+1);
        cakeWidthList = cakeWidthList.slice(n+1,12);
        flippedArray.reverse();
        cakeWidthList = flippedArray.concat(cakeWidthList);
        drawPancakes(this.canvasNode, cakeWidthList);
    }
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
