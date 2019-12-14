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
  new_name = '';
  new_value = '';
  options = [
    { name: 'header', value: '// This is a header' },
    { name: 'types', value: 'a,input,button,submit' },
    { name: 'style', value: 'helper' }
  ];

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
    chrome.storage.sync.set({ 'page_object': this.options });
    this.notify('Options Saved', JSON.stringify(this.options));
  }

  load_options() {
    chrome.storage.sync.get('page_object', (obj) => {
      if (!obj['page_object']) {
        chrome.storage.sync.set({ 'page_object': this.options });
      } else {
        this.options = obj['page_object'];
      }
    });
  }

  add_new_option() {

  }

  update_option() {

  }

  delete_option() {

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
