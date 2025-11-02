const express = require("express");
const router = express.Router();
router.use(express.json());

const users = require("../data/users");
const { validateKayit, validateGiris } = require("../middleware");

router.get("/kullanicilar", (req, res) => {
  res.status(200).json(users);
});

router.post("/kayitol", validateKayit, (req, res) => {
  const { kullaniciadi, sifre } = req.body;

  const yeniKullanici = {
    username: kullaniciadi,
    password: sifre,
  };

  users.push(yeniKullanici);
  res.status(201).json(yeniKullanici);
});

router.post("/giris", validateGiris, (req, res) => {
  res.status(200).json({ mesaj: `Hoş geldin, ${req.kullanici.username}!` });
});

module.exports = router;
