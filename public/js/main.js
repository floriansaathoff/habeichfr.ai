let listOfItemsForSelectBox = [
    'Baden-Württemberg', 
    'Bayern', 
    'Berlin', 
    'Brandenburg', 
    'Bremen', 
    'Hamburg', 
    'Hessen', 
    'Mecklenburg-Vorpommern', 
    'Niedersachsen', 
    'Nordrhein-Westfalen', 
    'Rheinland-Pfalz', 
    'Saarland', 
    'Sachsen', 
    'Sachsen-Anhalt', 
    'Schleswig-Holstein', 
    'Thüringen']

window.onload = (event) => {
    //console.log('page is fully loaded');
    checkSession();
    $("h3").text(checkcurrentdate);
    $("#double_forward").on("click", function() { berechne_datum_add(7) })
    $("#forward").on("click", function() { berechne_datum_add(1) })
    $("#backward").on("click", function() { berechne_datum_sub(1) })
    $("#double_backward").on("click", function() { berechne_datum_sub(7) })
}

const selectDate = () => {
    let currentSelection = $("h3").text();
    //console.log(currentSelection);
    let date = new Date(currentSelection.substring(3, 6) + currentSelection.substring(0, 3) + currentSelection.substring(6));
    return date;
}

const berechne_datum_add = (tage) => {
    //console.log("Adding " + tage + " day(s)")
    let date = selectDate().addDays(tage);
    $("h3").text(('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + date.getFullYear());
    checkdate(sessionStorage.getItem("Bundesland"), $("h3").text());
}

const berechne_datum_sub = (tage) => {
    //console.log("Subtracting " + tage + " day(s)")
    let date = selectDate().subDays(tage);
    $("h3").text(('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + date.getFullYear());
    checkdate(sessionStorage.getItem("Bundesland"), $("h3").text());
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.subDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
}

const checkcurrentdate = () => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    return today;
}

const checkSession = () => {
    if(sessionStorage.getItem("Bundesland") == null){
        Swal.fire({
            title: 'Huch, du hast scheinbar noch kein Bundesland hinterlegt',
            input: 'select',
            inputOptions: listOfItemsForSelectBox,
            inputPlaceholder: 'Wähle dein Bundesland',
            showCancelButton: false,
            icon: 'info',
            allowOutsideClick: false,
            inputValidator: function (value) {
                return new Promise(function (resolve, reject) {
                    if (value != null) {
                        resolve()
                    }
                })
            }}
        ).then(function (result) {
            sessionStorage.setItem("Bundesland", listOfItemsForSelectBox[result.value]);
            checkdate(sessionStorage.getItem("Bundesland"), checkcurrentdate());
        })
    } else {
        checkdate(sessionStorage.getItem("Bundesland"), checkcurrentdate());
    }
};

const checkdate = (Bundesland, date) => {
    date = date.split("-")[2] + date.split("-")[1] + date.split("-")[0];

    $.ajax({
        url: "/checkdate",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({Bundesland: Bundesland, date: date}), 
        success: function (response) {
          if(response){
            console.log("Yes Feiertag");
            $("h1").text("Ja")
            $("#extra-text").text("ein Feiertag")
        } else {
            console.log("No Feiertag");
            if($("h1").text() != "Nein"){
                $("h1").text("Nein")
                $("#extra-text").text("leider kein Feiertag")
            }
          }
        },
        error: function (err) {
          console.log("error in ajax request");
          console.log(err.responseText);
        }
    });
}

function KeyPress(e) {
    var evtobj = window.event? event : e
    if (evtobj.keyCode == 81 && evtobj.ctrlKey){
        sessionStorage.clear();
        console.log("cookies cleared");
        checkSession();
        $("h1").text("")
    }     
}

document.onkeydown = KeyPress;