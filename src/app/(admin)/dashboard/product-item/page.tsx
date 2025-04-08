import { auth } from "@/auth/auth";
import ProductItemsTable from "@/component/admin/product-items/product-items.table";
import { fetchProducts } from "@/services/product";
import { fetchProductItems } from "@/services/product-item";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageProductItemsPage = async (props: IProps) => {
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

  let res: IBackendRes<IProductItem[]> | null = null;
  try {
    res = await fetchProductItems(page, limit);
  } catch (error) {
    console.error("Error fetching product items:", error);
    res = null;
  }

  let products: IProduct[] = [];
  try {
    const productsRes = await fetchProducts();
    products = productsRes?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    products = [];
  }

  const defaultMeta = {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
    itemCount: 0,
  };

  if (!res || !res.meta || res.statusCode !== 200) {
    console.error("Failed to fetch product items, using default meta:", res);
    return (
      <div>
        <ProductItemsTable
          productItems={[]}
          meta={defaultMeta}
          products={products}
        />
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

  const productItems = Array.isArray(res.data) ? res.data : [];

  return (
    <div>
      <ProductItemsTable
        productItems={productItems}
        meta={meta}
        products={products}
      />
    </div>
  );
};

export default ManageProductItemsPage;
