var siteName = document.getElementById("siteNameId");
var siteURL = document.getElementById("siteUrlId");
var overlaytag = document.querySelector(".overlay");
var ma5zan = [];
var submitBtn = document.getElementById("submitBtn");


if (localStorage.getItem("ourLocalData")) {
    ma5zan = JSON.parse(localStorage.getItem("ourLocalData"));
    for (var x = 0; x < ma5zan.length; x++) {
      displaySites(x);
    }
  }



//   adding sites to table by submit button

  function addBook()
{
//    1==== add sites to array

if (siteName.classList.contains("is-valid") &&
siteURL.classList.contains("is-valid"))
{
  var oneBook = 
  {
   siteName : document.getElementById("siteNameId") .value,
   siteURL : document.getElementById("siteUrlId") . value,
  }

ma5zan.push(oneBook);
 

  localStorage.setItem("ourLocalData" , JSON.stringify(ma5zan))

//    2====clear all inputs
clear();




// 3=========display 
displaySites();

siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");

}

else
{
    overlaytag.classList.replace("d-none", "d-flex");
}    
} ;
  





// ==================================clear function 
function clear()
{
    document.getElementById("siteNameId").value = null;
    document.getElementById("siteUrlId").value = null;
}

// =============================Display function 

function displaySites()
{

var cartona="";

for(var i=0 ; i< ma5zan.length ; i++)
{
   cartona += `<tr>
                      <td>` +ma5zan[i].siteName+ `</td>
                      <td>` +ma5zan[i].siteURL+ `</td>
                      <td>
                      
                      <a href="${ma5zan[i].siteURL}" target="_blank"><button class="btn btn-visit">
             <i class="fa-solid fa-eye pe-2"></i>
             Visit
         </button></a>
                      <td>
                      <button onclick="del(`+i+`)" class="btn btn-outline-danger"> Delete</button></td>
   
   
   
   
   </tr>`
}



    document.getElementById("tBody").innerHTML = cartona; 



}


//------------------------========delete function
function del(pIndex)
{
    ma5zan.splice(pIndex , 1)
    localStorage.setItem("ourLocalData" , JSON.stringify(ma5zan))
    displaySites()

}


// ===========================Validation using regex

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () 
{
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () 
{
  validate(siteURL, urlRegex);
});


function validate(element, regex)
 {
  var testRegex = regex;
  if (testRegex.test(element.value)) 
  {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  }
   else 
  {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}



// closing the overlay

document.querySelector(".esc").addEventListener("click" ,  hideOverLay)

function  hideOverLay()
{
    overlaytag.classList.replace("d-flex" , "d-none");
}

document.addEventListener("click" , function(einfo){

    if(einfo.target == overlaytag)
    {
        hideOverLay() ;
    }
})

document.addEventListener("keydown", function(einfo){
    if (einfo.key == "Escape")
    {
        hideOverLay() ;
    }
})
