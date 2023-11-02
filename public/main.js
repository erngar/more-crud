const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {    
    //send PUT request here
    fetch('/quotes', {
        method: 'put',
        headers: {'content-type':'application/json' },
        body: JSON.stringify({
            name: 'Dart Vader',
            quote: 'I find your lack of faith distubing',
        }),
    })
})
