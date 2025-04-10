import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

     const startBtn = document.querySelector('[data-start]');
        const input = document.querySelector('#datetime-picker');
        const daysSpan = document.querySelector('[data-days]');
        const hoursSpan = document.querySelector('[data-hours]');
        const minutesSpan = document.querySelector('[data-minutes]');
        const secondsSpan = document.querySelector('[data-seconds]');

        let selectedDate = null;
        let timerId = null;

    const fp = flatpickr(input, {
            enableTime: true,
            time_24hr: true,
            defaultDate: new Date(),
            minuteIncrement: 1,
            onClose(selectedDates) {
                selectedDate = selectedDates[0];
                if (selectedDate < new Date()) {
                    iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
    position: 'topRight', 
  });
  // Вимкнути кнопку
  startBtn.disabled = true;
} else {
  
  iziToast.success({
    title: 'Success',
    message: 'Дата вибрана правильно',
    position: 'topRight',
  });
  // Розблокувати кнопку
  startBtn.disabled = false;}
            },
        });

        startBtn.addEventListener('click', () => {
            startBtn.disabled = true;
            timerId = setInterval(() => {
                const now = new Date();
                const delta = selectedDate - now;

                if (delta <= 0) {
                    clearInterval(timerId);
                    updateTimer(0);
                    return;
                }

                updateTimer(delta);
            }, 1000);
        });

        function updateTimer(ms) {
            const time = convertMs(ms);
            daysSpan.textContent = addLeadingZero(time.days);
            hoursSpan.textContent = addLeadingZero(time.hours);
            minutesSpan.textContent = addLeadingZero(time.minutes);
            secondsSpan.textContent = addLeadingZero(time.seconds);
        }

        function addLeadingZero(value) {
            return String(value).padStart(2, '0');
        }

        function convertMs(ms) {
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            const days = Math.floor(ms / day);
            const hours = Math.floor((ms % day) / hour);
            const minutes = Math.floor(((ms % day) % hour) / minute);
            const seconds = Math.floor((((ms % day) % hour) % minute) / second);

            return { days, hours, minutes, seconds };
        }