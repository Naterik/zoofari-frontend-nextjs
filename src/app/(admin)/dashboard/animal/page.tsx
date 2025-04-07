import AnimalTable from "@/component/admin/animal/animal.table";
import { auth } from "@/auth/auth";
import { sendRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageAnimalPage = async (props: IProps) => {
  const page =
    typeof props?.searchParams?.page === "string"
      ? parseInt(props.searchParams.page)
      : 1;
  const limit =
    typeof props?.searchParams?.limit === "string"
      ? parseInt(props.searchParams.limit)
      : 10;
  const session = await auth();

  const res = await sendRequest<IBackendRes<IModelPaginate<IAnimals>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/animals`, // Giả định endpoint
    method: "GET",
    queryParams: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-animals"] }, // Thay "list-users" bằng "list-animals"
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
      <AnimalTable
        animals={res?.data?.data ?? []}
        meta={res?.data?.meta ?? defaultMeta}
      />
    </div>
  );
};

export default ManageAnimalPage;
