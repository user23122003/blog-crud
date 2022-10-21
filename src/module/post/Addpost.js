import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Radio from "../../components/radio/Radio";
import Heading from "../../Layout/Heading";
import slugify from "slugify";
import { postStatus } from "../../utils/constants";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import ImageUpload from "../../components/image/ImageUpload";
import { useState } from "react";
import Toggle from "../../components/toggle/Togge";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebaseconfig";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropdown from "../../components/drop/Drop";
import { useAuth } from "../../contexts/AuthContexts";
import { toast, Flip } from "react-toastify";
import PageNotFound from "../../pages/PageNotFound";
import DropSelect from "../../components/drop/DropSelect";
import { NavLink } from "react-router-dom";
const Addpost = () => {
  const [show, setShow] = useState(false);
  const { userInfo } = useAuth();
  if (!userInfo) {
    <PageNotFound></PageNotFound>;
  }
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState("");
  const [content, setContent] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      image: "",
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      content: "",
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const [Selected, setSelected] = useState(0);
  const addPost = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug ? values.slug : values.title, {
      lower: true,
    });
    cloneValues.status = Number(values.status);
    const cofRef = collection(db, "posts");
    addDoc(cofRef, {
      ...cloneValues,
      image,
      userId: userInfo.uid,
      content,
    });
    toast.success("Thêm bài viết thành công", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
      transition: Flip,
    });
    setCategoryDetails({});
    reset({
      image: "",
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      content: "",
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
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Success");
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
            console.log("Error");
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
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
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "category");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setCategory(result);
    }
    getData();
  }, []);
  const handlerCategory = async (item, index) => {
    const colRef = doc(db, "category", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setCategoryDetails(item);
    setShow(true);
    setSelected(index);
  };
  return (
    <form
      onSubmit={handleSubmit(addPost)}
      className="p-4 w-full bg-bg-secondary rounded-lg flex flex-col cursor-pointer"
    >
      <Heading className="flex justify-between items-center">
        <NavLink className="bg-secondary rounded-md p-1" to="/post">
          Tạo bài viết
        </NavLink>
        <NavLink className="bg-primary rounded-md p-1" to="/post/history">
          Danh sách bài viết
        </NavLink>
      </Heading>
      <div className="md:w-2/3 sm:w-full mx-auto flex flex-col gap-y-2">
        <Field>
          <Label htmlFor="title">Tiêu đề bài viết</Label>
          <Input
            name="title"
            placeholder="Nhập tiêu đề"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="slug">Tạo tên đường dẫn</Label>
          <Input
            name="slug"
            placeholder="Nhập tiêu đề"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="author">Tên tác giả</Label>
          <Input
            name="author"
            placeholder="Nhập tên tác giả"
            control={control}
          ></Input>
        </Field>
        <Field className="mt-4">
          <Label htmlFor="image">Chọn ảnh</Label>
          <ImageUpload
            name="image"
            image={image}
            progress={progress}
            onChange={handlerSelect}
            control={control}
          ></ImageUpload>
        </Field>
        <Field>
          <Label htmlFor="hot">Nổi bật</Label>
          <Toggle
            name="hot"
            on={watchHot === true}
            onClick={() => setValue("hot", !watchHot)}
            control={control}
          ></Toggle>
        </Field>
        <Field>
          <Label name="category" className="text-xl font-semibold my-1 block ">
            Thư mục
          </Label>
          <DropSelect onClick={() => setShow(!show)} checked={show}>
            {category.length > 0 &&
              category.map((item, index) => (
                <Dropdown
                  className={`${
                    Selected === index
                      ? "bg-text-color text-text-gray text-lg font-semibold "
                      : "bg-bg-primary "
                  }`}
                  checked={show}
                  control={control}
                  onClick={() => handlerCategory(item, index)}
                >
                  {item.name}
                </Dropdown>
              ))}
          </DropSelect>
        </Field>
        <Field>
          <Label htmlFor="slug" className="text-xl font-semibold block ">
            Trạng thái
          </Label>
          <div className="flex-row flex justify-evenly mt-3">
            <Radio
              checked={Number(watchStatus) === postStatus.APPROVED}
              value={postStatus.APPROVED}
              name="status"
              control={control}
            >
              Approved
            </Radio>
            <Radio
              checked={Number(watchStatus) === postStatus.PENDING}
              value={postStatus.PENDING}
              name="status"
              control={control}
            >
              Pending
            </Radio>
            <Radio
              checked={Number(watchStatus) === postStatus.REJECTED}
              value={postStatus.REJECTED}
              name="status"
              control={control}
            >
              Rejected
            </Radio>
          </div>
        </Field>
        <Field className="mb-10">
          <Label htmlFor="content" className="text-xl font-semibold block ">
            Nội dung bài viết
          </Label>
          <ReactQuill
            name="content"
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </Field>
        <Button
          disable={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          className="p-2 py-4 mt-6 rounded-lg bg-bg-dark w-1/2 mx-auto text-base font-bold"
        >
          Tạo bài viết
        </Button>
      </div>
    </form>
  );
};

export default Addpost;
