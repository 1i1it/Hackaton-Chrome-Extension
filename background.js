// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log('The color is green.');
  });
});

chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected .....");
  port.onMessage.addListener(function(msg) {
       console.log("message recieved" + msg);
       port.postMessage("Hi Popup.js");
  });
})

chrome.webRequest.onBeforeRequest.addListener(
  function (request) {
    if (request && request.url.indexOf('http://mydmp') === 0) {
      chrome.storage.sync.set({ attributes: request }, function () {
        console.log('set Request');
      });
    }
  },
  { urls: ["<all_urls>"] });