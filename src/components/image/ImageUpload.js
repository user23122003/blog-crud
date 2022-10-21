import React from "react";

const ImageUpload = (props) => {
  const {
    name = "",
    className = "",
    progress = 0,
    image = "",
    ...rest
  } = props;
  return (
    <label
      className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden`}
    >
      <input
        type="file"
        name={name}
        className="hidden"
        onChange={() => {}}
        {...rest}
      />
      {!image && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img
            src="https://github.com/evondev/react-course-projects/blob/master/monkey-blogging/public/img-upload.png?raw=true"
            alt="upload-img"
            className="max-w-[80px] mb-5"
          />
          <p className="font-semibold">Choose photo</p>
        </div>
      )}
      {image && (
        <img
          name={name}
          src={image}
          className="w-full h-full object-cover"
          alt=""
        />
      )}
      {!image && (
        <div
          className={`absolute w-0 h-1 bg-bg-green bottom-0 left-0 transition-all image-upload-progress`}
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};

export default ImageUpload;
