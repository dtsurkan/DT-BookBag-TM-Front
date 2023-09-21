import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import { message } from "antd";
import AppLayout from "components/AppLayout/AppLayout";
import AddBookModal from "components/Modals/AddBookModal";
import ContentComponent from "components/AppLayout/ContentComponent";
import Intro from "components/Sections/Intro";
import Advantages from "components/Sections/Advantages";
import Opportunities from "components/Sections/Opportunities";
import NewCollectionBooks from "components/Sections/NewCollectionBooks";
import Subscribe from "components/Sections/Subscribe";
import { getCategories } from "lib/strapi/services/categories";
import { getBooks } from "lib/strapi/services/books";

const Home = ({ books = [], categories = [] }) => {
  // console.log("categories", categories);
  // console.log("books", books);
  const router = useRouter();
  const { profile } = useSelector((state) => state.user);
  const [IsAddingBookModal, setIsAddingBookModal] = useState(false);
  const showAddingBookModal = () => {
    if (profile) {
      setIsAddingBookModal(true);
    } else {
      message.info("You need to auth!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  };

  // const handleOk = () => setIsAddingBookModal(false);
  const handleCancelAddingBookModal = () => setIsAddingBookModal(false);

  return (
    <>
      <AppLayout>
        <ContentComponent>
          <Intro showModal={showAddingBookModal} />
          <Advantages />
          <Opportunities />
          <NewCollectionBooks books={books} showModal={showAddingBookModal} />
          <Subscribe />
        </ContentComponent>
      </AppLayout>
      <AddBookModal
        visible={IsAddingBookModal}
        onCancel={handleCancelAddingBookModal}
        categories={categories}
      />
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  console.log("params", params);

  // // Run API calls in parallel
  const [books, categories] = await Promise.all([getBooks(), getCategories()]);
  // console.log("books", books.data);
  return {
    props: {
      books: books.data,
      categories: categories.data,
    },
    revalidate: 1,
  };
};

export default Home;
