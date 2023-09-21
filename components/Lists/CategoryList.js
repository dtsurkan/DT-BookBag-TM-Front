import { useRouter } from "next/router";
import { List } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import LinkButton from "components/Buttons/LInkButton";

const CategoryList = ({
  allCategoriesItem = true,
  category = {},
  categories = [],
  split = false,
  itemLayout = "horizontal",
  size = "small",
}) => {
  const router = useRouter();
  return (
    <List split={split} itemLayout={itemLayout} size={size}>
      {allCategoriesItem && (
        <List.Item style={{ padding: "4px 0" }}>
          <LinkButton
            btnText="Все разделы"
            onClick={() => router.push(`/books`)}
            icon={<ArrowUpOutlined />}
          />
        </List.Item>
      )}
      {/* For categories route */}
      {category?.subcategories?.map((subcategory) => (
        <List.Item key={subcategory.id} style={{ padding: "4px 0" }}>
          <LinkButton
            btnText={subcategory.name}
            onClick={() =>
              router.push(`/categories/${category.slug}/${subcategory.slug}`)
            }
          />
        </List.Item>
      ))}
      {category?.categories?.map((category) => (
        <List.Item key={category.id} style={{ padding: "4px 0" }}>
          <LinkButton
            btnText={category.name}
            onClick={() => router.push(`/categories/${category.slug}`)}
            icon={<ArrowUpOutlined />}
          />
        </List.Item>
      ))}
      {/* For categories route */}

      {/* For books route */}
      {categories?.map((category) => (
        <List.Item key={category.id} style={{ padding: "4px 0" }}>
          <LinkButton
            btnText={category.name}
            onClick={() => router.push(`/categories/${category.slug}`)}
          />
        </List.Item>
      ))}
      {/* For books route */}
    </List>
  );
};

export default CategoryList;
