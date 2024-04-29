let y=document.getAnimations('pop');
const buttons=document.querySelectorAll("button");
let audio=new Audio("Music/tap-notification-180637.mp3");
function Openpopup()
{
    document.getElementById('HTPPOP').style.display='block';
}
function Closepopup()
{
    document.getElementById('HTPPOP').style.display='none';
}
function AOpenpopup()
{
    document.getElementById('AboutPopup').style.display='block';
}
function AClosepopup()
{
    document.getElementById('AboutPopup').style.display='none';
}
function Cpopup()
{
    document.getElementById('CPop').style.display='block';
}
function closeTab()
{
    window.close();
}
function CClose()
{
    document.getElementById('CPop').style.display='none';
}
let x=document.getElementById('title');
function playaudio()
{
    x.play();
}
buttons.forEach(buttons=>{
    buttons.addEventListener("click",()=>{
        audio.play();
    })
})


