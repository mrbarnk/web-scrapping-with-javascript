const fs = require('fs')

if(fs.existsSync('products.json')) {
    const data = fs.readFileSync('products.json', 'utf8')

    const json = JSON.parse(data)

    const newJson = json.filter(item => item.title != "")

    console.log(newJson)

    fs.writeFileSync('products.json', JSON.stringify(newJson, null, 21))
    // console.log(data)
}