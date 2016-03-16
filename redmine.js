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
    onFillTaskCompleteClick = function() {
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
    $btnFillTaskComplete = $('<li><a href="javascript:void(0)" class="run-custom-js--fill-task-completed">Заполнить (Задача решена)</a></li>');
    console.log($('#main-menu ul').length);
    if ($('#main-menu ul').length) {
      $('#main-menu ul').append($btnFillTaskComplete);
    }
    $(document).on('click', '.run-custom-js--fill-task-completed', onFillTaskCompleteClick);
    $(document).on('keyup', '#time_entry_hours', function(e) {
      val = parseFloat(e.currentTarget.value) || 0;
      spentTime = parseFloat($('td.spent-time').text()) || 0;
      summary = spentTime + val;
      $estimate = $('#issue_estimated_hours');
      if ($estimate.length) {
        $estimate.val(summary);
      }
    });
  }

  checkLoaded() ? main() : window.addEventListener('load', main);
})();
