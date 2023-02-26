import express from "express";
const router = express.Router();
import passport from "passport";
import multer from 'multer';

const upload = multer();

router.get("/login", (req, res) => {
    res.render("login");
});

router.post('/login', upload.none(), (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.send("Wrong email or password")
        }

        req.login(user, () => {
            res.send("You are authenticated")
        })

    })(req, res, next)

})

export default router;