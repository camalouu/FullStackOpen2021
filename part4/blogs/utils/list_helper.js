
const totalLikes = blogsList =>
    blogsList.reduce(
        (total, current) => total += current.likes, 0
    )

const favoriteBlog = blogsList =>
    blogsList.reduce(
        (previousBlog, blog) =>
            blog.likes > previousBlog.likes ? blog : previousBlog
    )

const mostBlogs = blogs => {
    const authors = {}
    let max = 0
    return blogs.reduce(
        (previous, blog) => {
            const { author } = blog
            if (author in authors) {
                const number = ++authors[author]
                if (number > max) {
                    max = number;
                    previous = { author, blogs: number }
                }
            }
            else authors[author] = 1
            return previous
        }, { author: "everyone", blogs: 1 })
}

const mostLikes = blogs => {
    const authors = {}
    let likes = 0;

    return blogs.reduce((result, blog) => {
        const { author } = blog
        if (author in authors)
            authors[author] += blog.likes
        else
            authors[blog.author] = blog.likes
        if (authors[author] > likes) {
            likes = authors[author]
            result = { author, likes }
        }
        return result
    }, { author: "everyone", likes: "0" })
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}