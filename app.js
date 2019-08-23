$(document).ready(function () {
    $.get('products.json', (data) => {
        const json = JSON.parse(data)

        console.log(json)
    })
});