import React, { useEffect } from "react";
import { getRandomBooks } from "../axiosRequests/booksRequests";
import Carousel from "react-bootstrap/Carousel";
import "../styles/Carousel.css";

const Carousel1 = ({ title, info }) => {
  const [rndBooks, setRndBooks] = React.useState([]);

  useEffect(() => {
    getRandomBooks(24).then(({ data }) => setRndBooks(data));
  }, []);

  return (
    <div className="carouselMainDiv">
      <div>
        <h6>{title}</h6>
        <p>{info}</p>
        <Carousel>
          <Carousel.Item>
            <div className="slideImagediv">
              {rndBooks &&
                rndBooks.map((book, index) => {
                  return index < 8 ? (
                    <img src={book.img} alt="..." key={book.id} />
                  ) : null;
                })}
            </div>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <div className="slideImagediv">
              {rndBooks &&
                rndBooks.map((book, index) => {
                  return index > 7 && index < 16 ? (
                    <img src={book.img} alt="..." key={book.id} />
                  ) : null;
                })}
            </div>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <div className="slideImagediv">
              {rndBooks &&
                rndBooks.map((book, index) => {
                  return index > 15 && index < 24 ? (
                    <img src={book.img} alt="..." key={book.id} />
                  ) : null;
                })}
            </div>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Carousel1;
