var default_header = `
/*
* Licensed Materials - Property of IBM
*
* Copyright IBM Corporation 2019. All Rights Reserved.
*
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
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

function save_options() {
  var header_text = document.getElementById('header').value;
  chrome.storage.sync.set({
    header: header_text
  }, function() {

    var status = document.getElementById('status');
    status.textContent = 'Options Saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    header: default_header
  }, function(items) {
    document.getElementById('header').value = items.header;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
