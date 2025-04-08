import SpeciesTable from "@/component/admin/species/species.table";
import { fetchSpecies } from "@/services/species";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const SpeciesPage = async (props: IProps) => {
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

  // Fetch species from the backend
  const res = await fetchSpecies(page, limit).catch((error) => {
    console.error("Error fetching species:", error);
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
    console.error("Failed to fetch species, using default meta:", res);
    return (
      <div>
        <SpeciesTable species={[]} meta={defaultMeta} />
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

  // Extract species data from res.data, default to empty array if not present
  const species = res.data || [];

  return (
    <div>
      <SpeciesTable species={species} meta={meta} />
    </div>
  );
};

export default SpeciesPage;
