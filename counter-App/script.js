let daysEl=document.getElementById("days")
let hoursEl=document.getElementById("hours")
let minutesEl=document.getElementById("minutes")
let secondsEl=document.getElementById("seconds")
function countDown(){
    const newdate=new Date(2025,11,31)
    const currentdate=new Date()
let date=new Date(newdate-currentdate)
let days=Math.ceil(date/(1000*60*60*24))
let hours=Math.ceil(date/(1000*60*60)%24)
let minutes=Math.ceil(date/(1000*60)%24%60)
let seconds=Math.ceil(date/(1000)%60%60)
daysEl.innerHTML=days
hoursEl.innerHTML=formatTime(hours)
minutesEl.innerHTML=formatTime(minutes)
secondsEl.innerHTML=formatTime(seconds)
}
function formatTime(time){
    return time<10 ? `0${time}` : time;
}
countDown()
setInterval (countDown,1000)
// let dayEl=document.getElementById("daysCompleted")
// let hourEl=document.getElementById("hoursCompleted")
// let minuteEl=document.getElementById("minutesCompleted")
// let secondEl=document.getElementById("secondsCompleted")
// function daysCompleted() {
//     let today = new Date(); 
//     let endOfYear = new Date(2025, 11, 31); 
//     let timeDiff = endOfYear - today; 
//     let daysCross=(year)=>{
//         let x
//         let y
//        if(year%4===0 && year%100===0){
//         return x=366
//        } 
//        else{
//        return x=365
//        }
//     }
//     let days= Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//     let hours=Math.ceil(timeDiff/(1000*60*60)%24)
//     let minutes=Math.ceil(timeDiff/(1000*60)%24%60)
//     let seconds=Math.ceil(timeDiff/(1000)%60%60)
//     let daysCompleted = daysCross(x)-days
//     let hoursComplted=d+hours
//     dayEl.innerHTML=daysCompleted
//     hourEl.innerHTML=hoursComplted
//     minuteEl.innerHTML=minutes
//     secondEl.innerHTML=seconds
// }

// countDown()
// setInterval (countDown,1000)
// daysCompleted()
// setInterval(daysCompleted,1000)