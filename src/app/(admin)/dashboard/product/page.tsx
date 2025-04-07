// import TableUser from "@/component/admin/user/user.table";
// import { auth } from "@/auth";
// import { sendRequest } from "@/utils/api";
// import ProductPage from "@/app/(guest)/product/page";

// interface IProps {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }

// const ManageProductPage = async (props: IProps) => {
//   const page =
//     typeof props?.searchParams?.page === "string"
//       ? parseInt(props.searchParams.page)
//       : 1;
//   const limit =
//     typeof props?.searchParams?.limit === "string"
//       ? parseInt(props.searchParams.limit)
//       : 10;
//   const session = await auth();

//   const res = await sendRequest<IBackendRes<IModelPaginate<IProductModel>>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
//     method: "GET",
//     queryParams: {
//       page,
//       limit,
//     },
//     headers: {
//       Authorization: `Bearer ${session?.user?.access_token}`,
//     },
//     nextOption: {
//       next: { tags: ["list-users"] },
//     },
//   });

//   const defaultMeta = {
//     currentPage: 1,
//     totalPages: 1,
//     itemsPerPage: 5,
//     totalItems: 0,
//   };

//   return (
//     <div>
//       <ProductPage
//         products={res?.data?.data ?? []}
//         meta={res?.data?.meta ?? defaultMeta}
//       />
//     </div>
//   );
// };

// export default ManageProductPage;
