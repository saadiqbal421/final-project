const { User } = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/auth");
const jwt = require("jsonwebtoken");
const  Form  = require('../models/packages');
const { nanoid } = require("nanoid");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const CLIENT_URL = "http://localhost:3001";

const verifyEmail = async (req, res) => {
  const { emailVerificationToken } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { emailVerificationToken },
      { isVerified: true, emailVerificationToken: null }
    );
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    user.isVerified = true;
    console.log(user.isVerified);
    res.json({ message: 'Account activated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    //validation
    if (!name) {
      return res.status(400).send("name is required");
    }

    if (!name.match(regName)) {
      return res.status(400).send("name is not valid");
    }
    if (!email) {
      return res.status(400).send("email is required");
    }

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailFormat)) {
      return res.status(400).send("email is not valid");
    }
    // if (!email.includes(".com")) {
    //   return res.status(400).send("email is not valid");
    // }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .send(
          "Password is required and password must be at least 6 characters"
        );
    }

    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!password.match(passRegex)) {
      return res
        .status(400)
        .send(
          "Password is not valid Enter a capital letter also along with minimum 6 characters"
        );
    }

    let userExist = await User.findOne({ email }).exec();
    if (userExist) {
      return res.status(400).send("email is already taken");
    }

    const hashedPassword = await hashPassword(password);
    console.log("reached here2");
    const user = new User({ name, email, password: hashedPassword });
    const token = crypto.randomBytes(64).toString("hex");
    user.emailVerificationToken = token;
    await user.save();
    console.log("user saved", user);
        // send verification email
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "f190151@nu.edu.pk",
            pass: "Ahmadraza@7890",
          },
          tls: {
            rejectUnauthorized: false,
          },
          pool: true,
          poolTimeout: 600000 * 1000,
        });
    
        const mailOptions = {
          from: "f190151@nu.edu.pk",
          to: user.email,
          subject: "Verify your email",
          html: `
            <h1>Welcome to the best tour experience site, Travel Ease</h1>
            <p>Please click the link below to verify your email:</p>
            <a href="${CLIENT_URL}/VerifyEmail?emailVerificationToken=${user.emailVerificationToken}">Verify Your Email.</a>
          `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Please try again");
  }
};

const login = async (req, res) => {
  try {
    const { email, password  } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(400).send("No user found");
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(400).send("Wrong password");
    }

    // if(!user.isVerified)
    // {
    //   return res.status(400).send("User Not Verified");
    // }
    if (match) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      user.password = undefined;
      res.cookie("token", token, {
        httpOnly: true,
        // secure:true
      });

      res.json(user);
    }
  } catch (err) {
    return res.status(400).send("Error. Please try again");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Successfully logged out" });
  } catch (err) {
    console.log(err);
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id).select("-password").exec();
    console.log("CURRENT_USER", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const shortCode = nanoid(6).toUpperCase();
    const user = await User.findOneAndUpdate(
      { email },
      { passwordResetCode: shortCode }
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    /* This is the email address that the email is being sent from. */

    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [process.env.EMAIL_FROM],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
              <html>
                <h1>Reset password link</h1>
                <p>Please use the following code to reset your password</p>
                <h2 style="color:red;">${shortCode}</h2>
                <i>sprintmaster.com</i>
              </html>`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Reset Password",
        },
      },
    };
    const emailSent = SES.sendEmail(params, { httpOptions: { timeout: 5000 } }).promise();
    emailSent
      .then((data) => {
        console.log(data);
        res.json({ ok: true });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    console.table({ email, code, newPassword });

    const hashedPassword = await hashPassword(newPassword);

    const user = User.findOneAndUpdate(
      { email, passwordResetCode: code },
      {
        password: hashedPassword,
        passwordResetCode: "",
      }
    ).exec();
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(400).send("Error! Try Again");
  }
};

const createnewpackage = async (req, res) => {
  try {
    // Extract the form data from the request body
    const { place="Swat",
       days="2",
        price="15000",
         description="Swat is beautiful city",
          image="some url" } = req.body;

    // Create a new instance of the Form model
    const newForm = new Form({
      place ,
      days,
      price,
      description,
      image,
    });

    // Save the form data to the database
    await newForm.save();

    // Return a success response
    return res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    // Handle any errors that occur during form submission
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while submitting the form.' });
  }
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  createnewpackage,
};