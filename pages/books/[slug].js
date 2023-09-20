import { useRouter } from "next/router";
import { Button } from "antd";
import { getBookBySlug, getBooks } from "lib/strapi/services/books";

const BookItem = ({ book }) => {
  console.log("book", book);
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.back()}>Back</Button>
      {book.map((item) => (
        <div key={item.slug}>
          <h1>{item.name}</h1>
          <h1>{item.slug}</h1>
        </div>
      ))}
    </div>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const [books] = await Promise.all([getBooks()]);

  // Get the paths we want to pre-render based on posts
  const paths = books.data.map((post) => `/books/${post.slug}`);
  console.log("paths", paths);
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  console.log("params", params);
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const [book] = await Promise.all([
    // fetchStrapiAPI(`/books?slug=${params.slug}`),
    getBookBySlug(params.slug),
  ]);

  // Pass post data to the page via props
  return { props: { book: book.data } };
}

export default BookItem;
