/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
//   res.render('users');
// });

const login = function(email, password) {
  return database.getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
};
exports.login = login;



// Create a new user
router.post('/', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  database.addUser(user)
    .then(user => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userId = user.id;
      res.send("You logged in successfuly");
    })
    .catch(e => res.send(e));
});


//subscribe time
router.post('/subscribe', (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userId = user.id;
      res.send({ user: { name: user.name, email: user.email, id: user.id } });
    })
    .catch(e => res.send(e));
});

//logout time
router.post('/logout', (req, res) => {
  req.session.userId = null;
  res.send({});
});

//login time
router.get("/me", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.send({ message: "not logged in" });
    return;
  }

  database.getUserWithId(userId)
    .then(user => {
      if (!user) {
        res.send({ error: "no user with that id" });
        return;
      }

      res.send({ user: { name: user.name, email: user.email, id: userId } });
    })
    .catch(e => res.send(e));
});

module.exports = router;
