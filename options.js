$(function() {
  var DROPDOWN_MENU = $('.dropdown-menu'),
      DROPDOWN_BOX_TEXT = $('#dropdown-box-text'),
      DROPDOWN_BOX = $('.dropdown-box'),
      FREQUENCY_SETTING = $('.frequency-setting'),
      CHECKBOX = $('#activate'),
      NICKNAME = $('#nickname'),
      DEFAULT_NICKNAME = '主淫',
      isShowDropdown = false;

  init();

  function init() {
    initDropdown();
    initCheckbox();
    initNickname();
  }

  function initDropdown() {
    var frequency = localStorage.frequency;
    setText(frequency);
  }

  function initCheckbox() {
    var isActivated = JSON.parse(localStorage.isActivated);
    if (isActivated) {
      CHECKBOX.attr('checked', true);
      FREQUENCY_SETTING.show();
    }
  }

  function initNickname() {
    var nickname = localStorage.nickname;
    NICKNAME.val(nickname);
  }

  function setText(text) {
    DROPDOWN_BOX_TEXT.text(text);
  }

  function showList() {
    DROPDOWN_MENU.show();
    isShowDropdown = true;
  }

  function hideList() {
    DROPDOWN_MENU.hide();
    isShowDropdown = false;
  }

  function restartApp() {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      backgroundPage.restartApp();
    });
  }

  function clearScheduleTask () {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      backgroundPage.clearScheduleTask();
    });
  }

  NICKNAME.on('focusout', function() {
    var nickname = NICKNAME.val();
    if (nickname) {
      localStorage.nickname = nickname;
    } else {
      localStorage.nickname = DEFAULT_NICKNAME;
    }
  });

  DROPDOWN_BOX.on('click', function() {
    if (isShowDropdown) {
      hideList();
    } else {
      showList();
    }
  });

  DROPDOWN_MENU.delegate('li', 'click', function(e) {
    var value = Number($(e.target).text());
    var localFrequency = Number(localStorage.frequency);

    setText(value);
    hideList();

    if (value !== localFrequency) {
      localStorage.frequency = value;
      restartApp();
    }
  });

  CHECKBOX.on('click', function(e) {
    var isChecked = e.target.checked;
    localStorage.isActivated = isChecked;

    if (isChecked) {
      FREQUENCY_SETTING.show();
      restartApp();
    } else {
      FREQUENCY_SETTING.hide();
      clearScheduleTask();
    }
  });
});
