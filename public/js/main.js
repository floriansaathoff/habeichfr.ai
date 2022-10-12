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
    $("#double_forward").on("click", double_forward())
    $("#forward").on("click", forward())
    $("#backward").on("click", backward())
    $("#double_backward").on("click", double_backward())
}

const double_forward = () => {
    today.getDate() + 7
}

const forward = () => {
    today.getDate() + 1
}

const backward = () => {
    today.getDate() - 1
}

const double_backward = () => {
    today.getDate() - 7
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