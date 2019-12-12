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

  ngOnInit() {
    this.set_badge();
  }

  download_page_objects() {
    this.notify('Download', 'Page Objects Downloaded');
    this.count++;
    this.set_badge();
  }

  private notify(tle: string, msg: string) {
    chrome.notifications.create(null, {
      type: 'basic',
      iconUrl: 'assets/Page32.png',
      title: tle,
      message: msg
    });
  }

  save_options() {
    alert('you click the save options button');
    chrome.storage.sync.set({ page_objects_header: 'test content' });
  }

  load_options() {
    chrome.storage.sync.get()
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
