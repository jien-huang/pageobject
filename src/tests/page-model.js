import { Selector, XPathSelector, t } from 'testcafe';

const data = {
    "id": "4d4bc1c0",
    "name": "TestcafeExample_Page.js",
    "objects": [
      {
        "id": "developer-name",
        "name": "name",
        "tagName": "INPUT",
        "type": "text"
      },
      {
        "id": "populate",
        "tagName": "INPUT",
        "type": "button",
        "value": "Populate"
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
        "id": "submit-button",
        "tagName": "BUTTON",
        "type": "submit"
      },
      {
        "id": "testcafe-rank",
        "name": "testcafe-rank",
        "tagName": "INPUT",
        "type": "hidden",
        "value": "1"
      }
    ],
    "timeStamp": "2019-12-19T11:34:26.953Z",
    "url": "/testcafe/example/"
  }


class Page {
    constructor () {
    }

}

export function setData(_data) {
    _data.forEach(oneData => setOneData(oneData))        
}

export function setOneData(_data) {
    for(var p in _data) {
        var nameOrId = p
        var value = _data[p]
    }
    
    
    data.objects.forEach(obj => {
        // console.log(obj)
        if(obj.id === nameOrId || obj.name === nameOrId){
            var item = obj;
            var search_str = item.tagName.toLowerCase() +'[name=' + item.name +']';
    
            if(item.id === nameOrId) {
                search_str = item.tagName.toLowerCase() +'[id=' + item.id +']' ;
            }

            // var selector = XPathSelector(search_str)
            // await t.click(XPathSelector(search_str)).takeScreenshot();
            
            // await t.click(Selector('#' + item.id)).takeScreenshot();
            action('#'+item.id )
        }
    });       
    
}

async function action(selector) {
    console.log(selector)
    await t.click( selector )
}

export default new Page();