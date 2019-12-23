import Page from './page-model'

export default class ExamplePage extends Page {
  constructor() {
    super();
    this.url = "/testcafe/example/";
    this.data = [
      {
        "id": "developer-name",
        "name": "name",
        "tagName": "INPUT",
        "type": "text"
      },

      {
        "id": "remote-testing",
        "name": "remote",
        "tagName": "INPUT",
        "type": "checkbox",
        "value": "on"
      },
      {
        "id": "reusing-js-code",
        "name": "re-using",
        "tagName": "INPUT",
        "type": "checkbox",
        "value": "on"
      },
      {
        "id": "background-parallel-testing",
        "name": "background",
        "tagName": "INPUT",
        "type": "checkbox",
        "value": "on"
      },
      {
        "id": "continuous-integration-embedding",
        "name": "CI",
        "tagName": "INPUT",
        "type": "checkbox",
        "value": "on"
      },
      {
        "id": "traffic-markup-analysis",
        "name": "analysis",
        "tagName": "INPUT",
        "type": "checkbox",
        "value": "on"
      },
      {
        "id": "windows",
        "name": "os",
        "tagName": "INPUT",
        "type": "radio",
        "value": "Windows"
      },
      {
        "id": "macos",
        "name": "os",
        "tagName": "INPUT",
        "type": "radio",
        "value": "MacOS"
      },
      {
        "id": "linux",
        "name": "os",
        "tagName": "INPUT",
        "type": "radio",
        "value": "Linux"
      },
      {
        "id": "preferred-interface",
        "name": "preferred-interface",
        "tagName": "SELECT",
        "type": "select-one",
        "value": "Command Line"
      },
      {
        "id": "tried-test-cafe",
        "name": "tried-test-cafe",
        "tagName": "INPUT",
        "type": "checkbox",
        "value": "on"
      },

      {
        "id": "testcafe-rank",
        "name": "testcafe-rank",
        "tagName": "INPUT",
        "type": "hidden",
        "value": "1"
      },
      {
        "id": "populate",
        "tagName": "INPUT",
        "type": "button",
        "value": "Populate"
      },
      {
        "id": "submit-button",
        "tagName": "BUTTON",
        "type": "submit"
      }
    ];
    this.id = "4d4bc1c0";
    this.name = "TestcafeExample_Page.js";
    console.log('Perform on Page:' + this.url + ' Id:' + this.id + ' Page Object:' + this.name);
  }
}

export const BOOLFIELD = {
  TRIED_TEST_CAFE: 'tried-test-cafe'
}

export const TEXTFIELD = {
  DEVELOPER_NAME: 'developer-name'
}

export const CLICKABLE = {
  SUBMIT: 'submit-button',
  POPULATE: 'populate'
}



