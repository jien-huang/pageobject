
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === 'get') {
            sendResponse({ content: 'OK' })
            // after everything, count how many pages we got
            getPageObjects()
        }
    }
);

/*
    consider store page objects in local storage, because sync has 102K size limit, while local is 5.2M
    all page objects will looks like below
    {
        pages: [
            {'name':'generatedPageName', 'captureAt':'dateTimeStamp', 'url':'https://.....' 'objects': [
                {'type':'button', 'text':'OK', 'id':'confirm', 'name':'confirm', 'special-id':'xxx'},
                {'type':'input', 'value':'first name', ...}
                {'type':'select', 'selected':'chosen value', options:['xxxx','xxx','xx']}
            ]}
        ]
    }

*/

async function getPageObjects() {
    chrome.storage.sync.get('page_object', (data) => {
        // TODO: what if there is no options stored in this browser? how could this happen? maybe first time?
        options = data['page_object'];
        console.log(options);
        //now we have the options, begin to capture objects

        // end of capture, write to storage

        // count the storage, send number to background
        chrome.storage.local.get('pages', (all_pages) => {

        })
        count = 10
        chrome.runtime.sendMessage({'count': count.toString()});
    });
}

function getName(className) {
    if (className && className.length > 0) {
        return className
    }
    var _url = window.location.pathname
    var str_array = _url.split('/')
    var _className = ''
    for (var i = 0; i < str_array.length; i++) {
        //TODO consider add a list of can_be_ignored words here
        if (str_array[i].length === 0) {
            continue
        }
        _className = _className + str_array[i].charAt(0).toUpperCase() + str_array[i].slice(1);
    }
    return removeRandomNumberInString(_className) + 'Page'
}

function removeRandomNumberInString(original_string) {
    return original_string.replace(/[0-9]+/, '')
}

function removeRandomValueInString(original_string) {
    return original_string.replace(/(\w+[_,-])+[_,-]*[0-9]+_/, '').replace(/-/g, '_').replace(/\./, '_')
}

async function get(className) {

    var result = ''
    
    //    console.log('result->\n' + result)
    var constructor_string = `
/**
 * Interface for executing automated actions on the applications IEG scripts
 */
export default class _CLASS_NAME_ extends PageObject {
  /**
   * Constructor for the page object representing the IEG Pages
   */
  constructor() {
    super(
      url,
      _CLICKLIST_,
      _CLICKIFDISPLAYEDLIST_,
      _CLEARANDINPUTLIST_,
      _TYPETEXTLIST_,
      _SELECTLIST_,
      _GETVALUELIST_,
      _CHECKBOXLIST_,
      _SELECTLIST_,
      _GETTEXTCONTENTLIST_
    );
  }

`
    var current = new Date().toLocaleString()
    result = result.replace('_TIMESTAMP_', current)
    result += 'const url = \'' + removeRandomNumberInString(window.location.pathname) + '\'\n'

    var _className = getName(className)
    constructor_string = constructor_string.replace('_CLASS_NAME_', _className)

    var checkboxs = document.querySelectorAll('input')
    if (checkboxs.length > 0) {
        constructor_string = constructor_string.replace('_CHECKBOXLIST_', 'getIsSelectedList')
        result += 'const getIsSelectedList = {\n'

        result += handleElements(checkboxs, 'checkbox')
        result += '}\n'
    } else {
        constructor_string = constructor_string.replace('_CHECKBOXLIST_', 'undefined')
    }

    var buttons = document.querySelectorAll('button,a,submit')
    if (buttons.length > 0) {
        constructor_string = constructor_string.replace('_CLICKLIST_', 'clickList')
        result += 'const clickList = {\n'

        result += handleElements(buttons)
        result += '}\n'
    } else {
        constructor_string = constructor_string.replace('_CLICKLIST_', 'undefined')
    }

    var buttons = document.querySelectorAll('button,a,submit')
    if (buttons.length > 0) {
        constructor_string = constructor_string.replace('_CLICKIFDISPLAYEDLIST_', 'clickIfDisplayedList')
        result += 'const clickIfDisplayedList = {\n'

        result += handleVisibleElements(buttons)
        result += '}\n'
    } else {
        constructor_string = constructor_string.replace('_CLICKIFDISPLAYEDLIST_', 'undefined')
    }

    var selects = document.getElementsByTagName('select')
    if (selects.length > 0) {
        constructor_string = constructor_string.replace('_SELECTLIST_', 'selectList')
        result += 'const selectList = {\n'

        result += handleElements(selects)
        result += '}\n'

        constructor_string = constructor_string.replace('_SELECTLIST_', 'getDropdownSelectionList')
        result += 'const getDropdownSelectionList = {\n'

        result += handleElements(selects)
        result += '}\n'


    } else {
        constructor_string = constructor_string.replace('_SELECTLIST_', 'undefined')
        constructor_string = constructor_string.replace('_SELECTLIST_', 'undefined')
    }

    var inputs = document.getElementsByTagName('input')
    if (inputs.length > 0) {
        constructor_string = constructor_string.replace('_CLEARANDINPUTLIST_', 'clearAndTypeTextList')
        result += 'const clearAndTypeTextList = {\n'

        result += handleElements(inputs)
        result += '}\n'

        constructor_string = constructor_string.replace('_TYPETEXTLIST_', 'typeTextList')
        result += 'const typeTextList = {\n'

        result += handleElements(inputs)
        result += '}\n'

    } else {
        constructor_string = constructor_string.replace('_CLEARANDINPUTLIST_', 'undefined')
        constructor_string = constructor_string.replace('_TYPETEXTLIST_', 'undefined')
    }

    if (inputs.length > 0) {
        constructor_string = constructor_string.replace('_GETVALUELIST_', 'getValueList')
        result += 'const getValueList = {\n'

        result += handleElements(inputs)
        result += '}\n'

    } else {
        constructor_string = constructor_string.replace('_GETVALUELIST_', 'undefined')
    }

    var textContents = document.getElementsByTagName('label')
    if (textContents.length > 0) {
        constructor_string = constructor_string.replace('_GETTEXTCONTENTLIST_', 'getTextContentList')
        result += 'const getTextContentList = {\n'

        result += handleElements(textContents)
        result += '}\n'

    } else {
        constructor_string = constructor_string.replace('_GETTEXTCONTENTLIST_', 'undefined')
    }

    result += constructor_string
    result += '\n}'
    return result
}

