'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database("studyPlan.db", (err) => {
    if (err) {
        throw new Error(err);
    }
});

const crypto = require('crypto');

exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Students WHERE email=?';
        db.get(sql, [email], (err, row) => {
            if (err) {
                return reject(err);
            }
            if (row === undefined) {
                return resolve(false);
            }
            const user = {
                id: row.id,
                name: row.name,
                surname: row.surname,
                email: row.email,
                type: row.type
            }
            const salt = row.salt;
            crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                if (err) {
                    return reject(err);
                }
                if (!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword)) {
                    return resolve(false);
                }
                resolve(user);
            });
        });
    });
}


exports.getUserInfo = (user) => {
    const sql = "SELECT * FROM Students WHERE id=? ";
    return new Promise((resolve, reject) => {
        db.get(sql, [user], (error, row) => {
            if (error) {
                return reject(error);
            }
            const user = {
                id: row.id,
                name: row.name,
                surname: row.surname,
                email: row.email,
                type: row.type
            }
            return resolve(user);
        })
    })
}