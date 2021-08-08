import React from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBooksByCategory } from "../axiosRequests/booksRequests";
import { setBooks } from "../store/books";

const Dropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [dropdownOpen, setOpen] = React.useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const selectCategory = (category) => {
    getBooksByCategory(category).then(({ data }) => {
      dispatch(setBooks(data));
      history.push("/books");
    });
  };

  const categorias = [
    "Biography",
    "Business & Money ",
    "Kids",
    "Classic Literature & Fiction",
    "Comics & Graphic Novels",
    "Cooking",
    "Crime, Thriller, Mystery",
    "Science Fiction & Fantasy",
    "Science",
    "Self-Help",
  ];

  return (
    <div>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret color="" className="drop-color">
          Categories
        </DropdownToggle>
        <DropdownMenu className="categories">
          {categorias.map((categoria, index) => (
            <DropdownItem
              key={index}
              onClick={() => selectCategory(categoria)}
              className="drop-color"
            >
              {categoria}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
};

export default Dropdown;
