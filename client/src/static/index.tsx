import { Book } from "@mui/icons-material";
import { BookProps, ContainerProps } from "../common/Book";
import BookEntity from "../components/Container/Book";
import ChapterEntity from "../components/Container/Chapter";
import { NavigateFunction, useNavigate } from "react-router-dom";
import UserProps from "../common/User";
import LibraryEntity from "../components/Container/Library";
import PublishingEntity from "../components/Container/Publishing";
import React from "react";

export function displayBooks(books: any[]) {
  return books.map((book: BookProps) => {
    return (
      <div key={book.id} className="novelC">
        <BookEntity
          book={book}
          // bookTitle={book.bookTitle}
          // image={book.image}
          // MRchapter={book.MRchapter}
          // Rchapter={book.Rchapter}
          // authorUsername={book.authorUsername}
          // authorPenName={book.authorPenName}
          // authorId={book.authorId}
          // id={book.id}
        />
      </div>
    );
  });
}

export function displayLibraryBooks(books: any[], user?: UserProps) {
  return books.map((book) => {
    return (
      <div key={book.id}>
        <LibraryEntity
          image={book.image}
          MRchapter={book.MRchapter}
          Rchapter={book.Rchapter}
          bookTitle={book.bookTitle}
          authorUsername={book.author}
          bookId={book.id}
          user={user}
        />
      </div>
    );
  });
}

export function displayPublishedBooks(books: any[], user?: UserProps) {
  return books.map((book) => {
    return (
      <div key={book.id} className="novelC">
        <PublishingEntity user={user} book={book} />
      </div>
    );
  });
}

export function displayChapters(
  chapters: any[],
  user?: UserProps,
  book?: BookProps
) {
  return chapters.map((chapter) => {
    return (
      <div className="chapter-entity" key={chapter.id}>
        <ChapterEntity
          id={chapter.id}
          chapterTitle={chapter.chapterTitle}
          context={chapter.context}
          bookId={chapter.bookId}
          chapterAuthor={chapter.chapterAuthor}
          user={user}
          book={book}
        />
      </div>
    );
  });
}

export function selectChapter(numberOfChapters: number | null) {
  type Option = {
    value: number;
    label: string;
  };

  type chapterNumbers = {
    options: Option[];
    onChange: (value: string) => void;
  };

  const options: Option[] = [];

  if (numberOfChapters == null) {
    console.log("null value in the options");
    return (
      <div>
        <select>
          <option value={1}>{"1"}</option>
        </select>
      </div>
    );
  } else {
    for (let index = 1; index <= numberOfChapters; index++) {
      options.push({ value: index, label: index.toString() });
    }

    const SelectList: React.FC<chapterNumbers> = ({ options, onChange }) => {
      return (
        <React.Fragment>
          {options.map((option) => (
            <select
              key={option.value}
              onChange={(e) => onChange(e.target.value)}
            >
              <option value={option.value}>{option.label}</option>
            </select>
          ))}
        </React.Fragment>
      );
    };
  }
}

// export function displayAuthorChapters(
//   chapters: any[],
//   user: UserProps,
//   book: BookProps
// ) {
//   return chapters.map((chapter) => {
//     return (
//       <div key={chapter.id}>
//         <ChapterEntity
//           id={chapter.id}
//           chapterTitle={chapter.chapterTitle}
//           context={chapter.context}
//           bookId={chapter.bookId}
//           chapterAuthor={chapter.chapterAuthor}
//           user={user}
//         />
//       </div>
//     );
//   });
// }

export function displayModal(element: HTMLElement | null) {
  if (element != null) {
    console.log("element before", element);
    if (element.style.display == "block" || element.style.display == null) {
      element.style.display = "none";
      console.log("element after changed to none", element);
    } else {
      element.style.display = "block";
      console.log("element after changed to block", element);
    }
  }
}

// function checkEmail(element){
//   if (element.value.includes("@") == false || element.value.includes(".com") == false){
//       element.style.borderColor="red";
//       emailSubtext.classList="subtext";
//       emailSubtext.innerHTML="Invalid Email";
//     }
//   else{
//       emailSubtext.classList="hidden-subtext";
//       element.style.borderColor="green";
//       }
// }

// function checkPassword(password, password1){
//     if(password == password1){
//       document.getElementById('password').style.borderColor='green';
//     }
//     else
//     {
//         document.getElementById('')
//     }
//   }

// export function displayModal(element: HTMLElement) {
//   if (element.style.display === "block" || element.style.display === null) {
//     element.style.display = "none";
//   } else {
//     element.style.display = "block";
//   }
// }

// export function bookMark(book: BookProps, ) {
//   fetch(`${process.env.REACT_APP_URL}libraries", {
//     method: "POST",
//     body: JSON.stringify({ book: book }),
//   }).then((_res) => {
//     setIsBookMarked(true);
//   });
// }

// export function bookMark(bookId: number) {
//   console.log(bookId);
//   fetch("/bookmark-book", {
//     method: "POST",
//     body: JSON.stringify({ bookId: bookId }),
//   }).then((_res) => {
//     window.location.reload();
//   });
// }

// export function retrieveBook(bookId: number) {
//   window.location.href = "Novel:id" + bookId;
// }

// export function retrieveChapters(bookId: number) {
//   window.location.href = "chapters?bookId=" + bookId;
// }

// export function retrieveChapter(chapterId: number) {
//   window.location.href = "view-chapter?chapter=" + chapterId;
// }

export function retrieveNextChapter(
  chapterId: number,
  navigates: NavigateFunction
) {
  navigates(`/Chapter/${chapterId}`);
}

export function retrievePreviousChapter(
  chapterId: number,
  navigates: NavigateFunction
) {
  navigates(`/Chapter/${chapterId}`);
}

// export function editBook(bookId: number) {
//   window.location.href = "edit-book?bookId=" + bookId;
// }

// export function deleteChapter(chapterId: number) {
//   fetch(`${process.env.REACT_APP_URL}chapters/${chapterId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   window.location.reload();
// }

export function deleteBook(bookId: number) {
  fetch("/delete-book", {
    method: "POST",
    body: JSON.stringify({ bookId: bookId }),
  }).then((_res) => {
    window.location.href = "book";
  });
}

export function editChapter(chapterId: number, navigates: NavigateFunction) {
  navigates(`/Chapter/${chapterId}/edit`);
}

// function checkEmail(element: HTMLElement, subtext: HTMLElement) {

//   if (element.value.includes("@") == false || element.value.includes(".com") == false){
//       element.style.borderColor="red";
//       subtext.classList="subtext";
//       subtext.innerHTML="Invalid Email";
//     }
//   else{
//       emailSubtext.classList="hidden-subtext";
//       element.style.borderColor="green";
//       }
// }

export function checkPassword(
  password: string,
  password1: string,
  element: HTMLElement
) {
  if (password == password1) {
    element.style.borderColor = "green";
  } else {
    element.style.borderColor = "red";
  }
}

export function previousPage() {
  window.history.back();
}

export function timeoutNotifications() {
  const Success = document.getElementById("successNotification");
  const Error = document.getElementById("errorNotification");
  if (Success) {
    Success.remove();
    clearInterval(window.setInterval("timeoutNotifications()", 10000));
  } else if (Error) {
    Error.remove();
    clearInterval(window.setInterval("timeoutNotifications()", 10000));
  }
}
