// middleware.js

const users = require("./data/users");

function validateKayit(req, res, next) {
  const { kullaniciadi, sifre } = req.body;

  if (!kullaniciadi || !sifre) {
    return res.status(400).json({ hata: "Kullanıcı adı ve şifre gereklidir." });
  }

  const mevcutKullanici = users.find((u) => u.username === kullaniciadi);
  if (mevcutKullanici) {
    return res.status(401).json({ hata: "Bu kullanıcı adı zaten mevcut." });
  }

  next();
}

function validateGiris(req, res, next) {
  const { kullaniciadi, sifre } = req.body;

  if (!kullaniciadi || !sifre) {
    return res.status(400).json({ hata: "Kullanıcı adı ve şifre gereklidir." });
  }

  const girisYapan = users.find(
    (u) => u.username === kullaniciadi && u.password === sifre
  );

  if (!girisYapan) {
    return res.status(401).json({ hata: "Kullanıcı adı veya şifre hatalı." });
  }

  req.kullanici = girisYapan;
  next();
}

module.exports = {
  validateKayit,
  validateGiris,
};
