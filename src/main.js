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
            }}).then(function (result) {
                sessionStorage.setItem("Bundesland", result);
        })
    }
}

const deletecookie = () => {
    sessionStorage.clear();
    console.log("cookies cleared");
};