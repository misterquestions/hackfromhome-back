import { Request, Response } from 'express';
const User = require('../models/user');

// Login
export async function login(req: Request<any>, res: Response) {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// LogOut
// router.post('/users/logout', authMiddleware, async (req, res) => {
  export async function logout(req: Request<any>, res: Response) {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// LogOut all sessions
//router.post('/users/logoutAll', authMiddleware, async (req, res) => {
  export async function logoutall(req: Request<any>, res: Response) {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});


// Create user
// router.post('/users', async (req, res) => {
  export async function create(req: Request<any>, res: Response) {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    /* handle error */
    res.status(400).send(e);
  }
});

// Read user
// router.get('/users/me', authMiddleware, async (req, res) => {
  export async function readMe(req: Request<any>, res: Response) {
  res.send(req.user);
});

// Read user
// router.get('/users/:id', async (req, res) => {
  export async function read(req: Request<any>, res: Response) {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Update user
//router.patch('/users/:id', async (req, res) => {
  export async function update(req: Request<any>, res: Response) {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid operation!' });
  }

  try {
    const user = await User.findById(req.params.id);
    updates.forEach(update => user[update] = req.body[update]);
    await user.save();

    if (!user) {
      return res.status(400).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

// Delete user
//router.delete('/users/:id', async (req, res) => {
  export async function deleteUser(req: Request<any>, res: Response) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);

  } catch (e) {
    res.status(500).send();
  }
});
