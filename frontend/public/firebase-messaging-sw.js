importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyD_QwKWOzhkl64WzZXz3KAyFlwOkQUhFng",
  authDomain: "bluemindai-da4a5.firebaseapp.com",
  projectId: "bluemindai-da4a5",
  storageBucket: "bluemindai-da4a5.firebasestorage.app",
  messagingSenderId: "1088520990126",
  appId: "1:1088520990126:web:6a5e986aabb61e97f4ac3f",
  measurementId: "G-0TT1JXDCBK"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  console.log("Background message received:", payload);

  const notificationTitle = payload.notification.title;

  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

});