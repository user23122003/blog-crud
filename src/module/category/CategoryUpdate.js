import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import slugify from "slugify";
import { Swal } from "sweetalert2/dist/sweetalert2";
import { useAuth } from "../../contexts/AuthContexts";
import { db } from "../../firebase-app/firebaseconfig";
import { categoryStatus, userRole } from "../../utils/constants";
import { toast, Flip } from "react-toastify";
import Heading from "../../Layout/Heading";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";

import Radio from "../../components/radio/Radio";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
const CategoryUpdate = () => {
  const { control, watch, reset, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "category", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);

  const watchStatus = watch("status");

  const handleUpdateCategory = async (values) => {
    // if (userInfo?.role !== userRole.ADMIN) {
    //   Swal.fire("Failed", "You have no right to do this action", "warning");
    //   return;
    // }
    const colRef = doc(db, "category", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug ? values.slug : values.name, { lower: true }),
      status: Number(values.status),
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
    navigate("/history/category");
  };
  if (!categoryId) return null;
  return (
    <div className="w-full">
      <form
        className="p-4 w-full bg-bg-secondary rounded-lg flex flex-col cursor-pointer"
        onSubmit={handleSubmit(handleUpdateCategory)}
      >
        <Heading>Cập nhật category</Heading>
        <div className="w-2/3 mx-auto flex flex-col  gap-y-2">
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <Field>
          <Label htmlFor="status">Status</Label>
          <div className="flex justify-center w-full flex-row gap-x-20 my-4">
            <Radio
              name="status"
              control={control}
              checked={Number(watchStatus) === categoryStatus.APPROVED}
              value={categoryStatus.APPROVED}
            >
              Approved
            </Radio>
            <Radio
              name="status"
              control={control}
              checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
              value={categoryStatus.UNAPPROVED}
            >
              Unapproved
            </Radio>
          </div>
        </Field>
        <Button
          className=" p-4 mt-6 rounded-lg bg-bg-dark w-max mx-auto text-base font-bold"
          type="submit"
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
