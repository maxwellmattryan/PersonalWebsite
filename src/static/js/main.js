$(document).ready(function() {
    $("#submit").click(function(event) {
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();

        var nameStatusElm = $("#name-status");
        nameStatusElm.empty();
        var emailStatusElm = $("#email-status");
        emailStatusElm.empty();
        var subjectStatusElm = $("#subject-status");
        subjectStatusElm.empty();
        var messageStatusElm = $("#message-status");
        messageStatusElm.empty();

        if(name.length < 1) {
            event.preventDefault();
            nameStatusElm.append("<div>*please enter a name</div>");
            document.getElementsByName("name")[0].style.border = "1px solid red";
        } else {
            event.preventDefault();
            document.getElementsByName("name")[0].style.border = "0px solid red";
        }

        if(email.length < 5 || !email.includes("@") || !email.includes(".")) {
            event.preventDefault();
            emailStatusElm.append("<div>*please enter a valid email</div>");
            document.getElementsByName("email")[0].style.border = "1px solid red";
        } else {
            event.preventDefault();
            document.getElementsByName("email")[0].style.border = "none";
        }

        if(subject < 1) {
            event.preventDefault();
            subjectStatusElm.append("<div>*please enter a subject</div>");
            document.getElementsByName("subject")[0].style.border = "1px solid red";
        } else {
            event.preventDefault();
            document.getElementsByName("subject")[0].style.border = "none";
        }

        if(message < 10) {
            event.preventDefault();
            messageStatusElm.append("<div>*please enter a message</div>");
            document.getElementsByName("message")[0].style.border = "1px solid red";
        } else {
            event.preventDefault();
            document.getElementsByName("message")[0].style.border = "none";
        }
    })
})

$(document).click(function(event) {
    if(navBarOpen && event.clientX < (0.575 * $(document).width())) {
        closeNav();
    }
})

let navBarOpen = false;

function openNav() {
    navBarOpen = true;
    document.getElementById("navbar-nav").style.width = "30%";
    document.getElementById("navbar-nav").style.padding = "30px";
}

function closeNav() {
    document.getElementById("navbar-nav").style.width = "0%";
    document.getElementById("navbar-nav").style.padding = "30px 0px";
}