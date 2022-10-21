import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
  startAfter,
  deleteDoc,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import LabelStatus from "../../components/label/LabelStatus";
import { db } from "../../firebase-app/firebaseconfig";
import Heading from "../../Layout/Heading";
import Table from "../../Layout/Table";
import { postStatus } from "../../utils/constants";
import Swal from "sweetalert2";

const CATEGORY_PER_PAGE = 3;

const HistoryPost = () => {
  const [lastDoc, setLastDoc] = useState();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(undefined);
  const [postList, setPostList] = useState();
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "posts"),
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
      setPostList([...postList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
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
        setPostList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 200);
  const handlerDelete = async (docId) => {
    const colRef = doc(db, "posts", docId);
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
    <div className=" w-full bg-bg-secondary rounded-lg flex flex-col cursor-pointer">
      <Heading
        className="flex sm:flex-col md:flex-row justify-between items-center 
      font-medium gap-y-2"
      >
        <NavLink
          className="bg-secondary rounded-md p-1 w-full"
          to="/post/history"
        >
          Danh sách bài viết
        </NavLink>
        <input
          type="text"
          placeholder="Search category..."
          onChange={handleInputFilter}
          className="p-2 border-2 focus:outline-none text-sm w-full max-w-[500px]  cursor-pointer rounded-lg text-text-gray"
        />
        <NavLink className="bg-primary rounded-md p-1 w-full" to="/post">
          Tạo bài viết
        </NavLink>
      </Heading>
      <div className="w-full overflow-auto mt-4">
        <Table>
          <thead class="text-base text-text-color uppercase">
            <tr className="border-b border-text-color">
              <th scope="col" class="p-2 sm:text-xs md:text-sm">
                Id
              </th>
              <th scope="col" class="p-2 sm:text-xs md:text-sm">
                Name
              </th>
              <th scope="col" class="p-2 sm:text-xs md:text-sm">
                Author
              </th>
              <th scope="col" class="p-2 sm:text-xs md:text-sm">
                Status
              </th>
              <th scope="col" class="p-2 sm:text-xs md:text-sm">
                Category
              </th>
              <th scope="col" class="p-2 sm:text-xs md:text-sm">
                Action
              </th>
            </tr>
          </thead>
          {postList?.length > 0 &&
            postList.map((item) => (
              <tbody className="overflow-auto" key={item.id}>
                <tr className="text-center">
                  <td className="py-4 px-2">{item?.id?.slice(0, 8)}</td>
                  <td className="py-4 px-2 sm:min-w-[300px]">{item.title}</td>
                  <td className="py-4 px-2 lowercase">{item.author}</td>
                  <td className="py-4 px-2">
                    {Number(item.status) === postStatus.APPROVED && (
                      <LabelStatus type="success">Approved</LabelStatus>
                    )}
                    {Number(item.status) === postStatus.PENDING && (
                      <LabelStatus type="warning">Pending</LabelStatus>
                    )}
                    {Number(item.status) === postStatus.REJECTED && (
                      <LabelStatus type="danger">Rejected</LabelStatus>
                    )}
                  </td>
                  <td className="py-4 px-2">{item.category?.name}</td>

                  <td className="py-4 px-2">
                    <div className="flex flex-row gap-2 justify-center">
                      <ActionDelete
                        onClick={() => handlerDelete(item?.id)}
                      ></ActionDelete>
                      <ActionEdit
                        onClick={() => navigate(`/post/update?id=${item?.id}`)}
                      ></ActionEdit>
                      <ActionView
                        onClick={() => navigate(`/post/${item.slug}`)}
                      ></ActionView>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>

      {total > postList?.length && (
        <>
          <button
            className="p-4 mt-2 rounded-lg bg-bg-dark w-max mx-auto text-base font-bold"
            onClick={handleLoadMoreCategory}
          >
            Load more
          </button>
          {total}
        </>
      )}
    </div>
  );
};

export default HistoryPost;
