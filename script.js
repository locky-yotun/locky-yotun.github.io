(function () {
    window.addEventListener('DOMContentLoaded', () => {
        const formEl = document.querySelector('form');
        
        formEl.addEventListener('submit', handleSubmit, false);
        
        function handleSubmit(event) {
            console.log('[zaytsev] {event}: ', {event});
        }
    });
})();
