import books from "../data/books";
import { capitalizeFirstLetter } from "./strings";

export const BookInfo = (props) => {
  const { bookName } = props;
  console.log(bookName);
  if (!bookName) return;

  let title;
  let description;

  if (bookName.includes("EPILOGUE")) {
    title = capitalizeFirstLetter(bookName.split(" ")[0]) + " Epilogue";
  } else {
    title = "Book " + capitalizeFirstLetter(bookName);
  }

  for (const b of books) {
    if (b.book === bookName) {
      title += b.tag ? ": " + b.tag : "";
      description = b.description;
    }
  }

  return (
    <div className="book-info">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};
