ACE Editor Custom Binding
=========================

turn any tag into an ACE editor instance and bind the source to a ko.observable
 
    <div data-bind="ace:sourceField, aceLanguage:'javascript', aceTheme:'monokai'"></div>
 
@TODO: add configuration support via allBindings or a configurable binding object
@TODO: evaluate the opportunity to add a "brace" custom binding when it comes to
bundle ACE withing the app (no web workers).
