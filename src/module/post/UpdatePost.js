import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import axios from "axios";
import React, { useEffect, useMemo, useState, Component } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Radio from "../../components/radio/Radio";
import Toggle from "../../components/toggle/Togge";
import { db } from "../../firebase-app/firebaseconfig";
import Heading from "../../Layout/Heading";
import { postStatus } from "../../utils/constants";
import slugify from "slugify";
import ImageUpload from "../../components/image/ImageUpload";
import { useAuth } from "../../contexts/AuthContexts";
import PageNotFound from "../../pages/PageNotFound";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import DropSelect from "../../components/drop/DropSelect";
import Dropdown from "../../components/drop/Drop";
import Input from "../../components/input/Input";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import Swal from "sweetalert2";
Quill.register("modules/imageUploader", ImageUploader);
const UpdatePost = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [categoryDetails, setCategoryDetails] = useState("");
  const [category, setCategory] = useState([]);
  if (!userInfo) {
    <PageNotFound></PageNotFound>;
  }
  const [show, setShow] = useState(false);
  const { control, watch, reset, handleSubmit, setValue } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [Selected, setSelected] = useState(0);
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [content, setContent] = useState("");
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
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "posts", postId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
      setImage(singleDoc.data().image);
      setContent(singleDoc.data()?.content || "");
    }
    fetchData();
  }, [postId, reset]);
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        // imgbbAPI
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=253c67363a6c7921fdd5e371830b5b62",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  const updatePost = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug ? values.slug : values.title, {
      lower: true,
    });
    cloneValues.status = Number(values.status);
    const cofRef = await doc(db, "posts", postId);
    Swal.fire({
      title: "B???n c?? c???p nh???t kh??ng ????",
      text: "You won't be able to revert this!",
      icon: "warning",
      showLoaderOnConfirm: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Uhm tao mu???n",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateDoc(cofRef, {
          userId: userInfo.uid,
          ...cloneValues,
          content,
        });
        Swal.fire("Succes!", "???? xong b???n nha.", "success");
        navigate("/post/history");
      }
    });
    setCategoryDetails({});
  };

  if (!postId) return null;
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
      onSubmit={handleSubmit(updatePost)}
      className="p-4 w-full bg-bg-secondary rounded-lg flex flex-col cursor-pointer"
    >
      <Heading className="flex justify-between items-center">
        <NavLink to="#">C???p nh???t b??i vi???t</NavLink>
        <NavLink to="/post/history">Danh s??ch b??i vi???t</NavLink>
      </Heading>
      <div className="w-2/3 mx-auto flex flex-col gap-y-2">
        <Field>
          <Label htmlFor="title">Ti??u ????? b??i vi???t</Label>
          <Input
            name="title"
            placeholder="Nh???p ti??u ?????"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="slug">T???o t??n ???????ng d???n</Label>
          <Input
            name="slug"
            placeholder="Nh???p ti??u ?????"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="author">T??n t??c gi???</Label>
          <Input
            name="author"
            placeholder="Nh???p t??n t??c gi???"
            control={control}
          ></Input>
        </Field>
        <Field className="mt-4">
          <Label htmlFor="image">Ch???n ???nh</Label>
          <ImageUpload
            name="image"
            image={image}
            progress={progress}
            onChange={handlerSelect}
            control={control}
          ></ImageUpload>
        </Field>
        <Field>
          <Label htmlFor="hot">N???i b???t</Label>
          <Toggle
            name="hot"
            on={watchHot === true}
            onClick={() => setValue("hot", !watchHot)}
            control={control}
          ></Toggle>
        </Field>
        <Field>
          <Label name="category" className="text-xl font-semibold my-1 block ">
            Th?? m???c
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
        <Field className="mb-10">
          <Label htmlFor="content" className="text-xl font-semibold block ">
            N???i dung b??i vi???t
          </Label>
          <ReactQuill
            modules={modules}
            name="content"
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </Field>
        <Field>
          <Label htmlFor="slug">Tr???ng th??i</Label>
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

        <Button
          type="submit"
          className="p-2 py-4 mt-6 rounded-lg bg-bg-dark w-1/2 mx-auto text-base font-bold"
        >
          C???p nh???t b??i vi???t
        </Button>
      </div>
    </form>
  );
};

export default UpdatePost;
