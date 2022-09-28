window.onload = (event) => {
    console.log('page is fully loaded');
    if(document.cookie == undefined){

        Swal.fire({
        title: '<strong>Huch, du bist scheinbar noch nich angemeldet</strong>',
        icon: 'info',
        html:
        '<form>'+
        '    <div class="form-group">'+
        '        <label>Beschriftung Selectbox</label> '+
        '        <select class="form-control" name="selectbox_name">'+
        '            <option value="Wert 1">'+
        '                Antwort 1'+
        '            </option>'+
        '            <option value="Wert 2">'+
        '                Antwort 2'+
        '            </option>'+
        '        </select>'+
        '    </div>'+
        '    <div class="form-group">'+
        '        <label>Beschriftung Textfeld</label> <input type="text" class="form-control" name="text_name" placeholder="Placeholder Textfeld">'+
        '    </div>'+
        '</form>',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Anmelden',
        cancelButtonText: 'Abbrechen',
        focusConfirm: false
        }) 
    }
}
