(function () {
    window.addEventListener('DOMContentLoaded', () => {
        const buttonEl = document.querySelector('button');
        
        const modalEl = document.querySelector('.shadow');
        const bodyEl = document.querySelector('body');
        const htmlEl = document.querySelector('html');
        
        buttonEl.addEventListener('click', showModal, false);
        
        function showModal() {
          modalEl.classList.add('visible');
          bodyEl.classList.add('visible');
          htmlEl.classList.add('visible');
        }
    });
})();
