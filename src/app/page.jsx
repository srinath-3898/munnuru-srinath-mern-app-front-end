"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, searchUsers } from "@/store/users/usersActions";
export default function Home() {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.users);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("asc");
  const [searchString, setSearchString] = useState("");

  const handlePrevClick = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const sortedUsers = useMemo(() => {
    if (users) {
      if (sort === "asc") {
        let sortedUsers = [...users];
        return sortedUsers?.sort((a, b) => a?.id - b?.id);
      } else if (sort === "desc") {
        let sortedUsers = [...users];
        return sortedUsers?.sort((a, b) => b?.id - a?.id);
      }
    }
  }, [users, sort]);

  useEffect(() => {
    dispatch(getUsers({ size, page }));
  }, [page]);

  useEffect(() => {
    if (searchString) {
      const identifier = setTimeout(() => {
        dispatch(searchUsers({ searchString }));
      }, 500);
      return () => {
        clearTimeout(identifier);
      };
    } else {
      return;
    }
  }, [searchString]);
  return (
    <div className={styles.home}>
      <button
        onClick={() => (sort === "asc" ? setSort("desc") : setSort("asc"))}
      >
        Sort by {sort === "asc" ? "descending Order" : "ascending order"}
      </button>
      <input
        type="text"
        placeholder="Search with title"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      {loading ? <h1>Loading</h1> : <></>}
      {users ? (
        <div className={styles.users}>
          {sortedUsers?.map((user) => (
            <div key={user?.id}>
              <h5>title</h5>
              <p>{user?.title}</p>
              <h5>Body</h5>
              <p>{user?.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      <div className={styles.buttons}>
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
}
