import express, { Request, Response } from 'express';

interface User {
  ID: string;
  Username: string;
  Name?: string;
}

const App = express();
App.use(express.json());

let Users: User[] = [];

// Create user
App.post('/Users', (req: Request, res: Response) => {
  const { Username, Name } = req.body;
  const ID = Math.random().toString(36).substr(2, 9);
  const NewUser: User = { ID, Username, Name };
  Users.push(NewUser);
  res.status(201).json(NewUser);
});

// Get user by ID
App.get('/Users/:ID', (req: Request, res: Response) => {
  const { ID } = req.params;
  const User = Users.find((u) => u.ID === ID);
  if (!User) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.json(User);
  }
});

// Get list of users
App.get('/Users', (req: Request, res: Response) => {
  res.json(Users);
});

// Update user by ID
App.put('/Users/:ID', (req: Request, res: Response) => {
  const { ID } = req.params;
  const { Username, Name } = req.body;
  const UserIndex = Users.findIndex((u) => u.ID === ID);
  if (UserIndex === -1) {
    res.status(404).json({ error: 'User not found' });
  } else {
    Users[UserIndex] = { ID, Username, Name };
    res.json(Users[UserIndex]);
  }
});

// Delete user by ID
App.delete('/Users/:Id', (req: Request, res: Response) => {
  const { ID } = req.params;
  const UserIndex = Users.findIndex((u) => u.ID === ID);
  if (UserIndex === -1) {
    res.status(404).json({ error: 'User not found' });
  } else {
    const deletedUser = Users.splice(UserIndex, 1);
    res.json(deletedUser[0]);
  }
});

App.listen(3000, () => {
  console.log('Server is running on port 3000');
});
