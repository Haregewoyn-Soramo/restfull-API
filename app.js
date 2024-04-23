const express = require('express');
const app = express();
const port = 4000;
const bcrypt = require('bcrypt');

const users = []

app.set('view engine', 'ejs'); 
app.use(express.urlencoded({extended: false}))

app.use(express.static('public')); 

app.get('/login', function(req, res){
  res.render('login.ejs');
});

app.get('/registor', function(req, res){
  res.render('registor.ejs');
});

app.post('/registor', async function(req, res) {
  try {
    const hashedPassword = await bcyrpt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      confirmPassword: hashedPassword
    });
    res.redirect('/login');
  } catch (error) {
    console.error(error); 
    res.redirect('/register');
  }
  console.log(users);
});

app.post('/login', async function(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect('/login'); 
  } catch (error) {
    console.error(error); 
  }
  console.log(users);
});


app.listen(port, function(){
  console.log('You are listening to port', port);
});
