const {default: axios} = require('axios')
const cheerio = require('cheerio')
const fastArrayDiff = require('fast-array-diff')
const fs = require('fs')

axios.get('https://www.jumia.com.ng/womens-clothing/', {
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3771.0 Safari/537.36'}
  }).then(res => {
      const $ = cheerio.load(res.data)

      const products = $("div.-gallery").map(function () {
        const url = $(this).find("a.link").attr('href')
        const imageUrl = $(this).find("img.image").attr('data-src')
        const title = $(this).find("span.name").text()
        const price = $(this).find("span[data-price]").attr("data-price")

        return {url, imageUrl, title, price}
        // console.log()
      }).toArray()


      if (fs.existsSync('products.json')) {
        const oldJson = fs.readFileSync('products.json', 'utf8')
        const oldProducts = JSON.parse(oldJson)

        const diff = fastArrayDiff.diff(oldProducts, products, (a, b) => {
            return a.title === b.title && a.url === b.url
        })

        if (diff.added.length > 0) {
            console.log("======== Added ========")
            diff.added.forEach(item => {
                console.log(item)
            })
        }

        if (diff.removed.length > 0) {
            console.log("======== Removed ========")
            diff.added.forEach(item => {
                console.log(item)
            })
        }

    } else {
        products.forEach(item => console.log(item))
    }
    const newJson = products.filter(item => item.title != "")

    fs.writeFileSync('products.json', JSON.stringify(newJson, null, 21))
  }).catch(error => console.error(error))
