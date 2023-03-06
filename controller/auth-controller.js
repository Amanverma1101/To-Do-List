const db = require("../database/config");
const collec = {
    Task: db.collection("Tasks"),
    Credential: db.collection("Cresentials")
}
let usermail ='';
let eachUser='';

var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();
  let day = today.toLocaleDateString("en-US", options);


const signup=async(req,res)=>{
    res.render("signup",{errorMsg: ""});
}
const login=async(req,res)=>{
    res.render("login",{ErrorMsg:''});
}
const loginpost =  async(req,res)=>{
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
      return res.render('login',{ErrorMsg: "Invalid Credentials"});
}
const signuppost = async(req,res)=>{
    let cred = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(cred.email.match(pattern) && cred.password.length>=6){
    await collec.Credential.add(cred);
    eachUser= db.collection(`${cred.email}`);
    // const snap = await collec.Credential.add();
    usermail = cred.email;
    return res.redirect('/tasks');
    }else{
      return res.render('signup',{errorMsg: "Enter Valid credentials"});
    }
}



const tasks=async (req, res) => {
    let snapshot = await db.collection(`${usermail}`).orderBy('time').get(); 
     let todolist = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
     return res.render("list", { kindOfDay: day, newListItems: todolist });
}
const taskspost = async (req, res) => {
    const tjson = {
      task: req.body.newItem,
      time: Date.now(),
    };
    let len = tjson.task.substr(0);
    if (len <= 0) {
      return;
    }
    
    await db.collection(usermail).add(tjson);
    return res.redirect("/tasks");
  }


  const del = async (req, res) => {
    await db.collection(usermail).doc(req.body.delbtn).delete();
    return res.redirect("/tasks");
  }

module.exports={signup,login,loginpost,signuppost,tasks,taskspost,del};