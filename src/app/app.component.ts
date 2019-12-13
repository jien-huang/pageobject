/// <reference types="@types/chrome" />
import { Component, OnInit } from '@angular/core';

const key = 'page_object';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Page Objects';
  count = 0;
  options = [{ header: '// This is a header' }, { types: 'a,input,button,submit' }, { style: 'helper' }];

  ngOnInit() {
    this.set_badge();
    this.load_options();
  }

  download_page_objects() {
    this.notify('Download', 'Page Objects Downloaded');
    this.count++;
    this.set_badge();
  }

  notify(tle: string, msg: string) {
    chrome.notifications.create(null, {
      type: 'basic',
      iconUrl: 'assets/Page32.png',
      title: tle,
      message: msg
    });
  }

  save_options() {
    chrome.storage.sync.set({ key: this.options });
    this.notify('Options Saved', JSON.stringify(this.options));
  }

  load_options() {
    chrome.storage.sync.get(key, (obj) => {
      if (!obj[key]) {
        chrome.storage.sync.set({ key: this.options });
      } else {
        this.options = obj[key];
      }
      // TODO why it says this is not a method?
      this.notify('Options Loaded', JSON.stringify(this.options));
    });
  }

  download_framework() {
    window.open('https://www.automation-test.com', '_blank');
  }

  to_my_home() {
    window.open('https://www.automation-test.com', '_blank');
  }

  set_badge() {
    if (this.count === 0) {
      chrome.browserAction.setBadgeText({ text: '' });
    } else {
      chrome.browserAction.setBadgeText({ text: this.count.toString() });
    }
  }

  // communicate with background.js, one way
  // notify_background(info) {
  //   var bg = chrome.extension.getBackgroundPage();
  //   bg.notify_from_popup(info);
  // }
}
