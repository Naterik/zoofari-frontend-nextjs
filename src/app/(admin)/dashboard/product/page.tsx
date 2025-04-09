import ProductTable from "@/component/admin/products/products.table";
import { fetchProducts } from "@/services/product";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductPage = async (props: IProps) => {
  const { searchParams } = props;

  const paramsObj = await searchParams;

  const page =
    paramsObj?.page && typeof paramsObj.page === "string"
      ? parseInt(paramsObj.page, 10)
      : 1;
  const limit =
    paramsObj?.limit && typeof paramsObj.limit === "string"
      ? parseInt(paramsObj.limit, 10)
      : 10;

  const res = await fetchProducts(page, limit).catch((error) => {
    console.error("Error fetching products:", error);
    return null;
  });

  const defaultMeta = {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
    itemCount: 0,
  };

  if (!res || !res.meta || res.statusCode !== 200) {
    console.error("Failed to fetch products, using default meta:", res);
    return (
      <div>
        <ProductTable products={[]} meta={defaultMeta} />
      </div>
    );
  }

  const meta = {
    currentPage: res.meta.currentPage || defaultMeta.currentPage,
    totalPages: res.meta.totalPages || defaultMeta.totalPages,
    itemsPerPage: res.meta.itemsPerPage || defaultMeta.itemsPerPage,
    totalItems: res.meta.totalItems || defaultMeta.totalItems,
    itemCount: res.meta.itemCount || defaultMeta.itemCount,
  };

  const products = res.data || [];

  return (
    <div>
      <ProductTable products={products} meta={meta} />
    </div>
  );
};

export default ProductPage;
