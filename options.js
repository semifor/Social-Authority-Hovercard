function loadOptions() {
    document.getElementById('access-id').value = localStorage['apiID'] || '';
    document.getElementById('secret-key').value = localStorage['apiSecret'] || '';
}

function saveOptions() {
    localStorage['apiID'] = document.getElementById('access-id').value;
    localStorage['apiSecret'] = document.getElementById('secret-key').value;
}

document.addEventListener('DOMContentLoaded', function(){
    loadOptions();
    document.querySelector('button').addEventListener('click', saveOptions);
});
