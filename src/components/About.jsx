import React from "react";
import "../styles/About.css";

const AboutContainer = () => {
  return (
    <div className="about">
      <h3>
        BookGuru is a books sale site, a project made by six students from
        Plataforma 5 in two weeks. You can search for books, view details of each
        book, search by categories, add to the shopping cart, remove books from
        the cart and modify the quantity you're purchasing. From the shopping
        cart module you can see the previous orders made by the logged user.
        Also we have some extra options for the admin users such as edit books,
        promote admin rights to other users and see all the orders made by any
        user on the site.
      </h3>
      <br />
      <h3>
        We are: Matias Carou, Nicolas Mancini, Luis Osorio, Paula Binimelis,
        Pilar Dubiau & Alejandro Rusinoff
      </h3>
      <br />
      <br />
      <h3>Thanks for shopping with us!</h3>
    </div>
  );
};

export default AboutContainer;
