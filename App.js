
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-model');
const tabs = document.querySelectorAll('.oparation__tab');
const tabContainer = document.querySelector('.oparation__tab--container');
const tabcontent = document.querySelectorAll('.opration_content');
const nav = document.querySelector('nav');
const section1 = document.querySelector('#section--1');
const manutoggle = document.querySelector('.manu-box');
const manufeed = document.querySelector('.nav__links');


/////////////////////////////////////////////////////////////////
const openModal = function (e) {
      e.preventDefault();
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
};

const closeModal = function () {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
      }
});

//////////// Toggle Manu

manutoggle.addEventListener('click', function () {
      const visiblety = manufeed.getAttribute('data-visible');
      if (visiblety === 'false') {
            manufeed.setAttribute('data-visible', true);
            manutoggle.setAttribute('aria-expanded', true);
      } else {
            manufeed.setAttribute('data-visible', false);
            manutoggle.setAttribute('aria-expanded', false);
      }


});

///////////

////////////

tabContainer.addEventListener('click', (e) => {
      const clicked = e.target.closest('.oparation__tab');

      //Grand Clause
      if (!clicked) return;


      // Active tab
      tabs.forEach(t => t.classList.remove('btn_tab--active'));
      clicked.classList.add('btn_tab--active');

      // Active contet area
      tabcontent.forEach(t => t.classList.remove('opration_content--active'));
      document.querySelector(`.opration_content--${clicked.dataset.tab}`).classList.add('opration_content--active');
});





//Manu fead animation
const HandOver = function (e) {
      if (e.target.classList.contains('nav__link')) {
            const link = e.target;
            const siblings = link.closest('.nav').querySelectorAll('.nav__link');
            const logo = link.closest('.nav').querySelector('img');

            siblings.forEach(el => {
                  if (el !== link) {
                        el.style.opacity = this;
                  }
            });
            logo.style.opacity = this;
      }
}

nav.addEventListener('mouseover', HandOver.bind(0.5));
nav.addEventListener('mouseout', HandOver.bind(1));

/////// Sticky NavBar
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height

const obscallback = function (entries) {
      entries.forEach(entry => {
            if (!entry.isIntersecting) {
                  nav.classList.add('sticky');
            } else {
                  nav.classList.remove('sticky');
            }
      });
}
const obsoption = {
      root: null,
      threshold: 0,
      rootMargin: `-${navHeight}px`,

}
const observer = new IntersectionObserver(obscallback, obsoption);
observer.observe(header);





////////// Revale Section
const allsection = document.querySelectorAll('.section');

const sectionCallback = function (entries, observe) {
      const [entry] = entries;

      if (!entry.isIntersecting) return;
      entry.target.classList.remove('section--hidden');
      SectionObs.unobserve(entry.target);
};

const SectionObs = new IntersectionObserver(sectionCallback, {
      root: null,
      threshold: 0.15,
});

allsection.forEach(Section => {
      SectionObs.observe(Section);
      Section.classList.add('section--hidden');
});




//// Lazy Images 
const Imgtarget = document.querySelectorAll('img[data-src]');

const loadimg = function (entrie, observe) {
      const [entry] = entrie;

      if (!entry.isIntersecting) return;

      //replace Dataset 
      entry.target.src = entry.target.dataset.src;

      entry.target.addEventListener('load', () => {
            entry.target.classList.remove('lazy-img');
      });
      imgObs.unobserve(entry.target);
}
const imgObs = new IntersectionObserver(loadimg, {
      root: null,
      threshold: 0,
});

Imgtarget.forEach(img => imgObs.observe(img));



//////Slider 


const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const dotclass = document.querySelector('.dots');

let curSlide = 0;
const MaxSlide = slides.length;



const createdots = function () {
      slides.forEach((_, i) => {
            dotclass.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
      });
}
createdots(0)



const ActiveDots = function (slidein) {
      document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
      document.querySelector(`.dots__dot[data-slide='${slidein}']`).classList.add('dots__dot--active');
}
ActiveDots(0);


const gotoslide = function (slide) {
      slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
}
gotoslide(0);


const NextSlide = function () {
      if (curSlide === MaxSlide - 1) {
            curSlide = 0;
      } else {
            curSlide++;
      }
      gotoslide(curSlide);
      ActiveDots(curSlide);
}

const PrevSlide = function () {
      if (curSlide === 0) {
            curSlide = MaxSlide - 1;
      } else {
            curSlide--;
      }
      gotoslide(curSlide);
      ActiveDots(curSlide);
}


//Event hendlers
btnRight.addEventListener('click', NextSlide);
btnLeft.addEventListener('click', PrevSlide);

document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') NextSlide();
      if (e.key === 'ArrowLeft') PrevSlide();
});

dotclass.addEventListener('click', function (e) {
      if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            gotoslide(slide);
            ActiveDots(slide);
      }
});
