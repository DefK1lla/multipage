document.addEventListener('DOMContentLoaded', () => {
  // Accardeon
  const moduleHeads = document.querySelectorAll('.marathon__module-head');

  let moduleItem, moduleBody;

  moduleHeads.forEach(function (moduleHeadsItem) {
    moduleHeadsItem.addEventListener('click', () => {
      if (moduleHeadsItem.classList.contains('marathon__module-head--active')) {
        moduleHeadsItem.classList.remove('marathon__module-head--active');
      } else {
        moduleHeadsItem.classList.add('marathon__module-head--active');
      }
      moduleItem = moduleHeadsItem.closest('.marathon__module-item');
      moduleBody = moduleItem.querySelector('.marathon__module-body');

      if (moduleBody.classList.contains('marathon__module-body--active')) {
        moduleBody.classList.remove('marathon__module-body--active');
      } else {
        moduleBody.classList.add('marathon__module-body--active');
      }
    });
  });



  // Timer
  let lastDate = new Date("Oct 14 2025 00:00:00");

  let now = new Date(),
    leftUntil = lastDate - now;

  const timer = document.querySelector('.timer'),
    daysVal = document.getElementById('days'),
    hoursVal = document.getElementById('hours'),
    minutesVal = document.getElementById('minutes'),
    secondsVal = document.getElementById('seconds'),
    daysText = document.getElementById('daysText'),
    hoursText = document.getElementById('hoursText'),
    minutesText = document.getElementById('minutesText'),
    secondsText = document.getElementById('secondsText');

  const declOfNum = (number, texts) => {
    let cases = [2, 0, 1, 1, 1, 2];
    return texts[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  const addZero = (number) => {
    if (number <= 9) {
      return '0' + number;
    } else {
      return number;
    }
  };

  const timeCounter = () => {
    now = new Date();
    leftUntil = lastDate - now;

    let leftDays = Math.floor(leftUntil / 1000 / 60 / 60 / 24),
      leftHours = Math.floor((leftUntil / 1000 / 60 / 60) % 24),
      leftMinutes = Math.floor((leftUntil / 1000 / 60) % 60),
      leftSeconds = Math.floor((leftUntil / 1000) % 60);

    daysVal.textContent = addZero(leftDays);
    hoursVal.textContent = addZero(leftHours);
    minutesVal.textContent = addZero(leftMinutes);
    secondsVal.textContent = addZero(leftSeconds);

    daysText.textContent = declOfNum(leftDays, ['День', 'Дня', 'Дней']);
    hoursText.textContent = declOfNum(leftHours, ['Час', 'Часа', 'Часов']);
    minutesText.textContent = declOfNum(leftMinutes, ['Минута', 'Минуты', 'Минут']);
    secondsText.textContent = declOfNum(leftSeconds, ['Секунда', 'Секунды', 'Секунд']);
  };

  if (timer && leftUntil > 0) {
    timeCounter();
    setInterval(timeCounter, 1000);
  }


  // Modal
  const videoLinks = document.querySelectorAll('.video-link'),
    modal = document.querySelector('.modal');

  let videoId, video;

  videoLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      videoId = link.getAttribute('href');
      video = document.querySelector(videoId);
      video.src = video.dataset.src;

      modal.classList.add('modal--active');
      video.classList.add('modal__video--active');

      document.querySelector('html, body').classList.add('no-scroll');
    });
  });

  const modalClose = document.querySelector('.modal__close');

  if (modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('modal--active');
      video.src = '/';
      video.classList.remove('modal__video--active');
      document.querySelector('html, body').classList.remove('no-scroll');

    });
  }



  // Slider
  const slider = document.querySelector('.slider'),
    sliderItems = document.querySelectorAll('.slider__item'),
    sliderPrev = document.querySelector('.slider__prev'),
    sliderNext = document.querySelector('.slider__next');

  let index = 0;

  const slideChanger = (i) => {
    sliderItems.forEach((sliderItem) => {
      sliderItem.classList.remove('slider__item--active');
    });

    sliderItems[i].classList.add('slider__item--active');
  };

  if (slider) {
    sliderPrev.addEventListener('click', () => {
      if (index == 0) {
        index = sliderItems.length - 1;
        slideChanger(index);
      } else {
        index--;
        slideChanger(index);
      }
    });

    sliderNext.addEventListener('click', () => {
      if (index === sliderItems.length - 1) {
        index = 0;
        slideChanger(index);
      } else {
        index++;
        slideChanger(index);
      }
    });
  }
});






