/// <reference types="@types/chrome" />
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Page Objects';
  count = 0;
  newName = '';
  newValue = '';
  pages = [{id: '1234567890', name: 'test.js', script: `
  import Pages
  // This is a test

  var a = 10
  print(a)
  `}];
  options = [
    { name: 'header', value: '// This is a header' },
    { name: 'types', value: 'a,input,button,submit' },
    { name: 'style', value: 'helper' }
  ];

  ngOnInit() {
    this._load_options();
    this._load_pages();
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
    this._save_options();
    this.notify('Options Saved', 'Options saved to chrome sync storage.');
  }

  _save_options() {
    chrome.storage.sync.set({ page_object: this.options });
  }

  _save_pages() {
    chrome.storage.local.set({pages: this.pages});
    this.count = this.pages.length;
    this.set_badge();
  }

  load_options() {
    this._load_options();
    this.notify('Options Loaded', 'Options re-loaded from chrome sync storage.');
  }

  _load_options() {
    chrome.storage.sync.get('page_object', (obj) => {
      if (!obj.page_object) {
        chrome.storage.sync.set({ page_object: this.options });
      } else {
        this.options = obj.page_object;
      }
    });
  }

  _load_pages() {
    chrome.storage.local.get('pages', (obj) => {
      if (!obj.pages) {
        chrome.storage.local.set({pages: this.pages});
      } else {
        this.pages = obj.pages;
        this.count = this.pages.length;
        this.set_badge();
      }
    });
  }

  add_new_option() {


    this._save_options();
  }

  update_option() {


    this._save_options();
  }

  delete_option() {


    this._save_options();
  }

  update_page() {

  }

  delete_page() {

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
      // chrome.browserAction.setBadgeBackgroundColor({color:[255, 255, 255, 100]});
      chrome.browserAction.setBadgeText({ text: this.count.toString() });
    }
  }

  // communicate with background.js, one way
  // notify_background(info) {
  //   var bg = chrome.extension.getBackgroundPage();
  //   bg.notify_from_popup(info);
  // }
}
