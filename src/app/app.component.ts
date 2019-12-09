/// <reference types="@types/chrome" />
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Page Objects';
  count = 1;

  ngOnInit() {
    this.set_badge();
  }

  download_page_objects() {
    alert('you click the down page objects button');
    this.count ++ ;
    this.set_badge();
  }

  save_options() {
    alert('you click the save options button');
    chrome.storage.sync.set({page_objects_header: 'test content'});
  }

  download_framework() {
    window.open('https://www.automation-test.com', '_blank');
  }

  to_my_home() {
    window.open('https://www.automation-test.com', '_blank');
  }

  set_badge() {
    chrome.browserAction.setBadgeText({text: this.count.toString()});
  }
}
