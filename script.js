const scroll_bar = document.querySelector(".scroll_indicator");
const red = document.querySelector(".red");
const green = document.querySelector(".green");


const length_cnt = document.querySelector(".length_count");
        
// slidershow();

function slidershow() {
    length_cnt.innerHTML = scroll_bar.value;
    displaystrength();
}



let initial_length_password = 12;
length_cnt.innerHTML = initial_length_password;


function displaystrength() {
    if (parseInt(length_cnt.innerHTML) <= 8) {

        scroll_bar.classList.add("red");
        scroll_bar.classList.remove("green");
    }
     else if (parseInt(length_cnt.innerHTML) < 14 &&
        parseInt(length_cnt.innerHTML) > 8) 
        {
            scroll_bar.classList.remove("red");
            scroll_bar.classList.remove("green");
    }
     else if (parseInt(length_cnt.innerHTML) >= 12) {

        scroll_bar.classList.remove("red");
        scroll_bar.classList.add("green");

    }
}




let symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function getRndInteger(min,max){
    return Math.floor(Math.random(0,1)* (max-min)) + min;
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateNumber(){
    return getRndInteger(0,9);
}
function generateSymbol(){
    const temp = getRndInteger(0,symbols.length);
    return symbols.charAt(temp);
}



let password = document.querySelector(".display");

let Up = document.querySelector("#UC");
let Lc = document.querySelector("#LC");
let Nb = document.querySelector("#NB");
let Sc = document.querySelector("#SC");
let strength_color = document.querySelector(".indicator");

// Up.addEventListener("change", calculate_strength);
// Lc.addEventListener("change", calculate_strength);
// Nb.addEventListener("change", calculate_strength);
// Sc.addEventListener("change", calculate_strength);

function calculate_strength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;
    
    if (Up.checked) hasUpper = true;
    if (Lc.checked) hasLower = true;
    if (Nb.checked) hasNumber = true;
    if (Sc.checked) hasSymbol = true;

    if (hasLower && hasUpper && hasNumber && hasSymbol && ((parseInt(length_cnt.innerHTML) >= 12))) {
        color_changer(
            "#0f0",
            "drop-shadow(0 0 5px #0f0) drop-shadow(0 0 10px #0f0) drop-shadow(0 0 25px #0f0)"
        );
    }
    else if(hasLower && hasUpper && (hasNumber || hasSymbol) && ((parseInt(length_cnt.innerHTML) >= 9))){
        color_changer(
            "#f5bb07",
            "drop-shadow(0 0 5px #f5bb07) drop-shadow(0 0 10px #f5bb07) drop-shadow(0 0 25px #f5bb07)"
        );
    }
    else {
        color_changer(
            "#c72c2c",
            "drop-shadow(0 0 5px #c72c2c) drop-shadow(0 0 10px #c72c2c) drop-shadow(0 0 25px #c72c2c)"
        );
    }
}

function color_changer(color, fill) {
    strength_color.style.backgroundColor = color;
    strength_color.style.filter = fill;
}


let checkbox_count = 0;
let allcheckbox = document.querySelectorAll("input[type=checkbox]");


// gives the total check box ticked at every instance
function handlecheckboxchange(){
    checkbox_count=0;
    allcheckbox.forEach((var_checkbox)=>{
        if(checkbox_count>=0)
        {
            checkbox_count++;
        }
    })

}

// count the checkbox
allcheckbox.forEach((var_checkbox)=>{
    var_checkbox.addEventListener('change',handlecheckboxchange());
})



let generate_btn = document.querySelector(".generator_password");


generate_btn.addEventListener('click',() => {
      
    // checkbox not choosen
    if(checkbox_count <=0){
        return;
    }

    //delete old password
    password_char="";


    let pass_characters=[]

    // now create password 
    if(Up.checked){
           pass_characters.push(generateUpperCase);
    }
    if(Lc.checked){
           pass_characters.push(generateLowerCase);
    }
    if(Nb.checked){
           pass_characters.push(generateNumber);
    }
    if(Sc.checked){
           pass_characters.push(generateSymbol);
    }

    // main sequence 

    for(let i = 0;i<pass_characters.length;i++ ){
        password_char+=pass_characters[i]();
    }
    for(let i =0;i<initial_length_password-pass_characters.length;i++){
        // selects the random value of characters 
        let random_select = getRndInteger(0,pass_characters.length);
        password_char+=pass_characters[random_select]();
    }
    password_shuffled = shufflePassword(Array.from(password_char));
    password.value = password_shuffled;
     calculate_strength();
})

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
      //random J, find out using random function
      const j = Math.floor(Math.random() * (i + 1));
      //swap number at i index and j index
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
  }
  let copy_popup= document.querySelector(".copy_message");
  let copy_btn= document.querySelector(".copy_btn");
//    let new_pass = document.querySelector(".display")
  copy_btn.addEventListener("click",()=>{
    if(password.value){
        copy_password(password.value);
    }
    else{
        copy_popup.innerText = "Failed!";
        copy_popup.classList.add("active");
        setTimeout(() => {
            copy_popup.classList.remove("active");
        },2000); 
    }
  })

async function copy_password(password_){
    try{
        console.log(password_);
        await navigator.clipboard.writeText(password_);
        copy_popup.innerText = "Copied!";
        console.log("2");
    }catch(e){
        console.log(e);
    }
    copy_popup.classList.add("active");
    setTimeout(() => {
        copy_popup.classList.remove("active");
    },2000); 
}
