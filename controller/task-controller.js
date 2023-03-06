var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();
  let day = today.toLocaleDateString("en-US", options);


const tasks=async (req, res) => {
    let snapshot = await db.collection(`${usermail}`).orderBy('time').get(); 
     let todolist = snapshot.docs?.map((doc) => ({ id: doc.id, ...doc.data() }));
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


  module.exports={tasks,taskspost,del};