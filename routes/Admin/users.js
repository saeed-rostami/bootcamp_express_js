const express = require('express');

const {
    createUser, updateUser, getUsers, getUser, deleteUser
} = require(".../controllers/Admin/users");


// const {protect, authorization} = require('middleware/auth');
// const advancedResults = require("/middleware/advancedQuery");
//
//
// const User = require("/models/User");
//
const router = express.Router({mergeParams: true});
//
// router.use(protect);
// router.use(authorization('admin'));
//
//
// router.route('/')
//     .get(advancedResults(User), getUsers)
//     .post(createUser);
//
// router.route('/:id')
//     .get( getUser)
//     .put(updateUser)
//     .delete(deleteUser);


module.exports = router;


