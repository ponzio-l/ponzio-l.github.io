document.addEventListener('DOMContentLoaded', () => {
  if(window.location.href.indexOf('?i') > -1) {
    document.querySelector('.copyright').remove();
  }
})