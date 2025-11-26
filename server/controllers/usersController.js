import Airtable from 'airtable';
import escapeHtml from 'escape-html';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AIRTABLE_RECORD_ID_REGEX = /^rec[a-zA-Z0-9]{14}$/;

const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(
    process.env.AIRTABLE_BASE_ID
);

const sanitizeEmail = (value = '') => {
    const trimmedValue = value.toString().trim();
    if (!EMAIL_REGEX.test(trimmedValue)) {
        return null;
    }
    return trimmedValue;
};

const escapeFormulaValue = (value = '') => value.replace(/'/g, "\\'");

const isValidRecordId = (value = '') => AIRTABLE_RECORD_ID_REGEX.test(value.trim());

const sanitizeOptionalUrl = (value) => {
    if (!value) {
        return null;
    }
    try {
        const parsed = new URL(value);
        if (['http:', 'https:'].includes(parsed.protocol)) {
            return parsed.toString();
        }
    } catch (error) {
        // ignore invalid URL
    }
    return null;
};

const sanitizeText = (value) => (typeof value === 'string' ? value.trim() : '');

/* GET /users
Get all users from Airtable alongside all their fields */
const getAll = async (_req, res) => {
    try {
        const records = await base('Users').select().all();
        const users = records.map((record) => record.fields);
        res.json(users);
    } catch (error) {
        console.error('Error getting users', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

/* GET /users/:id
Get a single user details based on their email address, set as primary key in Airtable */
const getOne = async (req, res) => {
    const userEmail = sanitizeEmail(req.params.id);
    if (!userEmail) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
        const records = await base('Users')
            .select({
                filterByFormula: `{Email} = '${escapeFormulaValue(userEmail)}'`,
                maxRecords: 1
            })
            .firstPage();

        if (records.length > 0) {
            const record = records[0];
            res.json(record.fields);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error getting single user', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

/* POST /users
Create new user upon first log in */
const create = async (req, res) => {
    const safeEmail = sanitizeEmail(req.body.email);
    const safeName = sanitizeText(req.body.name);
    const pictureUrl = sanitizeOptionalUrl(req.body.picture_url);
    const role = sanitizeText(req.body.role) || 'Linguist';

    if (!safeEmail || !safeName) {
        return res.status(400).json({ error: 'Email and name are required' });
    }

    const payload = {
        Email: safeEmail,
        Name: safeName,
        Role: role
    };

    if (pictureUrl) {
        payload.Picture = pictureUrl;
    }

    try {
        const createdRecord = await base('Users').create(payload);
        res.json(createdRecord.fields);
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

/* PUT /users/:id
TODO */
const update = async (_req, res) => {
    res.status(501).json({ error: 'Update user not implemented' });
};

/* DELETE /users/:id
TODO: not currently used */
const remove = async (req, res) => {
    const userId = req.params.id;
    if (!isValidRecordId(userId)) {
        return res.status(400).json({ error: 'Invalid record identifier' });
    }

    try {
        await base('Users').destroy(userId);
        res.send(`Deleted user with ID ${escapeHtml(userId)}`);
    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

export {
    getAll,
    getOne,
    create,
    update,
    remove
};
