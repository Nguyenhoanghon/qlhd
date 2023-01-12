const jwt = require("jsonwebtoken");
const config = require("../Config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const ROLES = db.ROLES;

verifyToken = (req, res, next) => {
  //let token = req.headers["Authorization"];
  //const token = req.header('Authorization')
  const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  //console.log(token,req.body.username)
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
//Check Role TongGiamDoc
isTongGiamDoc = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === ROLES[4]) { //"TongGiamDoc") {
            console.log(roles[i].name);
            next();
            return;
          }
        }

        res.status(403).send({ message: "Yêu cầu quyền truy cập là TongGiamDoc" });
        return;
      }
    );
  });
};

isGiamDoc = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === ROLES[3] || roles[i].name === ROLES[4]) {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Yêu cầu quyền truy cập là Giám đốc" });
        return;
      }
    );
  });
};

isTruongPhong = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === ROLES[2] || roles[i].name === ROLES[3]|| roles[i].name === ROLES[4]) {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Yêu cầu quyền là Trưởng Phòng" });
        return;
      }
    );
  });
};

isAM = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === ROLES[1] || roles[i].name === ROLES[2] || roles[i].name === ROLES[3] || roles[i].name === ROLES[4]) {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Yêu cầu quyền là AM" });
        return;
      }
    );
  });
};

isNhanvien = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === ROLES[0]|| roles[i].name === ROLES[1] || roles[i].name === ROLES[2] || roles[i].name === ROLES[3] || roles[i].name === ROLES[4]) {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Yêu cầu quyền là Nhanvien" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isTongGiamDoc,
  isGiamDoc,
  isTruongPhong,
  isAM,
  isNhanvien
};
module.exports = authJwt;
