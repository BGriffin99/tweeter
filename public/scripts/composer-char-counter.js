$(document).ready(function() {
    const MAX_CHARACTERS = 140;
    const textArea = $('.new-tweet textarea');
    const counter = $('.new-tweet .counter');
    
    textArea.on('input', function() {
      const charsLeft = MAX_CHARACTERS - $(this).val().length;
      counter.text(charsLeft);
      
      if (charsLeft < 0) {
        counter.addClass('invalid');
      } else {
        counter.removeClass('invalid');
      }
    });
  });