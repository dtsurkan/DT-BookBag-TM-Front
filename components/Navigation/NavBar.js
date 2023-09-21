import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { getBooksByAuthorOrBookName } from "lib/strapi/services/books";
import DesktopHeader from "./components/DesktopHeader";
import MobileHeader from "./components/MobileHeader";

const NavBar = () => {
  const router = useRouter();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1200 });

  const onSearchBooks = async (value) => {
    console.log("value", value);
    try {
      if (!value) {
        return [];
      }
      const response = await getBooksByAuthorOrBookName(value);
      return response.data.map((book) => {
        const { book_name, ...other } = book;
        return { value: book_name, ...other };
      });
    } catch (error) {
      console.log(`error`, error);
    }
  };
  const onSelectBook = (value, instance) => {
    router.push(`/books/${instance.slug}`);
  };

  return (
    <>
      {isTabletOrMobile ? (
        <MobileHeader
          onSelectBook={onSelectBook}
          onSearchBooks={onSearchBooks}
        />
      ) : (
        <DesktopHeader
          onSelectBook={onSelectBook}
          onSearchBooks={onSearchBooks}
        />
      )}
    </>
  );
};

export default NavBar;