function handleVisibleElements(items) {
    var ret = ""
    for (var i = 0; i < items.length; i++) {
        var tag = items[i].tagName
        if (!tag) {
            console.log('very strange!', items[i])
        }
        if (items[i].style.visibility == 'none' || items[i].style.visibility == 'hidden') {
            continue
        }
        if (tag && (tag === 'A' || tag === 'LABEL')) {
            var text = items[i].textContent
            if (text && text.length > 0) {
                ret += '\tlink_' + text.replace(/\s/g, '') + ' : Selector(\'' + tag + '\').withText(\'' + text + '\')\n'
            }
        }
        if (items[i].hasAttribute('data-testid')) {
            var testid = items[i].getAttribute('data-testid').toString()
            testid = removeRandomValueInString(testid)
            ret += '\t' + testid + ' : ' + '\'' + tag + '[data-testid*="' + testid + '"]\'\n'
        }

    }
    return ret
}

function handleElements(items, _type) {
    var ret = ""
    for (var i = 0; i < items.length; i++) {
        var tag = items[i].tagName
        if (!tag) {
            console.log('very strange!', items[i])
        }
        var itemType = items[i].getAttribute('type').toString()
        if (itemType != _type) {
            continue
        }
        if (items[i].hasAttribute('data-testid')) {
            var testid = items[i].getAttribute('data-testid').toString()
            testid = removeRandomValueInString(testid)
            ret += '\t' + testid + ' : ' + '\'' + tag + '[data-testid*="' + testid + '"]\'\n'
        }

    }
    return ret
}

function handleElements(items) {
    var ret = ""
    for (var i = 0; i < items.length; i++) {
        var tag = items[i].tagName
        if (!tag) {
            console.log('very strange!', items[i])
        }
        if (tag && (tag === 'A' || tag === 'LABEL')) {
            var text = items[i].textContent
            var _type = 'link'
            if (tag === 'LABEL') {
                _type = 'text'
            }
            if (text && text.length > 0) {
                ret += '\t' + _type + '_' + text.replace(/\s/g, '') + ' : Selector(\'' + tag + '\').withText(\'' + text + '\')\n'
            }
        }
        // TODO: handle special attributes
        if (items[i].hasAttribute('data-testid')) {
            var testid = items[i].getAttribute('data-testid').toString()
            testid = removeRandomValueInString(testid)
            ret += '\t' + testid + ' : ' + '\'' + tag + '[data-testid*="' + testid + '"]\'\n'
        }

    }
    return ret
}
