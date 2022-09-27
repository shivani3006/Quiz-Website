const naam = document.getElementById("name");
const roll_no = document.getElementById("roll_no")
const email = document.getElementById("email");
const myDate = document.getElementById("date of birth");
const phone_no = document.getElementById("phone_no");

function submit_func(){

    localStorage.setItem("Name",naam);
    localStorage.setItem("Roll",roll_no);
    localStorage.setItem("Email",email);
    localStorage.setItem("DOB",myDate);

    window.open("Instructions.html","_self");
}