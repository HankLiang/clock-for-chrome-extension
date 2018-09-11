function removeNotification() {
  chrome.runtime.getBackgroundPage(function (backgroundPage) {
    backgroundPage.clearScheduleTask();
  });
}

function restartApp() {
  chrome.runtime.getBackgroundPage(function (backgroundPage) {
    backgroundPage.restartApp();
  });
}

function click(e) {
  var target = e.target.id;
  switch(target) {
    case 'close':
      removeNotification();
      break;
    case 'restart':
      restartApp();
      break;
    case 'setting':
      chrome.tabs.create({url: '/options.html'});
      break;
  }

  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('popup').addEventListener('click', click);
});
