import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import ImageUpload from "../../components/image/ImageUpload";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Radio from "../../components/radio/Radio";
import Heading from "../../Layout/Heading";
import { userRole, userStatus } from "../../utils/constants";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-app/firebaseconfig";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
const UserAddNew = () => {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const CreateUser = async (values) => {
    if (!isValid) return null;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    // await addDoc(collection(db, "users"), {
    //   email: values.email,
    //   password: values.password,
    //   username: values.username,
    //   avatar: image,
    //   status: Number(values.status),
    //   role: Number(values.role),
    // });
    Swal.fire({
      title: "Bạn có muốn tạo mới user không ạ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Uhm ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await addDoc(collection(db, "users"), {
          email: values.email,
          password: values.password,
          username: values?.username,
          avatar: image
            ? image
            : "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
          status: Number(values.status),
          role: Number(values.role),
        });
        Swal.fire("Xong!", "Đã tạo user", "success");
        reset({
          email: "",
          password: "",
          username: "",
          avatar: "",
          status: 1,
          role: 3,
        });
      }
    });

    setImage("");
    setProgress("");
  };
  const handlerUploadImage = (file) => {
    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };
  const handlerSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    handlerUploadImage(file);
    setValue("image", file);
  };
  return (
    <div
      className="md:p-8 sm:p-1 w-full bg-bg-secondary rounded-lg flex flex-col 
    cursor-pointer"
    >
      <Heading className="flex justify-between items-center font-medium">
        <NavLink className="bg-secondary rounded-md p-1" to="/user">
          Danh sách user
        </NavLink>
        <NavLink className="bg-primary rounded-md p-1" to="/user/create">
          Tạo user
        </NavLink>
      </Heading>
      <form
        onSubmit={handleSubmit(CreateUser)}
        className="p-2 w-full bg-bg-primary rounded-lg flex flex-col cursor-pointer"
      >
        <div className="text-center mb-2    ">
          <ImageUpload
            className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            name="image"
            image={image}
            progress={progress}
            onChange={handlerSelect}
            control={control}
          ></ImageUpload>
        </div>
        <div>
          <Field>
            <Label
              htmlFor="username"
              className="text-xl font-semibold mt-1 block cursor-pointer"
            >
              Username
            </Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label
              htmlFor="email"
              className="text-xl font-semibold mt-1 block cursor-pointer"
            >
              Email
            </Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label
              htmlFor="password"
              className="text-xl font-semibold mt-1 block cursor-pointer"
            >
              Password
            </Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label
              htmlFor="status"
              className="text-xl font-semibold mt-1 block cursor-pointer"
            >
              Status
            </Label>
            <div
              className="w-1/2 flex-row flex mx-auto 
            sm:justify-center md:justify-between mt-2 sm:text-xs md:text-sm"
            >
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
            <div
              className="w-1/2 flex-row flex mx-auto sm:justify-center md:justify-between 
            mt-2 sm:text-xs md:text-sm"
            >
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
        </div>
        <Button
          type="submit"
          className="p-4 mt-6 rounded-lg bg-bg-dark mx-auto text-base font-bold"
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
