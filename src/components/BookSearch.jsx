import { useState } from "react"
import axios from "axios"
import "./Book.css"


const BookSearch = () => {
    const [title, setTitle] = useState("")
    const [books, setBooks] = useState([])


    const HandleSearch = () => {
        axios.get(` https://www.googleapis.com/books/v1/volumes?q=${title}`)
            .then((res) => {
                setBooks(res.data.items)
                console.log(res.data.items)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }
    return (
        <>
            <div className="Header">
                <p>BOOK SEARCH</p>
            </div>
            <div className="btns-wrapper">
                <input placeholder="Enter Book Title" onChange={(e) => { setTitle(e.target.value) }} type={"text"} />
                <button onClick={HandleSearch}>Search</button>
            </div>
            <div className="card-wrapper">
                {books.map((book, idx) => (
                    <div className="cards">
                        <a href={book.volumeInfo.previewLink}>
                            <div className="book-image">
                                <img width={150} height={250} src={book.volumeInfo.imageLinks.thumbnail} alt="book" />
                                <div className="book-title">{book.volumeInfo.title}</div>
                                <div className="data-container">
                                    <div>{book.volumeInfo.title}</div>
                                    <div className="author">{book.volumeInfo.authors}</div>
                                    <div className="size">PageCount:{book.volumeInfo.pageCount}</div>
                                    <div className="size">Ratings:{book.volumeInfo.averageRating}</div>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </>
    )
}

export default BookSearch