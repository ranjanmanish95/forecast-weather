const Path = require('path');
const express = require('express');
const hbs = require('hbs');
const forcast = require('./utils/forcast');
const geocode = require('./utils/geocode');

const app= express();
const port = process.env.PORT || 3000;
//define paths for express config
const publicDirectoryPath = Path.join(__dirname,'../public');
const viewsPath = Path.join(__dirname,'../templates/views');
const partialsPath = Path.join(__dirname,'../templates/partials');

//set up handlebars engine and views
app.set('view engine','hbs');
app.set('views',viewsPath);

hbs.registerPartials(partialsPath);


//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/',(req,res)=>{
res.render('index',{
    title: 'Weather',
    name: 'Manish Ranjan',
    desc: 'Know your weather here!',
})
});

app.get('/help',(req,res)=>{ 
res.render('help',{
      title: 'U want any help?',
      name: 'Manish Ranjan',
      helpText: 'Here there will be some helptext',
  })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'This is About Page.',
        name: 'Manish Ranjan',
        aboutText:'This will be the description of the application and the developer team.',
    })
})

app.get('/weather',(req,res)=>
{
    if(!req.query.location){
      return res.send({
          error: 'Please enter the location or city',
      })
    }
    else
    {
    geocode(req.query.location,(error,{latitude,longitude,Address} = { })=>
    {
       if(error)
       {
           return console.log(error);
       }
    
      forcast(latitude,longitude,(error,forecastData) =>
     {
        if(error)
        {
            return console.log(error);
        }

        res.send({
            Forcast: `There will be ${forecastData.Forcast}. ${forecastData.Temperature} ${forecastData.Precipitation}`,
            Address,
            Location: req.query.location
        })
    })

    })
}
    
    /*res.send({
            forecast:'It is snowy',
            location: 'Philadelpia',
            address: req.query.address,
        })*/

    })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Manish Ranjan',
        errorText:'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Manish Ranjan',
        errorText:'Page not found.'
    })
})


/*
app.get('',(req,res)=>
res.send('home page')
);


//app.com
//app.com/about
//app.com/help
//app.com/weather

app.get('/about',(req,res)=>
res.send('<h1>This is about page.</h1>')
);

app.get('/help',(req,res)=>
res.send('This is help page.'));

app.get('/weather',(req,res)=>
res.send({
    name: 'manish',
    place: 'Patna',
    lat: '40.093',
    long: '34.093'
}));
*/
app.listen(port, ()=>
console.log('Server is up on port'+ port)
);


