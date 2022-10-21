import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import Loading from "../components/loading/Loading";
import CommonPage from "./CommonPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebaseconfig";
import { useNavigate } from "react-router-dom";
const schema = yup.object({
  email: yup.string().email("Hãy nhập email").required("Không để trống email"),
  password: yup
    .string()
    .required("Không để trống password")
    .min(8, "Nhỏ nhất 8 ký tự bạn nha"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };
  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0].message, {
        position: "top-center",
      });
    }
  }, [errors]);
  return (
    <CommonPage>
      <h1 className="text-center font-normal text-lg my-2">
        Đăng nhập tài khoản
      </h1>
      <h1 className="text-center font-normal text-xs ">
        Chưa có tài khoản ? {}
        <a href="/sign-up" className="text-text-blue">
          Đăng ký
        </a>
      </h1>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            placeholder="Enter your email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
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
          {isSubmitting ? <Loading></Loading> : "Đăng nhập"}
        </Button>
      </form>
    </CommonPage>
  );
};

export default SignIn;
