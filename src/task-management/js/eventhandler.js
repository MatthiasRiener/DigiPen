$('body').on('click', '.task-item', function () {
   let taskPosition = $(this).offset();

   $('#taskPopup').css(taskPosition);
});