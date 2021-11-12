const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../Members');

// Get All Members
router.get('/', (req, res) => res.json(members));

// Get Single Member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

if(found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
}
else {
    res.status(400).json({ message: `NO member found with the id of ${req.params.id}`})
}
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if (!newMember.name || !newMember.email) {
        return res.status(400).json( { message: 'Please add a name and email' });
    }
    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

// Update Member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

if (found) {
    const updateMemebr = req.body;
    members.forEach(member => {
        if(member.id === parseInt(req.params.id)) {
            member.name = updateMemebr.name ? updateMemebr.name : member.name;
            member.email = updateMemebr.email ? updateMemebr.email : member.email;

            res.json({ message: 'Member updated', member});
        }
    })
}
else {
    res.status(400).json({ message: `NO member found with the id of ${req.params.id}`})
}
});

// Delete Member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

if(found !== -1) {
    res.json({ message: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))})
}
else {
    res.status(400).json({ message: `NO member found with the id of ${req.params.id}`})
}
});


module.exports = router;
