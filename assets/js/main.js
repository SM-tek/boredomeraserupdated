/**
 * Template Name: HeroBiz - v1.0.0
 * Template URL: https://bootstrapmade.com/herobiz-bootstrap-business-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    /**
     * Sticky header on scroll
     */
    const selectHeader = document.querySelector('#header');
    if (selectHeader) {
        document.addEventListener('scroll', () => {
            window.scrollY > 50 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
        });
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = document.querySelectorAll('#navbar .scrollto');

    function navbarlinksActive() {
        navbarlinks.forEach(navbarlink => {

            if (!navbarlink.hash) return;

            let section = document.querySelector(navbarlink.hash);
            if (!section) return;

            let position = window.scrollY;
            if (navbarlink.hash != '#header') position += 200;

            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active');
            } else {
                navbarlink.classList.remove('active');
            }
        })
    }
    window.addEventListener('load', navbarlinksActive);
    document.addEventListener('scroll', navbarlinksActive);

    /**
     * Function to scroll to an element with top ofset
     */
    function scrollto(el) {
        const selectHeader = document.querySelector('#header');
        let offset = 0;

        if (selectHeader.classList.contains('sticked')) {
            offset = document.querySelector('#header.sticked').offsetHeight;
        } else if (selectHeader.hasAttribute('data-scrollto-offset')) {
            offset = selectHeader.offsetHeight - parseInt(selectHeader.getAttribute('data-scrollto-offset'));
        }
        window.scrollTo({
            top: document.querySelector(el).offsetTop - offset,
            behavior: 'smooth'
        });
    }

    /**
     * Fires the scrollto function on click to links .scrollto
     */
    let selectScrollto = document.querySelectorAll('.scrollto');
    selectScrollto.forEach(el => el.addEventListener('click', function(event) {
        if (document.querySelector(this.hash)) {
            event.preventDefault();

            let mobileNavActive = document.querySelector('.mobile-nav-active');
            if (mobileNavActive) {
                mobileNavActive.classList.remove('mobile-nav-active');

                let navbarToggle = document.querySelector('.mobile-nav-toggle');
                navbarToggle.classList.toggle('bi-list');
                navbarToggle.classList.toggle('bi-x');
            }
            scrollto(this.hash);
        }
    }));

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (document.querySelector(window.location.hash)) {
                scrollto(window.location.hash);
            }
        }
    });

    /**
     * Mobile nav toggle
     */
    const mobileNavToogle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToogle) {
        mobileNavToogle.addEventListener('click', function(event) {
            event.preventDefault();

            document.querySelector('body').classList.toggle('mobile-nav-active');

            this.classList.toggle('bi-list');
            this.classList.toggle('bi-x');
        });
    }

    /**
     * Toggle mobile nav dropdowns
     */
    const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

    navDropdowns.forEach(el => {
        el.addEventListener('click', function(event) {
            if (document.querySelector('.mobile-nav-active')) {
                event.preventDefault();
                this.classList.toggle('active');
                this.nextElementSibling.classList.toggle('dropdown-active');

                let dropDownIndicator = this.querySelector('.dropdown-indicator');
                dropDownIndicator.classList.toggle('bi-chevron-up');
                dropDownIndicator.classList.toggle('bi-chevron-down');
            }
        })
    });

    /**
     * Auto generate the hero carousel indicators
     */
    let heroCarouselIndicators = document.querySelector('#hero .carousel-indicators');
    if (heroCarouselIndicators) {
        let heroCarouselItems = document.querySelectorAll('#hero .carousel-item')

        heroCarouselItems.forEach((item, index) => {
            if (index === 0) {
                heroCarouselIndicators.innerHTML += `<li data-bs-target="#hero" data-bs-slide-to="${index}" class="active"></li>`;
            } else {
                heroCarouselIndicators.innerHTML += `<li data-bs-target="#hero" data-bs-slide-to="${index}"></li>`;
            }
        });
    }

    /**
     * Scroll top button
     */
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        const togglescrollTop = function() {
            window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
        window.addEventListener('load', togglescrollTop);
        document.addEventListener('scroll', togglescrollTop);
        scrollTop.addEventListener('click', window.scrollTo({
            top: 0,
            behavior: 'smooth'
        }));
    }

    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
        selector: '.glightbox'
    });

    /**
     * Porfolio isotope and filter
     */
    let portfolionIsotope = document.querySelector('.portfolio-isotope');

    if (portfolionIsotope) {

        let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
        let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
        let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

        window.addEventListener('load', () => {
            let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
                itemSelector: '.portfolio-item',
                layoutMode: portfolioLayout,
                filter: portfolioFilter,
                sortBy: portfolioSort
            });

            let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
            menuFilters.forEach(function(el) {
                el.addEventListener('click', function() {
                    document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
                    this.classList.add('filter-active');
                    portfolioIsotope.arrange({
                        filter: this.getAttribute('data-filter')
                    });
                    if (typeof aos_init === 'function') {
                        aos_init();
                    }
                }, false);
            });

        });

    }

    /**
     * Clients Slider
     */
    new Swiper('.clients-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 60
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 80
            },
            992: {
                slidesPerView: 6,
                spaceBetween: 120
            }
        }
    });

    /**
     * Testimonials Slider
     */
    // new Swiper('.testimonials-slider', {
    //     slidesPerView: 3,
    //     slidesPerGroup: 3,
    //     loop: true,
    //     loopFillGroupWithBlank: true,
    //     pagination: {
    //         el: ".swiper-pagination",
    //         clickable: true
    //     },

    // });
    // new Swiper('.testimonials-slider', {
    //     speed: 600,
    //     loop: true,
    //     autoplay: {
    //         delay: 5000,
    //         disableOnInteraction: false
    //     },
    //     slidesPerView: 'auto',
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'bullets',
    //         clickable: true
    //     }
    // });


    if (screen.width <= 560) {
        new Swiper(".testimonialSwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    } else if (screen.width <= 1000) {
        console.log('woking');
        new Swiper(".testimonialSwiper", {
            slidesPerView: 2,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    } else {
        new Swiper(".testimonialSwiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }
    /**
     * Animation on scroll function and init
     */
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    window.addEventListener('load', () => {
        aos_init();
    });

});

const secNav = document.querySelector('.sec-navigation');
const toggle = document.querySelector('.mobile-toggle');
if (toggle) {

    toggle.addEventListener('click', () => {
        const visibilty = secNav.getAttribute('data-visible', 'true');
        if (visibilty === 'false') {
            secNav.setAttribute('data-visible', true);
            toggle.setAttribute('class', 'mobile-toggle bi bi-x');
            toggle.setAttribute('aria-expanded', true);
        } else {
            secNav.setAttribute('data-visible', false);
            toggle.setAttribute('class', 'mobile-toggle bi bi-list');
            toggle.setAttribute('aria-expanded', false);
        }
    });
}

// const formSelect = document.getElementById('form-select');
// const distance = document.getElementById('distance-opt');
// if (formSelect) {
//     formSelect.addEventListener('click', () => {
//         distance.style.display = 'none'
//     })
// }
// let text = 0
// for (let i = 0; i < 20; i++) {
//     text = text + 5;
//     const option = document.createElement('option');
//     option.innerText = text;
//     if (formSelect) {
//         formSelect.appendChild(option)
//     }
// }

const numOfKids = document.getElementById('numOfKids');
if (numOfKids) {
    for (let i = 2; i <= 10; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', i)
        option.innerText = i
        numOfKids.appendChild(option)
    }
}


const addedKids = document.getElementById('addedKids');
const selectNumOfKids = () => {
    addedKids.innerHTML = ''
    const num = Number(numOfKids.value)
    for (let i = 0; i < num; i++) {
        const div1 = document.createElement('div');
        div1.setAttribute('class', 'form-group row');
        div1.setAttribute('style', 'margin-left: 11rem;');
        const label = document.createElement('label');
        label.setAttribute('class', 'col-sm-2 col-form-label width');
        label.innerHTML = `<b> Age of Kid ${i+1}: </b> `
        div1.appendChild(label);
        const div2 = document.createElement('div');
        div2.setAttribute('class', 'col-sm-3 flexb');
        div2.innerHTML = `<input type="text" class="form-control" placeholder="" required>
        <div class="input-group-prepend">
            <div class="input-group-text">Years</div>
        </div>`;
        div1.appendChild(div2);
        addedKids.appendChild(div1)
    }
}

const changePasswordCheck = () => {
    const check = document.getElementById('changePassword');
    const dim1 = document.getElementsByClassName('dim-color')[0];
    const dim2 = document.getElementsByClassName('dim-color')[1];
    const container = document.getElementById('change-password-container');
    if (check.checked) {
        container.removeAttribute('disabled');
        dim1.classList.remove("dim");
        dim2.classList.remove("dim");
    } else {
        dim1.classList.add('dim')
        dim2.classList.add('dim')
        container.setAttribute('disabled', 'disabled');
    }
}
const dropBtn = document.getElementsByClassName('drop-btn')[0];
if (dropBtn) {
    dropBtn.addEventListener('click', () => {
        document.getElementsByClassName('drop-ul')[0].classList.toggle('active')
    })
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
if (btn) {
    btn.onclick = function() {
        modal.style.display = "block";
        document.body.classList.add('bodytag')
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        document.body.classList.remove('bodytag')

    }
}

const popbtn = document.getElementById('popbtn');
const closepop = document.getElementById('closepop');
if (popbtn) {
    popbtn.addEventListener('click', () => {
        const popup1 = document.getElementById('popup1');
        popup1.classList.add('active');
        document.body.classList.add('bodytag')
    })
    closepop.addEventListener('click', () => {
        popup1.classList.remove('active')
        document.body.classList.remove('bodytag')
    })
}