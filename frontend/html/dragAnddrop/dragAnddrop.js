const menu = document.querySelector('.menu-list');
const menuItem = document.querySelectorAll('.menu-item');
const dragbox = document.querySelector('.drag-here');

menu.addEventListener('dragstart', (e) => {
  e.target.classList.add('dragging');
});

menu.addEventListener('dragend', (e) => {
  e.target.classList.remove('dragging');
});

menu.addEventListener('drag', (e) => {
  console.log(e.target);
});

dragbox.addEventListener('dragover', (e) => {
  console.log(e.target);
});

dragbox.addEventListener('drop', () => {});
