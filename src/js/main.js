$(document).ready(function() {
    $("#submit").click(function(event) {
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();

        var statusElm = $("#status")
        statusElm.empty();

        if(name.length < 1) {
            event.preventDefault();
            statusElm.append("<div>Please enter a name</div>");
        }
        else if(email.length < 5 || !email.includes("@") || !email.includes(".")) {
            event.preventDefault();
            statusElm.append("<div>Invalid email</div>");
        }
        else if(subject < 1) {
            event.preventDefault();
            statusElm.append("<div>Please enter a subject</div>");
        }
        else if(message < 10) {
            event.preventDefault();
            statusElm.append("<div>Please enter a message</div>");
        }
    })
})