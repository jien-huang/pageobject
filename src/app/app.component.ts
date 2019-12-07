import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Page Objects';

  download_page_objects() {
    alert("you click the down page objects button");
  }

  save_options() {
    alert("you click the save options button");
  }

  download_framework() {
    window.open("https://www.automation-test.com", "_blank");
  }

  to_my_home() {
    window.open("https://www.automation-test.com", "_blank");
  }
}
