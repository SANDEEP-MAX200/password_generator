const inputslider = document.querySelector("[data-length-slide]");
const lengthdisply = document.querySelector("[data-length-Number]");
const passworddisply = document.querySelector("[data-password-display]");
const copybtn = document.querySelector("[data-copy]");
const copymsg = document.querySelector("[data-copymsg]");
const uppercasecheck = document.querySelector("#uppercase");
const lowercasecheck = document.querySelector("#lowercase");
const numberscheck = document.querySelector("#numbers");
const symbolscheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generatebtn");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols='!@#$%^&*()_+=-{}:"<>?/.,;[]'
let password = ""; 
let passlen = 10;
let checkcount =0;

handleslider();

// Set password length UI
function handleslider() {
    inputslider.value = passlen;
    lengthdisply.innerText = passlen;
}

function setind(color){
    indicator.style.backgroundColor=color;
}
function getrndint(min,max){
   return Math.floor(Math.random()*(max-min)+min);
}

function genrndnum(){
    return getrndint(0,9);
}
function genlow(){
    return String.fromCharCode(getrndint(97,123));
}
function genupp(){
    return String.fromCharCode(getrndint(65,91));
}
function gensym(){
    const randnum=getrndint(0,symbols.length);
    return symbols.charAt(randnum);
}
function calcstrength(){
    let u=false;
    let l=false;
    let n=false;
    let s=false;
    if(uppercasecheck.checked)u=true;
    if(lowercasecheck.checked)l=true;
    if(numberscheck.checked)n=true;
    if(symbolscheck.checked)s=true;

    if(u && l && (n||s) && passlen>=8)setind("red");
    else if((l && u) && (n || s) && passlen>=6)setind("green");
    else setind("yellow");

}
async function copycontents() {
    try{
    await navigator.clipboard.writeText(passworddisply.value);
    copymsg.innerText="copied";//resolve
    }
    catch(e){
        copymsg.innerText="failed";//reject
    }
    copymsg.classList.add("active");
    setTimeout(() => {
        copymsg.classList.remove("active");
    }, 2000);

}
  inputslider.addEventListener('input',(e)=>{
    passlen=e.target.value;
    handleslider();
  })
copybtn.addEventListener('click',()=>{
    if(passworddisply.value){
        copycontents();
    }
})
function handlecheckbox(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
    });
    if(passlen<checkcount){
        passlen=checkcount;
        handleslider();
    }
    
}
allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckbox);  
})
generatebtn.addEventListener('click',()=>{
    copymsg.innerText="copy";
    if(checkcount==0)return ;
    if(passlen<=checkcount)
    {
        passlen=checkcount
        handleslider();
    }
   
    password="";
    let funcarr=[];
    
    if(uppercasecheck.checked){
        funcarr.push(genupp);
    }
    if(lowercasecheck.checked){
        funcarr.push(genlow);
    }

    if(numberscheck.checked){
        funcarr.push(genrndnum);
    }
    if(symbolscheck.checked){
        funcarr.push(gensym);
    }
    console.log("hello");
    for(let i=0;i<funcarr.length;i++){//compulsory addition 
        password+=funcarr[i]();
    }
    for(let i=0;i<passlen-funcarr.length;i++){
        let r=getrndint(0,funcarr.length);
        password+=funcarr[r]();
    }
    password=shuflepassword(Array.from(password));
    passworddisply.value=password;
    calcstrength();
   
})

function shuflepassword(st){
    for(let i=0;i<st.length-1;i++){
        let r=getrndint(0,i);
        const temp=st[i];
        st[i]=st[r];
        st[r]=temp;
    }
    return st.join('');
}


