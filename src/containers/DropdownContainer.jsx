import React from 'react';
import { DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { getBooksByCategory } from '../axiosRequests/booksRequests';
import { setCategory } from '../store/category';
import "../styles/Categories.css";

const Dropdown = () => {
  const dispatch = useDispatch();
  const [dropdownOpen, setOpen] = React.useState(false);

  const toggle = () => setOpen(!dropdownOpen);

    const selectCategory = (category)=>{
        getBooksByCategory(category)
        .then(({data}) => {
            dispatch(setCategory(data))
        }) 
    }

    const categorias = [
        "All","Biography","Business","Childish","Classic Literature",
        "Comics","Cooking","Crime","Disease","Fantasy","Fiction","Graphic Novels",
        "Mystery","Reference","Science","Self-Help","Thriller"
    ]

<<<<<<< HEAD
    return(
        <div>
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret color="" className="drop-color">
                Categories
                </DropdownToggle>
                <DropdownMenu className="categories">
                    {categorias.map(categoria => 
                    <DropdownItem onClick={() => selectCategory(categoria)} className="drop-color">
                        <Link className="categories" to={`/category/${categoria}`}>{categoria}</Link>
                    </DropdownItem>)}
                </DropdownMenu>
            </ButtonDropdown>
        </div>
    )
}
=======
>>>>>>> 8f9b20d12bc39ce6b901822debfac554caf42732

  return (
    <div>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret color="" className="drop-color">
          Categories
        </DropdownToggle>
        <DropdownMenu className="categories">
          {categorias.map((categoria) => (
            <DropdownItem
              onClick={() => selectCategory(categoria)}
              className="drop-color"
            >
              <Link class="categories" to={`/category/${categoria}`}>
                {categoria}
              </Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
};

export default Dropdown;