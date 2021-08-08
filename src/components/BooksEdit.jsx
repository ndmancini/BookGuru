import React from "react";
import { useSelector } from "react-redux";

const BooksEdit = ({
  bookPropsArray,
  changeHandler,
  submitHandler,
  deleteBook,
}) => {
  const { singleBook } = useSelector((store) => store);

  return (
    <div className="divEditBookGral">
      <div className="dataimg">
        <div>
          <form>
            <div className="editMainDiv">
              <div style={{ padding: "1vh 0em" }}>
                <input
                  style={{
                    width: "55vw",
                    textAlign: "center",
                  }}
                  type="text"
                  defaultValue={singleBook.title}
                  name="title"
                  onChange={changeHandler}
                ></input>
              </div>
              <div className="inputImgDiv">
                <div className="editBookDiv">
                  {bookPropsArray.map((item) => {
                    return item === "price" ? (
                      <div className="labelAndInputDiv" key={item}>
                        <label htmlFor={singleBook[item]}>{item}:</label>
                        <input
                          style={{ width: "20vw" }}
                          type="number"
                          defaultValue={singleBook[item]}
                          name={item}
                          onChange={changeHandler}
                        ></input>
                      </div>
                    ) : (
                      <div className="labelAndInputDiv" key={item}>
                        <label htmlFor={singleBook[item]}>{item}:</label>
                        <input
                          style={{ width: "20vw" }}
                          type="text"
                          defaultValue={singleBook[item]}
                          name={item}
                          onChange={changeHandler}
                        ></input>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <img
                    className="singleMovieImageDiv"
                    src={singleBook.img}
                    alt="singleBookImg"
                  />
                </div>
              </div>
              <div className="descriptionAndSaveButtonDiv">
                <label htmlFor="Description">Description:</label>
                <textarea
                  className="descriptionDiv"
                  type="text"
                  defaultValue={singleBook.description}
                  name="description"
                  onChange={changeHandler}
                ></textarea>
                <div className="addToCartEditButton">
                  <div className="editSingleButtonDiv">
                    <button
                      className="onlyButton"
                      onClick={(e) => submitHandler(e, singleBook.id)}
                    >
                      Save
                    </button>
                  </div>
                  <div className="editSingleButtonDiv">
                    <button
                      className="onlyButton"
                      onClick={(e) => deleteBook(e, singleBook.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BooksEdit;
