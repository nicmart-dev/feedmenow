'use strict';

import express from 'express';
import {
    getAll,
    getOne,
    create,
    update,
    remove
} from '../controllers/usersController.js';

const router = express.Router();

// Route for getting all users
router.get('/', getAll);

// Route for getting a user by ID
router.get('/:id', getOne);

// Route for creating a new user
router.post('/', create);

// Route for updating a user by ID
router.put('/:id', update);

// Route for deleting a user by ID
router.delete('/:id', remove);

export default router;