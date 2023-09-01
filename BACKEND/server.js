import express, { response } from 'express'
import bodyParser from 'body-parser'
import knex from 'knex'
import cors from 'cors'

const app = express();

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //this is the ip of the localhost
      port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'galleryproj'
    }
  });


// console.log(db.select('*').from('img'));

// db.select('*').from('img').then(console.log(response));

app.get('/', (req, res) => {
    // res.send('this is working');
    console.log(req.body)
    db.select('*').from('img').then(imgtable => {
        res.json(imgtable)
    })
    // if (!found) {
    //     res.status(400).json('not found');
    // }
    // res.send(db.select('*').from('img'));
})

app.post('/', (req, res) => {
    const body = req.body;
    dbFilter(body.Price, body.Height, body.Width, body.Style, body.isBundle, body.Search, body.sortBy).then(result => {res.json(result)})
})

app.post('/cart', (req, res) => {
    const cart = req.body.carted
    if (cart.length > 1){
        db.select('*').from('img').where('imgid', cart[0]).union([cart.forEach(element => {
            return db.select('*').from('img').where('imgid', element)
        })
    ]).then(result => {res.json(result)})
    } else {
        db.select('*').from('img').where('imgid', cart[0]).then(result => {res.json(result)})
    }
})

// const bundleobj = await db.select('').from('img').where('imgid', 23)
// console.log(bundleobj)


app.post('/Product%20Closeup/Item.html', (req, res) => {
    const imgid = req.body.imgid

    db.select('*').from('img').where('imgid', imgid)
    .then(result => {
        if (result[0].isbundle) {
            db.select('*').from('img').where('bundleid', result[0].bundleid)
            .then(result1 => {res.json(result1)})
        
        } else {
            res.json(result[0])
        }
    })
})

const testObj = {
    Price: [0, 100000],
    Height: [0, 12],
    Width: [0, 12],
    Style: ["%Modern%"],
    isBundle: false,
    Search: "",
    sortBy: "lowestprice"
}

// app.get('/', (req, res) => {
//     res.send('this is working');
// })

app.listen(3000, () =>{
    console.log('app is running on port 3000');
})


//  --> res = this is working
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/:userID
// /usercart --> PUT
// styleFilter(db, testObj.Style).then(console.log)
// dbFilter(testObj.Price, testObj.Height, testObj.Width, testObj.Style, testObj.isBundle, testObj.Search, testObj.sortBy).then(console.log)


async function dbFilter(Price, Height, Width, Style, isBundle, Search, sortBy) {
    console.log(sortBy)
    if (sortBy == "none"){
        return db.select('*').from('img').where('price','>', Price[0]).andWhere('price','<', Price[1]).intersect([
            heightFilter(db, Height), widthFilter(db, Width), styleFilter(db, Style), bundleFilter(db, isBundle), dbSearch(db, Search)])
    } else {
        // db.select('*').from('img').where('price','>', Price[0]).andWhere('price','<', Price[1]).intersect([
        //     heightFilter(db, Height), widthFilter(db, Width), styleFilter(db, Style), bundleFilter(db, isBundle), dbSearch(db, Search)]).orderBy('price', sortValue(sortBy)).then(console.log)
        return db.select('*').from('img').where('price','>', Price[0]).andWhere('price','<', Price[1]).intersect([
            heightFilter(db, Height), widthFilter(db, Width), styleFilter(db, Style), bundleFilter(db, isBundle), dbSearch(db, Search)]).orderBy('price', sortValue(sortBy))          
    }
}



function sortValue(value) {
    console.log(value == "highestprice")
    if (value == "highestprice"){
        console.log("desc")
        return "desc"
    } else {
        console.log("asc")
        return "asc"
    }
}

// function priceFilter(db, Price) {
//     return db.select('*').from('img').where('price','>', Price[0]).andWhere('price','<', Price[1])
//     .then(result => console.log(result))
// }

function heightFilter(db, Height) {
    return db.select('*').from('img').where('height','>', Height[0]).andWhere('height','<', Height[1])   
    // return db1
}

function widthFilter(db, Width) {
    return db.select('*').from('img').where('width','>', Width[0]).andWhere('width','<', Width[1])   
}

function styleFilter(db, Style) {
    const base = db.select('*').from('img')
    const Styles = Style.map(element => {
        return db.select('*').from('img').whereILike('style', element);
    })
    if (Style == []) {
        return base
    } else {
        return base.intersect(Styles)
    }
}

function bundleFilter(db, isBundle) {
    if (isBundle){
        return db.select('*').from('img').where('isbundle', 'true')
    } else {
        return db.select('*').from('img')
    }
}

function dbSearch(db, search){
    if (search == "") {
        return db.select('*').from('img');
    } else {
        return db.select('*').from('img').whereILike('img_name', `%${search}%`);  
    }
}

// function look(Search){
//     //  console.log(typeof(`%${Search}%`))
//      return db.select('*').from('img').whereILike('img_name', Search);  
// }

// look("%Modern%").then(console.log)
// console.log(priceFilter(db, [0, 10001]).intersect([heightFilter(db, [0, 10])]));

// db.select('*').from('img').where('price','>', 0).andWhere('price','<', 10001).intersect([
//     heightFilter(db, [0, 20]), widthFilter(db, [0, 10])
// ]).then(console.log)

// console.log(styleFilter(db, ["Modern", "Abstract"]))
// db.select('*').from('img').intersect([db.select('*').from('img').where('style', "Modern"), db.select('*').from('img').where('style', "Abstract")]).then(console.log)
// console.log(I.then(console.log))
// db.select('*').from('img').where('price','>', 0).andWhere('price','<', 10000).intersect(db.select('*').from('img').where('height','>', 0).andWhere('height','<', 10000)).then(console.log)
// priceFilter(db, [0, 10001]).then(console.log);
// const Style = ["Modern", "Abstract"]
// Style.forEach(element => {
//     return db.select('*').from('img').where('style', element);
// })

// styleFilter(db, ["%modern%"]).then(console.log)
// dbSearch(db, "Metropolis").then(console.log)

