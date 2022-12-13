const bodyParser = require("body-parser");
const express = require("express");
const { machineLearning } = require("firebase-admin");
const db = require("./config");

const collec = {
     Task: db.collection("Tasks"),
     Credential: db.collection("Cresentials")
}
let usermail ='';
let eachUser='';
const app = express();

const PORT = process.env.PORT || 80;

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
let today = new Date();
let day = today.toLocaleDateString("en-US", options);

app.get('/',(req,res)=>{
    res.render("login",{ErrorMsg:''});
})
app.get('/signup',(req,res)=>{
    res.render("signup",{errorMsg: ""});
})

app.post('/signup', async(req,res)=>{
    let cred = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(cred.email.match(pattern) && cred.password.length>=3){
    await collec.Credential.add(cred);
    eachUser= db.collection(`${cred.email}`);
    // const snap = await collec.Credential.add();
    usermail = cred.email;
    res.redirect('/tasks');
    }else{
      res.render('signup',{errorMsg: "Enter Correct credentials"});
    }
})
app.post('/', async(req,res)=>{
    let cred = {
        email: req.body.email,
        password: req.body.password
    }
    const snap = await collec.Credential.get();
    snap.forEach((doc) => {
        // console.log(doc.id, '=>', doc.data());
        if(cred.email===doc.data().email && cred.password===doc.data().password){
            usermail=cred.email;
            return res.redirect('/tasks');
        }
      });
      res.render('login',{ErrorMsg: "Invalid Credentials"});
})
app.get('/tasks', async (req, res) => {
      let snapshot = await db.collection(`${usermail}`).orderBy('time').get(); 
       let todolist = snapshot.docs?.map((doc) => ({ id: doc.id, ...doc.data() }));
    //    console.log(todolist);
        res.render("list", { kindOfDay: day, newListItems: todolist });
    // }

});

app.post("/tasks", async (req, res) => {
  const tjson = {
    task: req.body.newItem,
    time: Date.now(),
  };
  let len = tjson.task.substr(0);
  if (len <= 0) {
    return;
  }
  
  await db.collection(usermail).add(tjson);
  res.redirect("/tasks");
});

app.post("/del", async (req, res) => {
  await db.collection(usermail).doc(req.body.delbtn).delete();
  res.redirect("/tasks");
});

app.listen(PORT, () => {
  console.log(`port is running successfully at server ${PORT} !`);
});