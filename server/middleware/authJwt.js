const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  //let token = req.headers["x-access-token"];
  //const token = req.header('Authorization')
  const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
//Check Role CEO
isCEO = (req, res, next) => {
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
          if (roles[i].name === "CEO") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require CEO Role!" });
        return;
      }
    );
  });
};

isDirector = (req, res, next) => {
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
          if (roles[i].name === "Director" || roles[i].name === "CEO") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Director Role!" });
        return;
      }
    );
  });
};

isManager = (req, res, next) => {
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
          if (roles[i].name === "Manager" || roles[i].name === "Director" || roles[i].name === "CEO") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Manager Role!" });
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
          if (roles[i].name === "AM" || roles[i].name === "Manager" || roles[i].name === "Director" || roles[i].name === "CEO") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require AM Role!" });
        return;
      }
    );
  });
};

isUser = (req, res, next) => {
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
          if (roles[i].name === "User" || roles[i].name === "AM" || roles[i].name === "Manager" || roles[i].name === "Director" || roles[i].name === "CEO") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require User Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isCEO,
  isDirector,
  isManager,
  isAM,
  isUser
};
module.exports = authJwt;
