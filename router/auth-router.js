const express=require('express')
const router=express.Router();

const{signup, login, loginpost,signuppost, tasks, taskspost, del}=require('../controller/auth-controller');
// const{tasks, taskspost}=require('../controller/task-controller');

router.route('/').get(login);
router.route('/').post(loginpost);
router.route('/signup').get(signup);
router.route('/signup').post(signuppost);
router.route('/tasks').get(tasks);
router.route('/tasks').post(taskspost);
router.route('/del').post(del);

module.exports=router;