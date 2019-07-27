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
            document.getElementsByName("name")[0].style.border = "1px solid red";
        } else {
            event.preventDefault();
            document.getElementsByName("name")[0].style.border = "0px solid red";
        }

        if(email.length < 5 || !email.includes("@") || !email.includes(".")) {
            event.preventDefault();
            statusElm.append("<div>Please enter a valid email</div>");
            document.getElementsByName("email")[0].style.border = "1px solid red";
        } else {
            event.preventDefault();
            document.getElementsByName("email")[0].style.border = "none";
        }

        if(subject < 1) {
            event.preventDefault();
            statusElm.append("<div>Please enter a subject</div>");
            document.getElementsByName("subject")[0].style.border = "1px solid red";
        } else {
            event.preventDefault();
            document.getElementsByName("subject")[0].style.border = "none";
        }

        if(message < 10) {
            event.preventDefault();
            statusElm.append("<div>Please enter a message</div>");
            document.getElementsByName("message")[0].style.border = "1px solid red";
        } else {
            event.preventDefault();
            document.getElementsByName("message")[0].style.border = "none";
        }
    })
})