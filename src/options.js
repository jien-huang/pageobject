var default_header = `
/*
* Licensed Materials - <put your license info here>
*
* Automatically generated at: _TIMESTAMP_
*
*/
/* eslint-disable class-methods-use-this */
import { Page, PageObject } from \'@spm/test-framework\';
import CEUtils from \'../utils/CEUtils\';

`
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
var default_tail = ''
var header = 'page_objects_header'

function save_options() {
  var header_text = document.getElementById('header').value;
  chrome.storage.sync.set({
    'page_objects_header': header_text
  }, function() {

    var status = document.getElementById('status');
    status.textContent = 'Options Saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get('page_objects_header', function(result) {
    if(!result){
      result = default_header
    }
    document.getElementById('header').value = result.page_objects_header;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
