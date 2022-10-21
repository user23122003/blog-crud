import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/button/Button";
import Container from "../components/container/Container";

const Banner = () => {
  return (
    <Container>
      <div className="flex items-center justify-center sm:flex-col md:flex-row">
        <div className="md:w-1/2 sm:w-full">
          <h1 className="font-bold md:text-2xl sm:text-base mb-2">
            Bloging Monkey
          </h1>
          <h6
            className="md:max-w-[600px] sm:w-full md:text-sm text:xs leading-6 my-4 
          text-primary"
          >
            Những năm 1980, khi mô hình hợp tác xã không tạo ra sự cạnh tranh,
            các nhà máy hoạt động kiểu bao cấp khó phát triển, Việt Nam bắt đầu
            đưa chuyên gia, lao động đi làm việc ngoài nước. Nghị quyết 362 do
            Hội đồng Chính phủ ban hành tháng 11/1980 nêu rõ "thông qua hợp tác,
            ta có thể giải quyết việc làm và đào tạo nghề nghiệp cho một bộ phận
            thanh niên trong điều kiện cơ sở kinh tế trong nước chưa thu hút
            được hết".
          </h6>
          <NavLink to="/sign-up">
            <Button
              className="mt-4 py-4 px-6 text-lg font-semibold bg-bg-primary rounded-md 
              outline-none"
            >
              Bắt đầu
            </Button>
          </NavLink>
        </div>
        <div className="md:w-[500px] md:h-[400px] sm:w-[300px] sm:h-[200px]">
          <img
            className="h-full w-full object-cover"
            src="https://github.com/evondev/react-course-projects/blob/master/monkey-blogging/public/img-banner.png?raw=true"
            alt=""
          />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
