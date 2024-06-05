import React from "react"

function Bookshelf() {
    const initialBooks = [
        { title: 'Fourth Wing', author: 'Rebecca Yarros' },
        { title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis' },
    ]
    const [books, setBooks] = React.useState(initialBooks)

    const [currentBook, setCurrentBook] = React.useState({
        title: '',
        author: ''
    })
    const [search, setSearch] = React.useState()
    const [filteredBooks, setFilteredBooks] = React.useState([])

    function handleChange(e) {
        const newCurrentBook = structuredClone(currentBook)
        newCurrentBook[e.target.name] = e.target.value
        setCurrentBook(newCurrentBook)
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newBooks = structuredClone(books)
        newBooks.push(currentBook)
        setBooks(newBooks)
        setCurrentBook({
            title: '',
            author: ''
        })
    }

    function handleReset() {
        setBooks(initialBooks)
    }

    function handleClear() {
        setBooks([])
    }
    function handleDeleteBook(index) {
        const newBooks = structuredClone(books)
        newBooks.splice(index, 1)
        setBooks(newBooks)
    }

    function handleSearch(e) {
        setSearch(e.target.value);
        const filtered = books.filter(
            item =>
                item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.author.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredBooks(filtered);
    }


    return (
        <div className="bookshelfDiv">
            <div className="formDiv">
                <h3>Add a Book</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        name="title"
                        value={currentBook.title}
                        placeholder="Enter book title..."
                        onChange={handleChange}/>
                    <input type="text"
                        name="author"
                        value={currentBook.author}
                        placeholder="Enter book author..."
                        onChange={handleChange}/>
                    <button type="submit">Add Book!</button>
                </form>
            </div>
            <input type="text"
                name="search"
                value={search}
                placeholder="Search your Book here..."
                onChange={handleSearch}/>
            {(filteredBooks.length>0?filteredBooks:books).map((item, index) => {
                return <div className="bookCardsDiv" key={index}>
                    <p>{item.title} - {item.author}</p>
                    <button onClick={() => handleDeleteBook(index)}>🗑️</button>
                </div>
            })}
            <button onClick={handleReset}>Reset Books</button>
            <button onClick={handleClear}>Clear Books</button>
        </div>
    )
}
export default Bookshelf