var timer = null,
    lastBodyIndex = '',
    DEFAULT_ACTIVATED = true,
    MINUTE_MILLIS = 60000,
    SHOW_NOTIFICATION_DURING = 10000,
    DEFAULT_FREQUENCY = 30,
    NICK_NAME = '主淫',
    NOTIFICATION_ICON = 'images/48.png',
    NOTIFICATION_TAG = '久坐提醒',
    NOTIFICATION_NICK = '亲爱滴 ',
    RESTART_CONTENT = '从当前时间开始，每隔#{frequency}分钟提醒一次，请珍爱您的身体！',
    STOP_CONTENT = '纵使虐我千百遍,我仍待您如初恋！',
    REMINDER_CONTENT = [
      '革命尚未成功，同志仍需努力。赶快休息一下，活动活动筋骨吧！',
      '腰挺好的嘛，还不休息，等着断那！',
      '脖子扭扭，屁股扭扭，快来和我一起做运动！',
      '小盆友，你坐太久了吧！站起来撸……',
      '系统警告：您的颈椎疑似被突出攻击，请尽快扭扭脖子以修复bug！',
      '系统警告：您的腰椎疑似被突出攻击，请尽快走动以修复bug！',
      '系统警告：您的肠胃疑似被便秘攻击，请尽快喝水以修复bug！',
      '起来！不愿做奴隶的人们……',
      '凳子君已缺氧，需要呼吸新鲜空气，请立即起立！',
      '世界芥末大，何不出去走走？',
      '您已掌握“坐如钟”的技能，接下来解锁新技能--“站如松”。',
      '你站立的地方，有梦想，有星光，有新的模样！',
      '若想独立，必先站立，莫坐享其成。'
    ];

init();

function init() {
  initSetting();
  setScheduleTask();
}

function showNotification(content) {
  var nickname = NOTIFICATION_NICK + localStorage.nickname + '，';
  var content = content;

  var notification = new Notification(nickname, {
    icon: NOTIFICATION_ICON,
    body: content,
    tag: NOTIFICATION_TAG
  });

  window.setTimeout(function () {
    notification.close();
  }, SHOW_NOTIFICATION_DURING)
}

function showRestartNotification() {
  showNotification(RESTART_CONTENT.replace(/#{frequency}/, localStorage.frequency));
}

function showReminderNotification() {
  var index = parseInt(Math.random() * REMINDER_CONTENT.length);
  while (index === lastBodyIndex) {
    index = parseInt(Math.random() * REMINDER_CONTENT.length);
  }
  lastBodyIndex = index;
  showNotification(REMINDER_CONTENT[index]);
}

function showStopNotification() {
  showNotification(STOP_CONTENT);
}

function setScheduleTask() {
  var frequency = localStorage.frequency * MINUTE_MILLIS;

  if (window.Notification && localStorage.isActivated) {
    timer = window.setInterval(function() {
      showReminderNotification();
    }, frequency);
  }
}

function clearScheduleTask() {
  showStopNotification();
  window.clearInterval(timer);
}

function restartApp() {
  showRestartNotification();
  localStorage.isActivated = true;
  window.clearInterval(timer);
  setScheduleTask();
}

function initSetting() {
  if (!localStorage.frequency) {
    localStorage.isActivated = DEFAULT_ACTIVATED;   // The display activation.
    localStorage.frequency = DEFAULT_FREQUENCY;        // The display frequency, in minutes.
    localStorage.nickname = NICK_NAME; // The option nickname.
  }
}
