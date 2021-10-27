var morseCode = "A;.-|B;-...|C;-.-.|D;-..|E;.|F;..-.|G;--.|H;....|I;..|J;.---|K;-.-|L;.-..|M;--|N;-.|O;---|P;.--.|Q;--.-|R;.-.|S;...|T;-|U;..-|V;...-|W;.--|X;-..-|Y;-.--|Z;--..|/;-..-.|1;.----|2;..---|3;...--|4;....-|5;.....|6;-....|7;--...|8;---..|9;----.|0;-----"

var morseList = morseCode.split("|")
for(var i=0;i<morseList.length;i++){
  morseList[i]=morseList[i].split(";") 
  $("ul.translist").append("<li>"+morseList[i][0]+" "+morseList[i][1]+"</li>")
}


// translate

function findCode(letter){
  for (var i=0;i<morseList.length;i++){
    if (morseList[i][0]==letter){
      return morseList[i][1]
    }
  }
  return letter
}


function findLetter(code){
  for (var i=0;i<morseList.length;i++){
    if (morseList[i][1]==code){
      return morseList[i][0]
    }
  }
  return code
}


function translateToMorse(text){
  text=text.toUpperCase()
  var result = ""
  for(var i=0;i<text.length;i++){
    // console.log(text[i])
    result+= findCode(text[i])+" "
  }
  return result
  
}


function translateToEng(text){
  text = text.split(" ");
  var result = ""
  for(var i=0;i<text.length;i++){
    // console.log(text[i])
    result+= findLetter(text[i])
  }
  return result
  
}


var otext = "hello/world"
var ttext = translateToMorse(otext)
var btext = translateToEng(ttext)

console.log("原文："+otext)
console.log("翻譯密碼："+ttext)
console.log("翻譯原文："+btext)


$("#btnMorse").click(function(){
  var input = $("#input").val()
  var result = translateToMorse(input)
  
  $("#output").val(result)
  $("#output").css({
    backgroundColor: "#FFB637"
  }).animate({
    backgroundColor: "transparent"
  },500)
  $(".symbol").velocity({
    transform: ["rotate(0deg)", "rotate(360deg)"]
  })
  
  
  
})




$("#btnEng").click(function(){
  var input = $("#output").val()
  var result = translateToEng(input)
  $("#input").val(result)
  $("#input")
    .css({
    backgroundColor: "#202124"
  }).animate({
    backgroundColor: "transparent"
  },500)
  $(".symbol").velocity({
    transform: ["rotate(0deg)", "rotate(360deg)"]
  })
  
})


$("#input").keyup(function(){
  var original = $("#input").val()
  var newtext = original.toUpperCase().split(" ").join("")
  $("#input").val(newtext)
})


function play(texts, nowindex){
  var word = texts[nowindex]
  var lasttime = 300
  if ( word=="."){
    $("audio.short")[0].play() 
    lasttime = 300
  } else if ( word=="-"){
    $("audio.long")[0].play()
    lasttime = 500
  } else{
    lasttime = 800
  }
  console.log(word,lasttime)
  
  $(".playlist span").removeClass("playing")
  $(".playlist span").eq(nowindex).addClass("playing")
  
  if (texts.length>nowindex){
    setTimeout(function(){
      play(texts,nowindex+1)
    },lasttime)
  } else{
    $(".playlist").html("")
  }
  
}

$("audio.short")[0].volume=0.3
$("audio.long")[0].volume=0.3

$("#btnplay").click(function(){
  var texts = $("#output").val()
  
  $(".playlist").html("")
  for(var i=0;i<texts.length;i++){
    $(".playlist").append("<span>"+texts[i]+"</span>")
  }
  play(texts,0)
})