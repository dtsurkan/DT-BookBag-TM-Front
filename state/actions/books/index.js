// For the present, this logic without including Redux methods and flow, just functioning logics of config book
import { isEmpty as _isEmpty } from 'lodash';
import { getSlugifyValue } from 'lib/slugify';
import { uploadBook } from 'lib/strapi/services/books';
import { uploadImagesToStrapi } from 'lib/strapi/services/upload';
import { updateUserByID } from 'lib/strapi/services/user';

export const uploadBookLogic = (profile, values) => async (dispatch) => {
  console.log(`values`, values);
  console.log(`profile`, profile);
  const { upload, book_name, ...otherValues } = values;
  console.log(`book_name`, book_name);
  // NOTE! This implementing needed for unique value of select option.
  // For example, when title the same, it's necessary to stringify all volumeInfo with all data,
  // then before sending to backend, parse and put title to book_name.
  const { title: parsedBookName } = JSON.parse(book_name);
  const newImageIDs = await uploadImagesToStrapi(upload).then(({ data }) =>
    data.map((image) => image.id)
  );
  console.log(`newImageIDs`, newImageIDs);
  if (_isEmpty(profile.user_city)) {
    console.log(`test`, 1221);
    await updateUserByID(profile.id, { user_city: values.seller_city });
  }

  const updateFinishValues = {
    ...otherValues,
    book_name: parsedBookName,
    seller: profile.id,
    book_status: 'added',
    photos: newImageIDs,
    slug: getSlugifyValue(values.book_name),
  };
  const uploadedBook = await uploadBook(updateFinishValues);
  console.log('uploadedBook', uploadedBook);
  return uploadedBook;
};
