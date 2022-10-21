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
import { useEffect } from "react";
import { useState } from "react";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import { db } from "../../firebase-app/firebaseconfig";
import Heading from "../../Layout/Heading";
import Table from "../../Layout/Table";
import LabelStatus from "../../components/label/LabelStatus";

import { userRole, userStatus } from "../../utils/constants";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import Button from "../../components/button/Button";
const CATEGORY_PER_PAGE = 3;
const statusUser = (status) => {
  switch (status) {
    case userStatus.ACTIVE:
      return (
        <LabelStatus className="bg-text-color" type="success">
          ACTIVE
        </LabelStatus>
      );
    case userStatus.PENDING:
      return <LabelStatus type="warning">PENDING</LabelStatus>;
    case userStatus.BAN:
      return <LabelStatus type="danger">BANNED</LabelStatus>;

    default:
      break;
  }
};
const roleUser = (role) => {
  switch (role) {
    case userRole.ADMIN:
      return (
        <LabelStatus className="bg-text-color" type="success">
          AMIN
        </LabelStatus>
      );
    case userRole.MOD:
      return <LabelStatus type="warning">MOD</LabelStatus>;
    case userRole.USER:
      return <LabelStatus type="danger">USER</LabelStatus>;

    default:
      break;
  }
};
const ListUser = () => {
  const [user, setUser] = useState();

  const [filter, setFilter] = useState(undefined);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const colRef = collection(db, "users");

  const deleteUser = async (docId) => {
    const colRef = doc(db, "users", docId);
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
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "users"),
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
      setUser([...user, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function FetchData() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
            colRef,
            where("username", ">=", filter),
            where("username", "<=", filter + "utf8")
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
        setUser(results);
      });
      setLastDoc(lastVisible);
    }
    FetchData();
  }, [filter]);
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUser(results);
    });
  }, []);
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 200);
  return (
    <div className="p-1 w-full bg-bg-secondary rounded-lg flex flex-col cursor-pointer">
      <Heading
        className="flex md:flex-row sm:flex-col justify-between 
      items-center font-medium gap-y-2"
      >
        <NavLink className="bg-secondary rounded-md p-1 w-full" to="/user">
          Danh sách user
        </NavLink>
        <input
          type="text"
          placeholder="Search category..."
          onChange={handleInputFilter}
          className="p-2 border-2 focus:outline-none text-sm w-full max-w-[500px]  cursor-pointer rounded-lg text-text-gray"
        />
        <NavLink className="bg-primary rounded-md p-1 w-full" to="/user/create">
          Tạo user
        </NavLink>
      </Heading>
      <div className="w-full overflow-auto mt-4">
        <Table>
          <thead class="text-base text-text-color uppercase ">
            <tr className="border-b border-text-color">
              <th scope="col" className=" md:text-sm sm:text-xs p-1">
                Id
              </th>
              <th scope="col" className=" md:text-sm sm:text-xs p-1">
                Name
              </th>
              <th scope="col" className=" md:text-sm sm:text-xs p-1">
                Email
              </th>
              <th scope="col" className=" md:text-sm sm:text-xs p-1">
                Status
              </th>
              <th scope="col" className=" md:text-sm sm:text-xs p-1">
                Role
              </th>
              <th scope="col" className=" md:text-sm sm:text-xs p-1">
                Action
              </th>
            </tr>
          </thead>
          {user?.length > 0 &&
            user?.map((item) => (
              <tbody key={item.id}>
                <tr class="text-center">
                  <td class="py-4 px-2">{item.id.slice(0, 6) + "..."}</td>
                  <td class="py-4 px-2">{item.username}</td>
                  <td class="py-4 px-2 ">{item.email}</td>
                  <td class="py-4 px-2 uppercase">
                    {statusUser(Number(item?.status))}
                  </td>
                  <td class="py-4 px-2 uppercase">
                    {roleUser(Number(item?.role))}
                  </td>
                  <td class="py-4 px-2">
                    <div className="flex flex-row gap-2 justify-center">
                      <ActionDelete
                        onClick={() => deleteUser(item?.id)}
                      ></ActionDelete>
                      <ActionEdit
                        onClick={() => navigate(`/user/update?id=${item?.id}`)}
                      ></ActionEdit>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>
      {total > user?.length && (
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

export default ListUser;
