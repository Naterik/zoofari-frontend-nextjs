import { fetchAnimals } from "@/services/animal";
import { fetchSpecies } from "@/services/species";
import { auth } from "@/auth/auth";
import { fetchEnclosures } from "@/services/enclosures";
import AnimalTable from "@/component/admin/animals/animals.table";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageAnimalPage = async (props: IProps) => {
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

  let res: IBackendRes<IAnimals[]> | null = null;
  try {
    res = await fetchAnimals(page, limit);
  } catch (error) {
    console.error("Error fetching animals:", error);
    res = null;
  }

  let enclosures: IEnclosure[] = [];
  let species: ISpecies[] = [];
  try {
    const enclosuresRes = await fetchEnclosures();
    enclosures = enclosuresRes?.data || [];
    const speciesRes = await fetchSpecies();
    species = speciesRes?.data || [];
  } catch (error) {
    console.error("Error fetching enclosures or species:", error);
    enclosures = [];
    species = [];
  }

  const defaultMeta = {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
    itemCount: 0,
  };

  if (!res || !res.meta || res.statusCode !== 200) {
    console.error("Failed to fetch animals, using default meta:", res);
    return (
      <div>
        <AnimalTable
          animals={[]}
          meta={defaultMeta}
          enclosures={enclosures}
          species={species}
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

  const animals = Array.isArray(res.data) ? res.data : [];

  return (
    <div>
      <AnimalTable
        animals={animals}
        meta={meta}
        enclosures={enclosures}
        species={species}
      />
    </div>
  );
};

export default ManageAnimalPage;
