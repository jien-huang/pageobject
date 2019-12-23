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
  pages = [];
  options = [
    { name: 'types', value: 'a,button,submit,input,select' },
    { name: 'attributes', value: 'id,name,type,value,text,href,title,hidden,tagName' }
  ];
  about = `
  import { Selector, t } from 'testcafe';

  export default class Page {
    constructor() {
      this.url = "about:blank";
      this.data = [];
      this.id = "00000000";
      this.name = "page-model.js";
    }
    async click(clickable_id) {
      this.action(clickable_id, null, true);
    }
    async setData(ids) {
      if (ids === undefined){
        console.error('Should not pass undefined value to SetData')
      }
      if( Array.isArray(ids)){
        // we will asume you input is this format: [{id:'id of object', value: 'value you want to input'}, ...]
        for (var i = 0; i < ids.length; i++) {
          var obj = ids[i];
          await this.action(obj.id, obj.value)
        }
        return this;
      }
      if (!!ids && ids.constructor === Object) {
        // we will asume you input is this format: {id:value}
        for (var p in ids) {
          await this.action(p, ids[p])
        }
      }
      return this;
    }
    async action(id, value, justClick = false) {
      var testObject = this.getTestObjectByIdOrName(id)
      if(!testObject) {
        console.error('we cannot find object with this id or name: [' + id +']');
        return;
      }
      var selector = Selector(this.getSelctorFromTestObject(testObject, id))
      if (justClick) {
        await t.click(selector);
      } else {
        switch (String(testObject.type)){
          case 'text': await t.typeText(selector, value); break;
          case 'radio': await t.click(selector); break;
          case 'checkbox': await t.click(selector) ; break;
          case 'select-one': await t.selectText(selector, 1, 1); break;
        }
      }
    }
    getSelctorFromTestObject(obj, nameOrId) {
      var search_str = '';
        search_str = obj.tagName.toLowerCase() + '[name=' + obj.name + ']';
        if (obj.id === nameOrId) {
          search_str = obj.tagName.toLowerCase() + '[id=' + obj.id + ']';
        }
        return search_str;
    }
    getTestObjectByIdOrName(nameOrId) {
      for(var i = 0; i< this.data.length; i++ ) {
        var obj = this.data[i];
        if (obj.id === nameOrId || obj.name === nameOrId) {
          return obj;
        }
      }
      return undefined;
    }
  }
  `;

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
      // TODO: we use this to generate default page for testing, should be removed.
      if (!obj.pages || obj.pages.length === 0) {
        chrome.storage.local.set({pages: this.pages});
        this.count = 0;
      } else {
        this.pages = obj.pages;
        this.count = this.pages.length;
      }
      this.set_badge();
    });
  }

  add_new_option() {
    this.options.push({name: this.newName, value: this.newValue});
    this._save_options();
  }

  update_option(option) {
    this.options.forEach((item) => {
      if (item.name === option.name) {
        item.value = option.value;
      }
    });
    console.log(this.options);
    this._save_options();
  }

  delete_option(optionName: string) {
    this.options = this.options.filter(item => item.name !== optionName);
    this._save_options();
  }

  update_page(page: any) {
    this.pages.forEach((item) => {
      if (item.id === page.id) {
        item.name = page.name;
        item.script = page.script;
      }
    });
    this._save_pages();
  }

  delete_page(pageId: string) {
    this.pages = this.pages.filter(item => item.id !== pageId);
    this._save_pages();
  }

  generate_script(page: any) {
    // TODO: generate script
    let _script = `
    
export default class ExamplePage extends Page {
  constructor() {
    super();
    this.data = '`;

    _script += JSON.stringify(page.objects) + '\';\n';
    _script += `console.log('Perform on Page:' + this.url + ' Id:' + this.id + ' Page Object:' + this.name);
  }
}
`;
    page.script = _script;

    // generate clickable enum
    // generate setable enum
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

  // use jsdoc to give end users a hint
// var clickable = {
//     SUBMIT: 'submit',
//     CANCEL: 'cancel'
// }
// /**
//  *
//  * @param {clickable} action use clickable
//  */
// function testFunction(action) {
//     print(action)
// }
// testFunction()
/*
    consider store page objects in local storage, because sync has 102K size limit, while local is 5.2M
    all page objects will looks like below
    {
        pages: [
            {'id':'1234', 'name':'generatedPageName.js', 'captureAt':'dateTimeStamp', 'url':'https://.....',
                'objects': [
                {'type':'button', 'text':'OK', 'id':'confirm', 'name':'confirm', 'special-id':'xxx'},
                {'type':'input', 'value':'first name', ...}
                {'type':'select', 'selected':'chosen value', options:['xxxx','xxx','xx']}
                ],
                'script': ' import .... '
            }
        ]
    }

*/

  // communicate with background.js, one way
  // notify_background(info) {
  //   var bg = chrome.extension.getBackgroundPage();
  //   bg.notify_from_popup(info);
  // }
}
