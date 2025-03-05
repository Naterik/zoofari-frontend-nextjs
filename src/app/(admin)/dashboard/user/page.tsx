import TableUser from "@/component/admin/user/user.table";
import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageUserPage = async (props: IProps) => {
  const page =
    typeof props?.searchParams?.page === "string"
      ? parseInt(props.searchParams.page)
      : 1;
  const limit =
    typeof props?.searchParams?.limit === "string"
      ? parseInt(props.searchParams.limit)
      : 10;
  const session = await auth();

  const res = await sendRequest<IBackendRes<IModelPaginate<IUserModel>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    method: "GET",
    queryParams: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-users"] },
    },
  });

  const defaultMeta = {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 5,
    totalItems: 0,
  };

  return (
    <div>
      <TableUser
        users={res?.data?.data ?? []}
        meta={res?.data?.meta ?? defaultMeta}
      />
    </div>
  );
};

export default ManageUserPage;
