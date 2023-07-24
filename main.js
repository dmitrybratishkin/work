    // класс для создание таймера обратного отсчета
    class CountdownTimer {
        constructor(deadline, cbChange, cbComplete) {
          this._deadline = deadline;
          this._cbChange = cbChange;
          this._cbComplete = cbComplete;
          this._timerId = null;
          this._out = {
            days: '', hours: '', minutes: '', seconds: '',
            daysTitle: '', hoursTitle: '', minutesTitle: '', secondsTitle: ''
          };
          this._start();
        }
        static declensionNum(num, words) {
          return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
        }
        _start() {
          this._calc();
          this._timerId = setInterval(this._calc.bind(this), 1000);
        }
        _calc() {
          const diff = this._deadline - new Date();
          const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
          const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
          const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
          const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
          this._out.days = days < 10 ? '0' + days : days;
          this._out.hours = hours < 10 ? '0' + hours : hours;
          this._out.minutes = minutes < 10 ? '0' + minutes : minutes;
          this._out.seconds = seconds < 10 ? '0' + seconds : seconds;
          this._out.daysTitle = CountdownTimer.declensionNum(days, ['день', 'дня', 'дней']);
          this._out.hoursTitle = CountdownTimer.declensionNum(hours, ['час', 'часа', 'часов']);
          this._out.minutesTitle = CountdownTimer.declensionNum(minutes, ['минута', 'минуты', 'минут']);
          this._out.secondsTitle = CountdownTimer.declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
          this._cbChange ? this._cbChange(this._out) : null;
          if (diff <= 0) {
            clearInterval(this._timerId);
            this._cbComplete ? this._cbComplete() : null;
          }
        }
      }
  
      document.addEventListener('DOMContentLoaded', function() {
        // конечная дата, например 1 июля 2021
        const deadline = (function(y, m, d, h) { return new Date(y, m-1, d, h); })(2023, 08, 11, 10);
        // id таймера
        let timerId = null;
        // склонение числительных
        function declensionNum(num, words) {
          return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
        }
        // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
        function countdownTimer() {
          const diff = deadline - new Date();
          if (diff <= 0) {
            clearInterval(timerId);
          }
          const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
          const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
          const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
          const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
          $days.textContent = days < 10 ? '0' + days : days;
          $hours.textContent = hours < 10 ? '0' + hours : hours;
          $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
          $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
          $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
          $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
          $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
          $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
        }
        // получаем элементы, содержащие компоненты даты
        const $days = document.querySelector('.timer__days');
        const $hours = document.querySelector('.timer__hours');
        const $minutes = document.querySelector('.timer__minutes');
        const $seconds = document.querySelector('.timer__seconds');
        // вызываем функцию countdownTimer
        countdownTimer();
        // вызываем функцию countdownTimer каждую секунду
        timerId = setInterval(countdownTimer, 1000);
      });
