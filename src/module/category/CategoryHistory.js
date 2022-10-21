import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import LabelStatus from "../../components/label/LabelStatus";
import { db } from "../../firebase-app/firebaseconfig";
import Heading from "../../Layout/Heading";
import Table from "../../Layout/Table";
import { categoryStatus } from "../../utils/constants";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import Button from "../../components/button/Button";
const CATEGORY_PER_PAGE = 3 || 2;
const CategoryHistory = () => {
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [filter, setFilter] = useState(undefined);
  const [categoryList, setCategoryList] = useState();
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "category"),
      startAfter(lastDoc || 0),
      limit(CATEGORY_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList([...categoryList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "category");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategoryList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 200);
  const handlerDelete = async (docId) => {
    const colRef = doc(db, "category", docId);
    const docData = await getDoc(colRef);
    Swal.fire({
      title: "Bạn có muốn xóa không ạ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Uhm tao xóa",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Đã xóa bạn nha.", "success");
      }
    });
  };
  return (
    <div className="p-4 w-full bg-bg-secondary rounded-lg flex flex-col cursor-pointer">
      <Heading className="flex sm:flex-col md:flex-row justify-between items-center font-medium">
        <NavLink
          className="bg-secondary rounded-md p-1 w-full"
          to="/history/category"
        >
          Danh sách Category
        </NavLink>
        <input
          type="text"
          placeholder="Search category..."
          onChange={handleInputFilter}
          className="p-2 border-2 focus:outline-none text-sm w-full max-w-[500px]  cursor-pointer rounded-lg text-text-gray"
        />
        <NavLink className="bg-primary rounded-md p-1 w-full" to="/category">
          Tạo Categogy
        </NavLink>
      </Heading>
      <div className="w-full overflow-auto mt-4">
        <Table>
          <thead class="text-base text-text-color uppercase ">
            <tr className="border-b border-text-color">
              <th scope="col" class="p-1 sm:text-xs md:text-sm ">
                Id
              </th>
              <th scope="col" class="p-1 sm:text-xs md:text-sm">
                Name
              </th>
              <th scope="col" class="p-1 sm:text-xs md:text-sm">
                Slug
              </th>
              <th scope="col" class="p-1 sm:text-xs md:text-sm">
                Status
              </th>
              <th scope="col" class="p-1 sm:text-xs md:text-sm">
                Action
              </th>
            </tr>
          </thead>
          {categoryList?.length > 0 &&
            categoryList.map((item) => (
              <tbody key={item.id}>
                <tr class="text-center">
                  <td class="py-4 px-2">{item.id}</td>
                  <td class="py-4 px-2">{item.name}</td>
                  <td class="py-4 px-2 lowercase">{item.slug}</td>

                  <td class="py-4 px-2">
                    {Number(item.status) === categoryStatus.APPROVED && (
                      <LabelStatus type="success">Approved</LabelStatus>
                    )}
                    {Number(item.status) === categoryStatus.UNAPPROVED && (
                      <LabelStatus type="danger">Unppraved</LabelStatus>
                    )}
                  </td>

                  <td class="py-4 px-2">
                    <div className="flex flex-row gap-2 justify-center">
                      <ActionDelete
                        onClick={() => handlerDelete(item?.id)}
                      ></ActionDelete>
                      <ActionEdit
                        onClick={() =>
                          navigate(`/update/category?id=${item?.id}`)
                        }
                      ></ActionEdit>
                      <ActionView></ActionView>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>

      {total > categoryList?.length && (
        <>
          <Button
            className="p-4 mt-2 rounded-lg bg-bg-dark w-max mx-auto text-base font-bold"
            onClick={handleLoadMoreCategory}
          >
            Load more
          </Button>
          {total}
        </>
      )}
    </div>
  );
};

export default CategoryHistory;
