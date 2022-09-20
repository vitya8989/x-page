// header

const burger = document.querySelector('.js_burger');
const mobMenu = document.querySelector('.js_mob_menu');
const mobMenuBg = document.querySelector('.js_mob_menu_bg');
const accordions = document.querySelectorAll('.js_mob_accordion');

if (burger && mobMenu && accordions && mobMenuBg) {
    burger.addEventListener('click', () => {
       mobMenu.classList.toggle('open');
       burger.classList.toggle('burger-open');
       mobMenuBg.classList.toggle('active');
       document.body.classList.toggle('scroll-lock');

       for (let i = 0; i < accordions.length; i++) {
           let accordionBody = accordions[i].querySelector('.js_mob_accordion_body');
           let accordionHead = accordions[i].querySelector('.js_mob_accordion_head');

           if (!(mobMenu.classList.contains('open')) && accordionBody.classList.contains('open') && accordionHead.classList.contains('active')) {
               hideBody(accordionBody, accordionHead);
           }
       }
    });

    accordionsAnim(accordions, '.js_mob_accordion_head', '.js_mob_accordion_body');
    window.addEventListener('resize', () => {
        accordionsAnim(accordions, '.js_mob_accordion_head', '.js_mob_accordion_body');
    });
}

function accordionsAnim(accordions, headClass, bodyClass) {
    for (let i = 0; i < accordions.length; i++) {
        let accordionHead = accordions[i].querySelector(headClass);
        let accordionBody = accordions[i].querySelector(bodyClass);

        if (accordionBody.classList.contains('open') || window.innerWidth >= 1024) {
            accordionBody.style.height = 'auto';
        } else {
            accordionBody.style.height = '0';
        }
        accordionHead.onclick = () => {
            if (window.innerWidth < 1024) {
                if (accordionBody.classList.contains('open')) {
                    hideBody(accordionBody, accordionHead);
                } else {
                    showBody(accordionBody, accordionHead);
                }
            }
        }
    }
}

function hideBody(body, head) {
    head.classList.remove('active');
    body.classList.remove('open');
    body.style.height = '0';
}

function showBody(body, head) {
    head.classList.add('active');
    body.classList.add('open');
    body.style.height = `${body.scrollHeight}px`;
}


// datepicker

const dateInput = document.getElementById('date_input')

if (dateInput) {
    const datepickerHead = document.querySelector('.datepicker');
    const datepickerValue = datepickerHead.querySelector('.datepicker__value');

    datepickerHead.addEventListener('click', () => {
        datepickerHead.classList.add('active');
    });

    const picker = datepicker('#datepicker', {
        customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        startDay: 1,
        showAllDates: true,
        onSelect: (instance, date) => {
            const value = formatDate(date);
            dateInput.value = value;
            datepickerValue.textContent = value;
        },
        onHide: instance => {
            datepickerHead.classList.remove('active');
        },
    });

    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '/' + mm + '/' + yy;
    }

}


// select

const select = document.querySelectorAll('.select');

if (select.length > 0) {
    const choices = new Choices('.select', {
        searchEnabled: false,
        shouldSort: false
    });
}

// detail

const defaultBlock = document.querySelector('.detail__default');

if (defaultBlock) {
    const defaultBlockDivs = defaultBlock.querySelectorAll('div');
    const videoWrapper = findVideoWrapper(defaultBlockDivs);
    const video = videoWrapper.querySelector('video');
    const playButton = videoWrapper.querySelector('span');

    videoWrapper.onclick = () => {
        if (video.paused) {
            video.play();
            playButton.style.opacity = '0';
        } else {
            video.pause();
            playButton.style.opacity = '1';
        }
    }
}

function findVideoWrapper (arr) {
    let videoWrapper
    if (arr.length > 1) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].querySelector('video')) {
                videoWrapper = arr[i];
                return videoWrapper;
            }
        }
    } else if (arr.length === 1) {
        videoWrapper = arr[0];
        return videoWrapper;
    }
}

// detail_form

const fileInput = document.getElementById('file');

if (fileInput) {
    fileInput.oninput = () => {
        fileInput.nextElementSibling.textContent = fileInput.files[0].name
    }
}