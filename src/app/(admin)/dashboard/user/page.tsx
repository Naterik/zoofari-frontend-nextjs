import TableUser from "@/component/admin/user/user.table";
import { fetchUsers } from "@/services/user";
import { sendRequest } from "@/utils/api";
import { auth } from "@/auth/auth";

interface IRole {
  id: number;
  name: string;
  description: string;
}

const fetchRoles = async (): Promise<IRole[]> => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IRole[] | IRole[][]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  if (res.statusCode === 200 && res.data) {
    // Flatten the array if it's nested (IRole[][])
    const roles =
      Array.isArray(res.data) && Array.isArray(res.data[0])
        ? (res.data as IRole[][]).flat()
        : (res.data as IRole[]);
    return roles;
  }
  return [];
};

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageUserPage = async (props: IProps) => {
  const { searchParams } = props;

  // Await searchParams before using its properties
  const paramsObj = await searchParams;

  const page =
    paramsObj?.page && typeof paramsObj.page === "string"
      ? parseInt(paramsObj.page, 10)
      : 1;
  const limit =
    paramsObj?.limit && typeof paramsObj.limit === "string"
      ? parseInt(paramsObj.limit, 10)
      : 10;

  // Fetch users from the backend
  const res = await fetchUsers(page, limit).catch((error) => {
    console.error("Error fetching users:", error);
    return null;
  });

  // Fetch roles from the backend
  const roles = await fetchRoles();

  // Define default meta as a fallback
  const defaultMeta = {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
    itemCount: 0,
  };

  // Check if res is valid and contains meta
  if (!res || !res.meta || res.statusCode !== 200) {
    console.error("Failed to fetch users, using default meta:", res);
    return (
      <div>
        <TableUser users={[]} meta={defaultMeta} roles={roles} />
      </div>
    );
  }

  // Extract meta from the response (meta is a top-level property)
  const meta = {
    currentPage: res.meta.currentPage || defaultMeta.currentPage,
    totalPages: res.meta.totalPages || defaultMeta.totalPages,
    itemsPerPage: res.meta.itemsPerPage || defaultMeta.itemsPerPage,
    totalItems: res.meta.totalItems || defaultMeta.totalItems,
    itemCount: res.meta.itemCount || defaultMeta.itemCount,
  };

  // Extract users data from res.data, default to empty array if not present
  const users = Array.isArray(res.data) ? res.data : [];

  return (
    <div>
      <TableUser users={users} meta={meta} roles={roles} />
    </div>
  );
};

export default ManageUserPage;
