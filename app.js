$(document).ready(function () {
    $.get('https://raw.githubusercontent.com/mrbarnk/web-scrapping-with-javascript/master/products.json', (data) => {
        const json = JSON.parse(data)
        // const product = $("#product_div").clone()
        json.forEach(item => {
            const product = $("#product_div").clone()
            product.removeAttr('hidden')
            $("#product_title").html(item.title)
            $("#product_image").attr('src', item.imageUrl)
            $("#product_price").html(item.price)
            product.appendTo("#product_parent")
            console.log(item.price)
        });
        // console.log(json)
    })
});