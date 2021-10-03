export const handleHome = (req, res) => {
  console.log("Start handleHome");
  res.render("home", { pageTitle: "Home" });
};
