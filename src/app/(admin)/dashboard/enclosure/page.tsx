import EnclosuresTable from "@/component/admin/enclosures/enclosures.table";
import { fetchEnclosures } from "@/services/enclosures";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const EnclosuresPage = async (props: IProps) => {
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

  // Fetch enclosures from the backend
  const res = await fetchEnclosures(page, limit).catch((error) => {
    console.error("Error fetching enclosures:", error);
    return null;
  });

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
    console.error("Failed to fetch enclosures, using default meta:", res);
    return (
      <div>
        <EnclosuresTable enclosures={[]} meta={defaultMeta} />
      </div>
    );
  }

  // Extract meta from the response
  const meta = {
    currentPage: res.meta.currentPage || defaultMeta.currentPage,
    totalPages: res.meta.totalPages || defaultMeta.totalPages,
    itemsPerPage: res.meta.itemsPerPage || defaultMeta.itemsPerPage,
    totalItems: res.meta.totalItems || defaultMeta.totalItems,
    itemCount: res.meta.itemCount || defaultMeta.itemCount,
  };

  // Extract enclosures data from res.data, default to empty array if not present
  const enclosures = res.data || [];

  return (
    <div>
      <EnclosuresTable enclosures={enclosures} meta={meta} />
    </div>
  );
};

export default EnclosuresPage;
