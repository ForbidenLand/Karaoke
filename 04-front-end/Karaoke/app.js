
const mydata = JSON.parse(data);
let lyrics = document.getElementById("lyrics");
let play = document.getElementById("play");
function startApp(){
    play.setAttribute("disabled",true);
    var data = mydata.map((x)=>x);
    var interval =100; 
    var audioPlayer = new Audio("song.mp4");
    audioPlayer.play();
    var timer = setInterval(()=>{

    var temp = data[0];
    if(interval == parseInt(temp.start)){
        lyrics.innerHTML=temp.Line;
        console.log(interval+temp.Line);
    }else if(interval == parseInt(temp.end)){
        lyrics.innerHTML="";
        data.shift();
    }
    
    if(data.length ==0){
    console.log("Track end");
    clearInterval(timer);
    audioPlayer.pause();
    play.removeAttribute("disabled",false);
    }
    interval+=100;
},100);
}
