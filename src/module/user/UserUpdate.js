import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import ImageUpload from "../../components/image/ImageUpload";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Radio from "../../components/radio/Radio";
import { db } from "../../firebase-app/firebaseconfig";
import Heading from "../../Layout/Heading";
import { userRole, userStatus } from "../../utils/constants";

const UserUpdate = () => {
  const navigate = useNavigate();
  const { control, watch, reset, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const [params] = useSearchParams();
  const userId = params.get("id");
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", userId);

      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [userId, reset]);
  const handlerUpdate = async (values) => {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      ...values,
    });
    toast.success("Cập nhật category thành công", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
      transition: Flip,
    });
    navigate("/user");
  };
  return (
    <div className="p-8 w-full bg-bg-secondary rounded-lg flex flex-col cursor-pointer">
      <Heading className="flex justify-between items-center font-medium">
        <NavLink to="/user">Danh sách user</NavLink>
      </Heading>
      <form
        onSubmit={handleSubmit(handlerUpdate)}
        className="p-4 w-full bg-bg-secondary rounded-lg flex flex-col cursor-pointer"
      >
        <div className="text-center mb-10">
          <ImageUpload className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"></ImageUpload>
        </div>
        <Field>
          <Label className="text-xl font-semibold my-2 block ">Username</Label>
          <Input
            className="pointer-events-none"
            control={control}
            name="username"
            placeholder="Enter your username"
          ></Input>
        </Field>

        <Field>
          <Label className="text-xl font-semibold my-2 block ">Email</Label>
          <Input
            control={control}
            name="email"
            type="email"
            placeholder="Enter your email address"
          ></Input>
        </Field>

        <Field>
          <Label
            htmlFor="status"
            className="text-xl font-semibold mt-1 block cursor-pointer"
          >
            Status
          </Label>
          <div className="w-1/2 flex-row flex mx-auto justify-between mt-4">
            <Radio
              name="status"
              control={control}
              value={userStatus.ACTIVE}
              checked={Number(watchStatus) === userStatus.ACTIVE}
            >
              Active
            </Radio>
            <Radio
              name="status"
              control={control}
              value={userStatus.PENDING}
              checked={Number(watchStatus) === userStatus.PENDING}
            >
              Pending
            </Radio>
            <Radio
              name="status"
              control={control}
              value={userStatus.BAN}
              checked={Number(watchStatus) === userStatus.BAN}
            >
              Banned
            </Radio>
          </div>
        </Field>
        <Field>
          <Label
            htmlFor="role"
            className="text-xl font-semibold mt-1 block cursor-pointer"
          >
            Role
          </Label>
          <div className="w-1/2 flex-row flex mx-auto justify-between mt-4">
            <Radio
              name="role"
              control={control}
              value={userRole.ADMIN}
              checked={Number(watchRole) === userRole.ADMIN}
            >
              Admin
            </Radio>
            <Radio
              name="role"
              control={control}
              value={userRole.MOD}
              checked={Number(watchRole) === userRole.MOD}
            >
              Moderator
            </Radio>

            <Radio
              name="role"
              control={control}
              value={userRole.USER}
              checked={Number(watchRole) === userRole.USER}
            >
              User
            </Radio>
          </div>
        </Field>
        <Button
          type="submit"
          className="p-4 mt-6 rounded-lg bg-bg-dark mx-auto text-base font-bold"
        >
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
