/**
 * ACE Editor Custom Binding
 * =========================
 *
 * turn any tag into an ACE editor instance and bind the source to a ko.observable
 *
 *     <div data-bind="ace:sourceField"></div>
 *
 * @TODO: add configuration support via allBindings or a configurable binding object
 *
 */

ko.bindingHandlers.ace = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // copose the editor instance
        var editor = ace.edit(element);
        ko.utils.domData.set(element, 'ace-editor', editor);
        
        // editor configuration
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/javascript");
        
        // initial value
        editor.setValue(ko.unwrap(valueAccessor()));
        editor.gotoLine(0);
        
        // get updates
        var sub = editor.getSession().on('change', function() {
            if (ko.isWriteableObservable(valueAccessor())) {
                valueAccessor()(editor.getValue());
            }
        });
        
        // clean up on DOM dispose
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            editor.destroy();
        });
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var editor = ko.utils.domData.get(element, 'ace-editor');
        var actualValue = editor.getValue();
        var newValue = ko.unwrap(valueAccessor());
        if (newValue !== actualValue) {
            editor.setValue(newValue, { silent: true });
        }
    }
};
