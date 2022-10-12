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
    console.log('page is fully loaded');
    checkSession();
    $("h3").text(checkcurrentdate);
    $("#double_forward").on("click", berechne_datum_add(7))
    $("#forward").on("click", berechne_datum_add(1))
    $("#backward").on("click", berechne_datum_sub(1))
    $("#double_backward").on("click", berechne_datum_sub(7))
}


const berechne_datum_add = (tage) => {
    console.log("Adding")
    let date = new Date($("h3").text().substring(3, 6) + $("h3").text().substring(0, 3) + $("h3").text().substring(6));
    $("h3").text(date.addDays(tage).toLocaleDateString("de-DE").replace(".", "-").replace(".", "-"));
}

const berechne_datum_sub = (tage) => {
    console.log("Subtracting")
    let date = new Date($("h3").text().substring(3, 6) + $("h3").text().substring(0, 3) + $("h3").text().substring(6));
    $("h3").text(date.subDays(tage).toLocaleDateString("de-DE").replace(".", "-").replace(".", "-"));
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
            showCancelButton: true,
            icon: 'info',
            inputValidator: function (value) {
                return new Promise(function (resolve, reject) {
                    if (value != null) {
                        resolve()
                    }
                })
            }}
        ).then(function (result) {
            sessionStorage.setItem("Bundesland", listOfItemsForSelectBox[result.value]);
            checkdate(sessionStorage.getItem("Bundesland"));
        })
    } else {
        checkdate(sessionStorage.getItem("Bundesland"));
    }
};

const checkdate = (Bundesland, dev) => {
    console.log(Bundesland + " is selected");
    $.ajax({
        url: "/checkdate",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({Bundesland: Bundesland, dev: dev}), 
        success: function (response) {
          if(response){
            console.log("Yes Feiertag");
            $("h1").text("Ja")
          } else {
            console.log("No Feiertag");
            $("h1").text("Nein")
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