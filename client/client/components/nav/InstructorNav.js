import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "../../../../server/server/models/user";
const { requireSignin, verifyEmail } = require("../../../../server/server/middleware/index.js");



const InstructorNav = () => {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, []);

  // Check if user is logged in
  const isLoggedIn = (req, res, next) => {
    if (req.session && req.session.user) {
      // User is logged in
      next();
    } else {
      // User is not logged in
      res.redirect("/login");
    }
  };
  app.get("/dashboard", isLoggedIn, (req, res) => {
    // Render the dashboard for logged-in users
    res.render("dashboard");
  });
  return (

    <div className="nav flex-column nav-pills p-2">
      <Link legacyBehavior href="/instructor">
        <a className={`nav-link ${current === "/instructor" && "active"}`}>
          Dashboard 
        </a>
      </Link>
      <Link legacyBehavior href="/instructor/course/create">
        <a
          className={`nav-link ${
            current === "/instructor/course/create" && "active"
          }`}
        >
          Tour Packages
        </a>
      </Link>
    </div>
  );
};

export default InstructorNav;
