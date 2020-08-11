function checkName(name){
    var exp = /([^a-z\s])/i; //Expression to match non-letter character
    if(name.length == 0){return false}
    return !exp.test(name)
}
function checkMail(email){
    var exp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //somewords@someword.{2,3}longword
    return exp.test(email);
    
}
function checkNumber(number){
    var exp = /^(\d{10})$/;
    return exp.test(number)
}

var nameField = $('#name')
var mailField = $('#email')
var numField = $('#pnum')
$('#invalid-form-div').hide();  //script present at the end of body

nameField.on("keyup", function(){
    if(checkName(nameField.val()))  //Remove invalid class and add valid if true
    {
        if(nameField.hasClass("is-invalid")){nameField.removeClass("is-invalid")}
        nameField.addClass("is-valid");
    }
    else{   //else remove valid class and add invalid class
        if(nameField.hasClass("is-valid")){nameField.removeClass("is-valid")}
        nameField.addClass("is-invalid");
    }
})
mailField.on("keyup", function(){
    if(checkMail(mailField.val()))  //Remove invalid class and add valid if true
    {
        if(mailField.hasClass("is-invalid")){mailField.removeClass("is-invalid")}
        mailField.addClass("is-valid");
    }
    else{   //else remove valid class and add invalid class
        if(mailField.hasClass("is-valid")){mailField.removeClass("is-valid")}
        mailField.addClass("is-invalid");
    }
})
numField.on("keyup", function(){
    if(checkNumber(numField.val()))  //Remove invalid class and add valid if true
    {
        if(numField.hasClass("is-invalid")){numField.removeClass("is-invalid")}
        numField.addClass("is-valid");
    }
    else{   //else remove valid class and add invalid class
        if(numField.hasClass("is-valid")){numField.removeClass("is-valid")}
        numField.addClass("is-invalid");
    }
})

var form = $('#contact-form')
form.on("submit", function(e){
    var nameValid = checkName(nameField.val())
    var mailValid = checkMail(mailField.val())
    var numValid = checkNumber(numField.val()) 
    var valid = nameValid && mailValid && numValid
    if(!valid){
        e.preventDefault();
        $('#invalid-form-div').show();
        if(!nameValid){nameField.addClass('is-invalid')}
        if(!mailValid){mailField.addClass('is-invalid')}
        if(!numValid){numField.addClass('is-invalid')}
    }
    else{
        $('#invalid-form-div').hide();
        form.addClass('was-validated')
    }

})
