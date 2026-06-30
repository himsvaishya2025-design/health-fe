import { useEffect, useState } from "react";
import { getPackages, getTrainers } from "../services/memberApi";

const OPTION_SERVICES = {
  packages: getPackages,
  trainers: getTrainers,
};

export function useFormOptions() {
  const [optionsMap, setOptionsMap] = useState({});
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const entries = await Promise.all(
          Object.entries(OPTION_SERVICES).map(async ([key, service]) => {
            const res = await service();
            const list = res.data?.data ?? res.data ?? [];

            let options = [];
            if (key === "packages") {
              options = list.map((pkg) => ({
                value: pkg._id,
                label: pkg.packageName,
              }));
            }
            if (key === "trainers") {
              options = list.map((trainer) => ({
                value: trainer._id,
                label: trainer.fullName,
              }));
            }
            return [key, options];
          })
        );
        setOptionsMap(Object.fromEntries(entries));
      } catch (err) {
        setError(err);
      } finally {
        setOptionsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  return { optionsMap, optionsLoading, error };
}
