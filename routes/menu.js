const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { title } = require('process');

router.get('/', (req, res) => {
  db.query('SELECT * FROM menu ORDER BY id DESC', (err, menuItems) => {
    if (err) {
      console.error('Error fetching menus:', err);
      res.status(500).send('Error fetching menus');
    } res.render('menu/list', {
        title: 'Daftar Menu',
        menuItems : menuItems
    });
  });
});

router.get('/add', (req, res) => {
    res.render('menu/add', { title: 'Tambah Menu' });
});

router.post('/', (req, res) => {
    const { nama, deskripsi, harga, tipe } = req.body;
    const sql = 'INSERT INTO menu (nama, deskripsi, harga, tipe) VALUES (?, ?, ?, ?)';
    db.query(sql, [nama, deskripsi, harga, tipe], (err, result) => {
        if (err) {
            console.error('Error adding menu:', err);
            res.status(500).send('Error adding menu');
        } else {
            res.redirect('/menu');
        }
    });    
});

router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM menu WHERE id = ?';
    db.query(sql, [id], (err, menu) => {
        if (err) {
            console.error('Error fetching menu:', err);
            res.status(500).send('Menu Tidak Ditemukan.');
        } else {
            res.render('menu/edit', { title: 'Edit Menu', menu: menu[0] });
        }
        res.render('menu/edit', 
        { title: 'Edit Menu',
             item: result[0]
      });
    });
});

router.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { nama, deskripsi, harga, tipe } = req.body;
    const sql = 'UPDATE menu SET nama = ?, deskripsi = ?, harga = ?, tipe = ? WHERE id = ?';

    db.query(sql, [nama, deskripsi, harga, tipe, id], (err, result) => {
        if (err) {
            console.error('Error updating menu:', err);
            res.status(500).send('Error updating menu');
        } else {
            res.redirect('/menu');
        }
    });
});

router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM menu WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting menu:', err);
            res.status(500).send('Error deleting menu');
        } else {
            res.redirect('/menu');
        }
    });
});

module.exports = router;
