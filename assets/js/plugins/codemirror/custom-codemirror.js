const code = document.querySelectorAll('.codebox-content')

code.forEach(item => {

    var editor = CodeMirror.fromTextArea(item, {
        theme: 'ayu-mirage',
        lineNumbers: true,
        readOnly:true
    });
    editor.on("change", function(){
        editor.autoFormatRange(0, 1000);
    });



})