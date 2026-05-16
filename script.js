
    // HAMBURGER MENU TOGGLE
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    const navLinks = document.querySelectorAll(".mobile-menu a");

    hamburger.addEventListener("click", function() {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener("click", function() {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function(e) {
      if (!e.target.closest("nav")) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
      }
    });

    // GSAP
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-text h1",{
      y:80,
      opacity:0,
      duration:1.2,
      ease:"power4.out"
    });

    gsap.from(".hero-text p",{
      y:40,
      opacity:0,
      duration:1,
      delay:0.3
    });

    gsap.from(".hero-buttons",{
      y:30,
      opacity:0,
      duration:1,
      delay:0.5
    });

    gsap.from(".perfume-frame",{
      scale:0.9,
      opacity:0,
      duration:1.4,
      ease:"power4.out"
    });

    // Reveal animations
    gsap.utils.toArray("section").forEach((section)=>{
      gsap.from(section,{
        opacity:0,
        y:80,
        duration:1,
        scrollTrigger:{
          trigger:section,
          start:"top 85%"
        }
      });
    });

    // Cursor Glow
    const glow = document.querySelector(".cursor-glow");

    window.addEventListener("mousemove",(e)=>{
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });

    // Scroll Progress
    window.addEventListener("scroll",()=>{
      const scrollTop = document.documentElement.scrollTop;
      const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
      const scrolled = (scrollTop/height)*100;
      document.querySelector(".progress").style.width = scrolled + "%";
    });

    // DARK MODE TOGGLE
    const darkModeToggle = document.getElementById("darkModeToggle");
    const htmlElement = document.documentElement;

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "enabled") {
      document.body.classList.add("dark-mode");
      htmlElement.setAttribute("data-dark-mode", "true");
    }

    darkModeToggle.addEventListener("click", function() {
      document.body.classList.toggle("dark-mode");
      
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        htmlElement.setAttribute("data-dark-mode", "true");
      } else {
        localStorage.setItem("darkMode", "disabled");
        htmlElement.setAttribute("data-dark-mode", "false");
      }
    });
      document.documentElement.clientHeight;

      const progress = (scrollTop / height) * 100;

      document.querySelector(".progress").style.width = progress + "%";
    ;

    // Floating animation
    gsap.to(".floating-card",{
      y:-15,
      duration:3,
      repeat:-1,
      yoyo:true,
      ease:"sine.inOut",
      stagger:0.4
    });
