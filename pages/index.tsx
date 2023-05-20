import Products from "@/src/components/Products/Products";
import { useEffect, useState } from "react";
import Search from "@/src/components/Search/Search";
import Loading from "@/src/components/Loading/Loading";
import { Q_getProducts } from "@/Hooks/ProductsList";
import { useQuery } from "@apollo/client";

export default function Home() {
  const [keyword, setKeyword] = useState<string>("");

  const { loading } = useQuery(Q_getProducts);

  const [load, setLoad] = useState<boolean>(loading);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);

  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <div>
          <Search setKeyword={setKeyword} />
          <Products keyword={keyword} />
        </div>
      )}
    </>
  );
}
