import { auth } from "@/auth/auth";
import OrderTable from "@/component/admin/orders/orders.table";
import { fetchOrders } from "@/services/order";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageOrderPage = async (props: IProps) => {
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

  let res: IBackendRes<{ orders: IOrder[]; meta: any }> | null = null;
  try {
    res = await fetchOrders(page, limit);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res = null;
  }

  const defaultMeta = {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
    itemCount: 0,
  };

  if (!res || !res.data || !res.data.meta || res.statusCode !== 200) {
    console.error("Failed to fetch orders, using default meta:", res);
    return (
      <div>
        <OrderTable orders={[]} meta={defaultMeta} />
      </div>
    );
  }

  const meta = {
    currentPage: res.data.meta.currentPage || defaultMeta.currentPage,
    totalPages: res.data.meta.totalPages || defaultMeta.totalPages,
    itemsPerPage: res.data.meta.itemsPerPage || defaultMeta.itemsPerPage,
    totalItems: res.data.meta.totalItems || defaultMeta.totalItems,
    itemCount: res.data.meta.itemCount || defaultMeta.itemCount,
  };

  const orders = Array.isArray(res.data.orders) ? res.data.orders : [];

  return (
    <div>
      <OrderTable orders={orders} meta={meta} />
    </div>
  );
};

export default ManageOrderPage;
