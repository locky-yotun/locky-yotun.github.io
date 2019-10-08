(function () {
    window.addEventListener('DOMContentLoaded', () => {
        const buttonEl = document.querySelector('button');
        
        const modalEl = document.querySelector('.shadow');
        const bodyEl = document.querySelector('body');
        const htmlEl = document.querySelector('html');
        
        buttonEl.addEventListener('click', showModal, false);
        
        function showModal() {
          modalEl.classList.toggle('visible');
          bodyEl.classList.toggle('visible');
          htmlEl.classList.toggle('visible');
        }
    });
})();
