window.addEventListener('DOMContentLoaded', (event) => {
    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        lineNumbers: true,
        mode: "javascript",
        theme: "default"
    });

    document.getElementById("runButton").addEventListener("click", function() {
        var code = editor.getValue();
        runCode(code);
    });

    function runCode(code) {
        try {
            // Clear previous output
            document.getElementById("output").innerHTML = "";

            // Capture console output
            const consoleOutput = [];
            const originalConsoleLog = console.log;
            console.log = function(message) {
                consoleOutput.push(message);
                originalConsoleLog.apply(console, arguments);
            };

            // Run the code
            eval(code);

            // Restore console.log
            console.log = originalConsoleLog;

            // Display the result
            document.getElementById("output-container").style.display = "block";
            document.getElementById("output").innerText = consoleOutput.join('\n') || 'Code executed successfully';
        } catch (error) {
            // Restore console.log
            console.log = originalConsoleLog;

            // Display the error
            document.getElementById("output-container").style.display = "block";
            document.getElementById("output").innerText = error;
        }
    }
});
