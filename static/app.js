$('#all-characters').on('click',(event) => {
    event.preventDefault();
    fetch('/api/character', {method: 'GET'})
    .then ((res) => res.json())
    .then((data) => { dbData(data) });
})

function dbData (information) {
    console.log(information)
}
