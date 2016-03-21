(function(){
  function checkLoaded() {
    return document.readyState === "complete";
  }

  var main = function(){
    // Functions
    selectVal = function(selector, text){
      var $el = $(selector).eq(0);
      if ($el.length) {
        var optionId = $el.find('option').filter(function(i, el){ return el.textContent == text}).val();
        $el.val(optionId)
      }
    };

    selectMaxVal = function(selector, text){
      var $el = $(selector).eq(0);
      if ($el.length) {
        var optionIds = $el.find('option').map(function(i, el){ return el.value}).sort();
        if (!optionIds.length) return;
        var optionId = optionIds[optionIds.length - 1];
        $el.val(optionId);
      }
    };

    focus = function (selector) {
      $(selector).focus();
    };

    // Handlers
    onCreateRequestClick = function() {
      // Открываем форму редактирования
      showAndScrollTo("update", "issue_notes");

      selectVal('#issue_status_id', 'Решена');
      selectVal('#issue_assigned_to_id', '<< мне >>');
      selectVal('#issue_done_ratio', '100 %');
      selectMaxVal('#issue_fixed_version_id');
      var today = new Date();
      $('#issue_due_date').val(today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getDate());
      focus('#time_entry_hours');
    };

    // UI
    $btnCreateRequest = $('<div class="btn dtn-default run-custom-js--create-request" style="margin-left: 20px;">Заполнить форму</div>');
    if ($('.page_title').length) {
      $('.page_title').append($btnCreateRequest);
    }
    $(document).on('click', '.run-custom-js--create-request', onCreateRequestClick);
  }

  checkLoaded() ? main() : window.addEventListener('load', main);
})();
