"# web-scrapping-with-javascript" 


Before we start this tutorial, just want to make clear that this repo was inspired by (https://www.youtube.com/watch?v=4MwjweeRRgI)[this video on andela's youtube channel]

Now, what we need to do first is to make sure we have the correct libraries to run this script we are about to make.

We'll need this three

  1. (https://www.npmjs.com/package/axios)[Axios]
  2. (https://cheerio.js.org/)[Cheerio]
  3. (https://www.npmjs.com/package/fast-array-diff)[Fast Array Diff]

# Note: Make sure you have (http://nodejs.org)[node js] installed on your system to follow up with [this tutorial](https://www.youtube.com/watch?v=4MwjweeRRgI)


Now, we need to run this command to create an app for us. ```npm init -y```

### Optional: Also to keep track of all our files and save it somewhere, we'll run ```git init``` (You need to have git installed)

To install all those libraries mentioned. You need to run ```npm install axios cheerio fast-array-diff```

Then we'll create a file called `index.js` then open the file.

The first thing we need to do in the index.js file is to require all our installed libraries.

...and we do that by writing
```
const cheerio = require('cheerio')
const axios = require('axios')
const fastArrayDiff = require('fast-array-diff')

```

So now, we need to put all of them to use.

We start by using the axios to send a get request to the url we want to get data from. "And that reminds me", what we want to do here is to get a list of product in Jumia Nigeria Website. jumia.com.ng

The url is 
```
let url = "https://www.jumia.com.ng/womens-clothing/"

```
Forgive my manners, I didn't close the string with a semicolon (;) That's how star's do

So, let start by writing a get request to Jumia.

We want to get list of "web clothings" products from the url categories.

goto google and search for "My user agent", then copy and replace it with the my_user_agent 
```
axios.get(url, {
  headers: {'User-Agent': 'my_user_agent'}
  }).then(res => {
    
  }).catch(error => console.log(error))
  ```
  
  Then inside the function, use cheerio to pasrse the html
  
  ```
  const $ = cheerio.load(res.data) // This to store the retured parsed html data to $this.
  ```
  Remember we required the cheerio up there.
  
  So the parsed content has been stored into the variable $.
  We can now use it like we use jquery jquery :)

When you inspect the url html content, you will noticed that (infact go and watch the video on andela youtube channel) so you can have the understanding of what I am trying to say here.

```
const products = $("div.-gallery").map(function () {
const url = $(this).find("a.link").attr('href')
const imageUrl = $(this).find("img.image").attr('data-src')
const title = $(this).find("span.name").text()
const price = $(this).find("span[data-price]").attr("data-price")

  return {url, imageUrl, title, price}
  // console.log()
}).toArray()
```

Now we need to save the data parsed in a file.

So we goto the top of the file again and put  ``` const fs =  require('fs')```

```


      if (fs.existsSync('products.json')) {
        const oldJson = fs.readFileSync('products.json', 'utf8')
        const oldProducts = JSON.parse(oldJson)
        
// You can learn all this block from the youtube video
        
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
 ```
 and then remove any empty title products to remove invalid products.
 
```
  const newJson = products.filter(item => item.title != "")
```
and then write the file by 
```
  fs.writeFileSync('products.json', JSON.stringify(newJson, null, 21))
```
