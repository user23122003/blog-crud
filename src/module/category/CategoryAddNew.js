import { async } from "@firebase/util";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { number } from "prop-types";

import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { toast, Flip } from "react-toastify";
import slugify from "slugify";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Radio from "../../components/radio/Radio";
import { useAuth } from "../../contexts/AuthContexts";
import { db } from "../../firebase-app/firebaseconfig";
import Heading from "../../Layout/Heading";
import { categoryStatus, userRole } from "../../utils/constants";
const CategoryAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
  });
  const { userInfo } = useAuth();
  const handleAddNewCategory = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(
      cloneValues.slug ? cloneValues.slug : cloneValues.name,
      { lower: true }
    );
    const cofRef = collection(db, "category");
    addDoc(cofRef, {
      ...cloneValues,
    });
    toast.success("Thêm category thành công", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
      transition: Flip,
    });
    reset({
      name: "",
      slug: "",
      status: 1,
    });
  };
  const watchStatus = watch("status");
  return (
    <div className="w-full">
      <form
        className="p-4 w-full bg-bg-secondary rounded-lg flex flex-col cursor-pointer"
        onSubmit={handleSubmit(handleAddNewCategory)}
        autoComplete="off
      "
      >
        <Heading className="flex md:flex-row sm:flex-col gap-y-2 justify-between items-center">
          <NavLink
            className="bg-secondary rounded-md p-1 w-full"
            to="/category"
          >
            Tạo Categogy
          </NavLink>
          <NavLink
            className="bg-primary rounded-md p-1 w-full"
            to="/history/category"
          >
            Danh sách Category
          </NavLink>
        </Heading>
        <div className="md:w-2/3 sm:w-full mx-auto flex flex-col gap-y-2">
          <Field>
            <Label>Nhập tên category</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Nhập tên đường dẫn</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="status">Trạng thái</Label>
            <div className="flex-row flex justify-evenly mt-2">
              <Radio
                name="status"
                control={control}
                value={categoryStatus.APPROVED}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={categoryStatus.UNAPPROVED}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          className=" p-4 mt-6 rounded-lg bg-bg-dark w-max mx-auto text-base font-bold"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Tạo category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
