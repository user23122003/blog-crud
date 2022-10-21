import React, { useEffect } from "react";
import Label from "../components/label/Label";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import Field from "../components/field/Field";
import Button from "../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flip, toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebaseconfig";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Loading from "../components/loading/Loading";
import CommonPage from "./CommonPage";
import { useAuth } from "../contexts/AuthContexts";
import { userRole, userStatus } from "../utils/constants";
const schema = yup.object({
  username: yup.string().required("Không để trống username"),
  email: yup.string().email("Hãy nhập email").required("Không để trống email"),
  password: yup
    .string()
    .required("Không để trống password")
    .min(8, "Nhỏ nhất 8 ký tự bạn nha"),
});
const SignUp = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.username,
    });
    const colRef = collection(db, "users");
    setDoc(doc(db, "users", auth.currentUser.uid), {
      username: values.username,
      email: values.email,
      password: values.password,
      avatar:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      status: userStatus.ACTIVE,
      role: userRole.USER,
    });

    toast.success("Đăng ký thành công");
    navigate("/");
  };
  useEffect(() => {
    if (!userInfo?.email) navigate("/sign-up");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0].message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        transition: Flip,
      });
    }
  }, [errors]);
  return (
    <CommonPage>
      <h1 className="text-center font-normal text-lg my-2">
        Đăng ký tài khoản
      </h1>
      <h1 className="text-center font-normal text-xs ">
        Đã có tài khoản ? {}
        <a href="/sign-in" className="text-text-blue">
          Đăng nhập
        </a>
      </h1>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label
            htmlFor="username"
            className="my-2 cursor-pointer text-sm text-text-color font-medium"
          >
            Username
          </Label>
          <Input
            name="username"
            id="username"
            type="text"
            placeholder="Enter your username"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label
            htmlFor="email"
            className="my-2 cursor-pointer text-sm text-text-color font-medium"
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            className="p-3 border-2 focus:outline-none text-sm  cursor-pointer rounded-lg w-full text-text-gray"
            type="email"
            placeholder="Enter your email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label
            htmlFor="password"
            className="my-2 cursor-pointer text-sm text-text-color font-medium"
          >
            Password
          </Label>
          <Input
            name="password"
            id="password"
            className="p-3 border-2 focus:outline-none text-sm  cursor-pointer rounded-lg w-full text-text-gray"
            type="password"
            placeholder="Enter your password"
            control={control}
          ></Input>
        </Field>
        <Button
          className="py-2 px-6 block mx-auto mt-6 my-2 text-base bg-bg-primary rounded-lg"
          type="submit"
          disable={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? <Loading></Loading> : "Đăng ký"}
        </Button>
      </form>
    </CommonPage>
  );
};

export default SignUp;
