// all variables
let colorStorage = localStorage.getItem("color-change");
let listColor = document.querySelectorAll(".toggle-settings .box-container .color-list li");
let btnGear = document.querySelector(".toggle-settings .gear-container");
let randomBackgroundStorage = localStorage.getItem("random-background");
let imgArray = ["../IMGS/slide1.webp", "../IMGS/slide2.webp", "../IMGS/slide3.webp", "../IMGS/slide4.webp", "../IMGS/slide5.webp", "../IMGS/slide6.jpg"]
let globalInterval;
let btnRandomBackground = document.querySelectorAll(".toggle-settings .option-box .random-btn span"); 
let btnClearBullet =  document.querySelectorAll(".toggle-settings .option-box .clear-bullet span");
let clearBulletsLocalStorage = localStorage.getItem("clearBullets");

//start landing page and change img

//function to randomize background 

let randomized = function () {
    globalInterval = setInterval (()=> {
        let randomNum =Math.floor( Math.random() * imgArray.length)
        let landingImg = document.querySelector(".landing-image");
        landingImg.style.backgroundImage = `url(${imgArray[randomNum]})`
    },1000);
}

//function to clear active class from setting yes or no
let clearActive = function (elements) {
    elements.forEach((e) => {
        e.classList.remove("active");
    })
}

//check color of local storage
if (colorStorage != null ) {
    document.documentElement.style.setProperty("--main-color", colorStorage);
    listColor.forEach(e=> {
    if (e.dataset.color === colorStorage ) {
        e.classList.add("active")
    } else {
        e.classList.remove("active");
    }
    })
} else {
    console.log("not founded")
};

//check random background from local storage
if(randomBackgroundStorage !== null && randomBackgroundStorage === "true") {
    document.querySelector(".yesbtn").classList.add("active");
    randomized();
} else {
    document.querySelector(".nobtn").classList.add("active");
    clearInterval(globalInterval);
}

//check clear bullets from local storage
if(clearBulletsLocalStorage !== null && clearBulletsLocalStorage === "true") {
    document.querySelector(".yesbullet").classList.add("active");
    document.querySelector(".bullets").style.display = "block";
} else {
    document.querySelector(".nobullet").classList.add("active");
    document.querySelector(".bullets").style.display = "none";
}


// start settings and color click
listColor.forEach((li)=> {
    li.addEventListener("click", e => {
        document.documentElement.style.setProperty("--main-color", li.dataset.color);
        localStorage.setItem("color-change",li.dataset.color);
        listColor.forEach(lirmv => {
            lirmv.classList.remove("active");
        });
        li.classList.add("active")
    })
})

// add event to setting gear to open setting bar
btnGear.addEventListener("click", () => {
    document.querySelector(".toggle-settings").classList.toggle("open");
    document.querySelector(".fa-gear").classList.toggle("fa-spin")
})

//random background option

btnRandomBackground.forEach((btn)=> {
    btn.addEventListener("click", (e)=> {
        clearActive(btnRandomBackground);
        e.target.classList.add("active");
        if (e.target.dataset.random === "true") {
            localStorage.setItem("random-background",true);
            randomized()
        } else {
            localStorage.setItem("random-background",false);
            clearInterval(globalInterval)
        }
    })
})

// Animate The Skills Section
let ourSkills = document.querySelector(".our-skills");

    
window.addEventListener("scroll",()=>{
    //Skills OffsetTop
    let skillOffsetTop = ourSkills.offsetTop;

    //skills OffsetHeight
    let skillOffsetHeight = ourSkills.offsetHeight;

    //windows height
    let windowsHeight = this.innerHeight;

    //windows scroll top

    let windowScrollTop = this.scrollY;

    if(windowScrollTop > ((skillOffsetHeight + skillOffsetTop) - windowsHeight)) {
        let skills = document.querySelectorAll(".our-skills .skill-box .skill-progress span");
        skills.forEach((span)=> {
            span.style.cssText= `width: ${span.dataset.progress}`;
        })
    }
})

//popup gallery imgs

let galleryImgs = document.querySelectorAll(".gallery-section .gallrey-imgs img");

galleryImgs.forEach(imgs => {
    imgs.addEventListener("click",(e)=> {
        let overlayPopup = document.createElement("div");

        overlayPopup.className = "overlay-popup"
    
        document.body.appendChild(overlayPopup);

        let popupBox = document.createElement("div");

        popupBox.className = "popup-box"

        if (imgs.alt !== null ) {
            let imgTitle = document.createElement("h4");

            imgTitle.className = "title-popup"

            imgTitle.innerHTML = imgs.alt;

            popupBox.appendChild(imgTitle); 
        }

        let imgPopup = document.createElement("img");

        imgPopup.src = imgs.src;

        popupBox.appendChild(imgPopup);

        document.body.appendChild(popupBox);

        let closePopup = document.createElement("i");

        closePopup.className = "close-popup fa fa-close";
        closePopup.id = "close-btn"
        
        popupBox.appendChild(closePopup);

        let closeBtn = popupBox.querySelector("#close-btn");

        closeBtn.addEventListener("click", e=> {
            popupBox.classList.add("hide");
            overlayPopup.classList.add("hide");
        })
    })
})

//configure bullets

let allBullets = document.querySelectorAll(".bullets .bullet");

allBullets.forEach(bullet => {
    bullet.addEventListener("click", (e)=> {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior :"smooth"
        })

    })
})

//configure nav bar 

let allNavSections =  document.querySelectorAll(".navbar-content li");

allNavSections.forEach(section => {
    
    section.addEventListener("click", (e)=> {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior :"smooth"
        })
    })
})

//configure home btn 
const homeBtn = document.querySelector(".home-btn");
document.onscroll = function () {
    if (window.scrollY > 90) {
        homeBtn.style.display = "block";
    } else {
        homeBtn.style.display = "none";
    }
}

homeBtn.addEventListener("click", e => {
    document.querySelector(".landing-page").scrollIntoView({
        behavior:"smooth"
    })
})

// clear bullet 


btnClearBullet.forEach (span => {
    span.addEventListener("click", e => {
        if (span.dataset.bullet === "false") {
            let bullets = document.querySelector(".bullets");
            bullets.style.display = "none";
            localStorage.setItem("clearBullets",span.dataset.bullet);
            clearActive(btnClearBullet);
            e.target.classList.add("active");
        } else if (span.dataset.bullet === "true") {
            let bullets = document.querySelector(".bullets");
            bullets.style.display = "block";
            localStorage.setItem("clearBullets",span.dataset.bullet);
            clearActive(btnClearBullet);
            e.target.classList.add("active"); 
        }
    })
})

// reset settings 
document.querySelector('.toggle-settings .Reset-btn button').addEventListener('click',(e) => {
    localStorage.removeItem("color-change");
    localStorage.removeItem("random-background");
    localStorage.removeItem("clearBullets");
    window.location.reload();
} )

//customize toggle menu

const toggleMenu = document.querySelector(".toggle-menu");

toggleMenu.addEventListener("click", (e)=> {
    e.preventDefault();
    document.querySelector(".navbar-content").classList.toggle("open");
})