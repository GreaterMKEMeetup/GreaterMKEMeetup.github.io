// Don't muddy the global scope!
(function($) {
  var selectedAmount = undefined,
  selectedAmountParagraph = $('p.selected-amount'),
  form = $('form.donation-form'),
  selectedAmountSpan = $('p.selected-amount span.amount'),
  hiddenAmount = $('input[type="hidden"].hidden-amount')
  radioAmount = $('form.donation-form input[type="radio"]'),
  customAmount = $('form.donation-form input[type="text"]'),
  donateButton = $('button.donate'),
  spanVisible = false;

  toggleSelectedAmount = function (show) {
    selectedAmountParagraph.toggle(show);
  };

  // http://stackoverflow.com/a/9716488/717932
  isValidAmount = function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  resetInput = function () {
    $(customAmount).val('');
  };

  amountChangedCallback = function (event) {
    // reset the input if the user selects a radio button.
    if ($(event.target).attr('type') === 'radio') {
      resetInput();
    } else {
      $(radioAmount).removeAttr('checked');
    }
    var value = $(event.target).val();
    if (isValidAmount(value)) {
      if (value !== '') {
        selectedAmountSpan.text(value);
        selectedAmount = value;
        $(hiddenAmount).val(selectedAmount);
        if (!spanVisible) {
          spanVisible = true;
          toggleSelectedAmount(spanVisible);
        }
      }
    } else {
      resetInput();
    }
  };

  paypalCallback = function () {
    $(form).submit();
  }

  $(radioAmount).click(amountChangedCallback);
  $(customAmount).bind('focusout', amountChangedCallback);
  $(donateButton).click(paypalCallback);

  toggleSelectedAmount(spanVisible);
})(jQuery);
