import * as React from "react";
import "./BookEditor.scss";
import { previousPage } from "../../static";

// const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// for (x = 0; x < checkboxes.length; ++x){
//     if(checkboxes[x].value == "True"){
//         checkboxes[x].checked = "checked";
//         }
//     }

// function activateCheckbox(element:HTMLElement){
//     element.value = "True";
//     element.checked = "checked";
// }

function BookEditor() {
  return (
    <React.Fragment>
      <form method="POST" className="centered">
        <h5>Book Editor</h5>
        <div className="form-group">
          <br />
          {/* <p> Book Title   <br/>
        <input type="text" id="book-title"  name="book-title"  value={{print(book.book_title)}}/></p>
        <p> Author       <br/><input type="text" id="author"      name="author"      value={{print(book.creator_id)}} readOnly/> </p>
        <p> Book Summary  <br/><textarea className="form-control"    id="summary"     name="prologue">{{print(book.prologue)}}</textarea></p> */}
        </div>
        <div className="container">
          <ul className="ks-cboxtags">
            {/* {% for genre in genre_list %}
          <li><input type="checkbox" id={%print(genre)%} name={%print(genre)%} value="{%print(genre_list[genre])%}" onclick="activateCheckbox(this)"><label for={%print(genre)%}>{%print(genre)%}</label></li>
          {% endfor %} */}
          </ul>
        </div>
        <div className="wrapper">
          <button type="submit" value="Send Form" className="btn btn-primary">
            Accept Changes
          </button>
          <button type="reset" className="btn btn-warning">
            Reset
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => previousPage()}
          >
            cancel
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default BookEditor;
