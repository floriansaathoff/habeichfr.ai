window.onload = (event) => {
    console.log('page is fully loaded');
    if(document.cookie == undefined){

        Swal.fire({
        title: '<strong>Huch, du bist scheinbar noch nich angemeldet</strong>',
        icon: 'info',
        html:
        '      <form>'+
        '<div class="form-group">'+
        '  <label>Bundesland: </label> <select class="form-control" name="Bundeslaender">'+
        '    <option value="BW">'+
        '      Baden-Württemberg'+
        '    </option>'+

        '    <option value="BY">'+
        '      Bayern'+
        '    </option>'+

        '    <option value="BE">'+
        '      Berlin'+
        '    </option>'+

        '    <option value="BB">'+
        '      Brandenburg'+
        '    </option>'+

        '    <option value="HB">'+
        '      Bremen'+
        '    </option>'+

        '    <option value="HH">'+
        '      Hamburg'+
        '    </option>'+

        '    <option value="HE">'+
        '      Hessen'+
        '    </option>'+

        '    <option value="MV">'+
        '      Mecklenburg-Vorpommern'+
        '    </option>'+

        '    <option value="NI">'+
        '      Niedersachsen'+
        '    </option>'+

        '    <option value="NW">'+
        '      Nordrhein-Westfalen'+
        '    </option>'+

        '    <option value="RP">'+
        '      Rheinland-Pfalz'+
        '    </option>'+

        '    <option value="SL">'+
        '      Saarland'+
        '    </option>'+

        '    <option value="SN">'+
        '      Sachsen'+
        '    </option>'+

        '    <option value="ST">'+
        '      Sachsen-Anhalt'+
        '    </option>'+

        '    <option value="SH">'+
        '      Schleswig-Holstein'+
        '    </option>'+

        '    <option value="TH">'+
        '      Thüringen'+
        '    </option>'+
        '  </select>'+
        '</div>'+
        ' </form>',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Anmelden',
        cancelButtonText: 'Abbrechen',
        focusConfirm: false
        }) 
    }
}
