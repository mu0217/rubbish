var speed = 3; 
var clock = null;

init();

function init() {
  for (var i = 0; i < 4; i++) {
    createrow();
  }
  let blackBlocks = document.getElementsByClassName("black");
  blackBlocks = [...blackBlocks];

  function handleInit() {
    clock = window.setInterval(move, 30); //定时器，每30ms调用一次move（）；
    blackBlocks.forEach((item) => {
      item.removeEventListener("click", handleInit); //任意一个黑块被点击后，马上移除所有黑块的事件监听器，避免移速变快
    });
  }

  blackBlocks.forEach((item) => {
    item.addEventListener("click", handleInit);
  });
}

function $(id) {
  return document.getElementById(id); //简化函数
}

function creatediv(className) {
  var div = document.createElement("div"); //创建div
  div.className = className;
  return div;
}

function creatcell() {
  var temp = ["space", "space", "space", "space"];
  var i = Math.floor(Math.random() * 4);
  temp[i] = "space black"; //生成黑块
  return temp;
}

function createrow() {
  //加入行
  var con = $("content");
  var row = creatediv("div");
  var arr = creatcell();
  con.appendChild(row);
  if (con.firstChild == null) {
    con.appendChild(row);
  } else {
    con.insertBefore(row, con.firstChild); //插入新行
  }
  for (var i = 0; i < 4; i++) {
    row.appendChild(creatediv(arr[i])); //加入黑白块
  }
}

function fail() {
  clearInterval(clock);
  confirm("你的最终得分为 " + parseInt($("score").innerHTML));
  location.reload(); //刷新页面
}

$("main").onclick = function (ev) {
  judge(ev);
};

function judge(ev) {
  if (ev.target.className.indexOf("black") != -1) {
    ev.target.className = "space";
    ev.target.parentNode.pass = 1; //定义属性pass，表明此行row的黑块已经被点击
    score();
  } else {
    fail();
  }
}
function move() {
  var con = $("content");
  var top = parseInt(window.getComputedStyle(con, null)["top"]); //得到top值

  //对move进行判断，分三种情况
  if (speed + top > 0) {
    top = 0;
  } else {
    top += speed;
  }
  con.style.top = top + "px";

  if (top == 0) {
    createrow();
    con.style.top = "-100px";
    delrow();
  } else if (top == -100 + speed) {
    var rows = con.childNodes;
    if (rows.length == 5 && rows[rows.length - 1].pass !== 1) {
      fail();
    }
  }
}
function delrow() {
  //删除行
  var con = $("content");
  if (con.childNodes.length == 6) {
    con.removeChild(con.lastChild);
  }
}

function speedup() {
  speed += 0.4;
  if(speed>4) {
    if(!$('prompt')) {
      let prompt = document.createElement('h2');
      prompt.setAttribute('id','prompt');
      prompt.innerHTML = "真厉害！"
      document.querySelector('body').appendChild(prompt);
    }
  }
}

function score() {
  var newscore = parseInt($("score").innerHTML) + 1;
  $("score").innerHTML = newscore;
  if (newscore % 4 == 0) {
    speedup();
  }
}
