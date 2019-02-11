$(function () {


    $("form input").blur(function () {
        validateFormElements($(this));
    });

    $("form select").blur(function () {
        validateFormSelectElements($(this));
    });

    $("form select").change(function () {
        validateFormSelectElements($(this));
    });

    $("form textarea").blur(function () {
        validateFormTextareaElements($(this));
    });



    function validateFormElements(input) {
        let min = 2;

        if ($(input).attr("type") === "text" && $(input).prop("required")) {

            validateInputValue(input, `This got to be atleast ${min} letters`, min);

        }

        if ($(input).attr("type") === "email" && $(input).prop("required")) {

            validateEmail(input);

        }

        if ($(input).attr("type") === "password" && $(input).prop("required")) {

            validatePassword(input);

        }

        if ($(input).attr("type") === "radio" && $(input).prop("required")) {

            validateRadio(input);

        }

        if ($(input).attr("type") === "checkbox" && $(input).prop("required")) {

            validateCheckbox(input);

        }


        if (!$(input).val() && !$(input).prop("required")) {
            isValid(input);
        }

    }

    function validateFormTextareaElements(textarea) {


        if ($(textarea).attr("id") === "textarea" && $(textarea).prop("required")) {

            validateTextarea(textarea);

        }

    }


    function validateInputValue(input, error, min = 2, max = 4096) {

        let invalidFeedbackId = "#" + $(input).attr("id") + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();
        let invalidFeedback = error;

        if (!$(input).val()) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedbackDefault);
        } else if ($(input).val().length < min) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedback);

        } else {
            isValid(input);
        }

    }




    function validateEmail(input) {
        let invalidFeedbackId = "#" + $(input).attr("id") + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();

        let invalidFeedback = "You must enter a valid email address!";
        let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;

        if (!$(input).val()) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedbackDefault);
        } else if (!regex.test($(input).val())) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedback);

        } else {
            isValid(input);
        }



    }


    function validatePassword(input) {

        let invalidFeedbackId = "#" + $(input).attr("id") + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();
        let invalidFeedback = "Try again, type 8 or more letters.";

        let min = 8;

        if (!$(input).val()) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedbackDefault);
        } else if ($(input).val().length < min) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedback);

        } else {
            isValid(input);
        }

    }


    function validateTextarea(textarea, error, min = 2, max = 300) {   
        let invalidFeedbackId = "#" + $(textarea).attr("id") + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();
        let invalidFeedback = error;

        if (!$(textarea).val()) {
            isInvalid(textarea);
            $(invalidFeedbackId).html(invalidFeedbackDefault);
        } else if ($(textarea).val().length < min) {
            isInvalid(textarea);
            $(invalidFeedbackId).html(invalidFeedback);

        } else {
            isValid(textarea);
        }
    }

    function validateFormSelectElements(select) {
        if (!$(select).val() && $(select).prop("required")) {
            isInvalid(select);
        } else {
            isValid(select);
        }
    }



    function validateRadio(radio) {
        let $elements = $("[name='" + $(radio).attr("name") + "']");
        let checked = [];

        $elements.each(function (i, radio) {
            checked.push($(radio).prop("checked"));
        });

        if (checked.includes(true)) {
            $(elements).each(function (i, radio) {
                $(radio).removeClass("is-invalid");
            });
        } else {
            $(elements).each(function (i, radio) {
                $(radio).addClass("is-invalid");
            });
        }
    }



    function validateCheckbox(checkbox) {
        if ($(checkbox).prop("checked")) {
            $(checkbox).removeClass("is-invalid");
        } else {
            $(checkbox).addClass("is-invalid");
        }
    }




    function isValid(element, validClass = "is-valid", invalidClass = "is-invalid") {
        $(element).addClass(validClass);
        $(element).removeClass(invalidClass);
    }

    function isInvalid(element, validClass = "is-valid", invalidClass = "is-invalid") {
        $(element).addClass(invalidClass);
        $(element).removeClass(validClass);
    }




    window.addEventListener("click", function () {
        var forms = document.getElementsByClassName("needs-validation");
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener("submit", function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add("was-validated");
            }, false);
        });
    }, false);

});