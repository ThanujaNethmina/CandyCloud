import React from "react";
import { Input, Img, Text, Button } from "./..";

export default function Footer({ ...props }) {
  return (
    <footer {...props}>
      <div className="w-full mt-[7px] mx-auto md:p-5 max-w-[1109px]">
        <div className="flex md:flex-col justify-between items-center gap-5">
          <div className="flex flex-col self-end items-start">
            <div className="flex gap-4">
              <Button shape="circle" className="w-[32px]">
                <Img src="images/img_social_icons.svg" />
              </Button>
              <Button shape="circle" className="w-[32px]">
                <Img src="images/img_social_icons_gray_900_01.svg" />
              </Button>
              <Button shape="circle" className="w-[32px]">
                <Img src="images/img_social_icons_gray_900_01_32x32.svg" />
              </Button>
              <Button shape="circle" className="w-[32px]">
                <Img src="images/img_path.svg" />
              </Button>
            </div>
            <Text size="lg" as="p" className="mt-[49px] !text-gray-900_01">
              Copyright © 2020 Food delivery website
            </Text>
            <Text size="lg" as="p" className="mt-1.5 !text-gray-900_01">
              All rights reserved
            </Text>
          </div>
          <div className="flex sm:flex-col justify-center items-center w-[57%] md:w-full mb-0.5 gap-[30px]">
            <div className="flex flex-col items-start justify-center flex-1">
              <div className="flex flex-col items-start w-[60%] md:w-full gap-6">
                <Text size="xl" as="p" className="self-center !text-gray-700">
                  Company
                </Text>
                <ul className="flex flex-col items-start gap-[17px]">
                  <li>
                    <a href="#">
                      <Text as="p" className="!text-gray-900_01">
                        About us
                      </Text>
                    </a>
                  </li>
                  <li>
                    <a href="Blog" target="_blank" rel="noreferrer">
                      <Text as="p" className="!text-gray-900_01">
                        Blog
                      </Text>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Text as="p" className="!text-gray-900_01">
                        Contact us
                      </Text>
                    </a>
                  </li>
                  <li>
                    <a href="Pricing" target="_blank" rel="noreferrer">
                      <Text as="p" className="!text-gray-900_01">
                        Pricing
                      </Text>
                    </a>
                  </li>
                  <li>
                    <a href="Testimonials" target="_blank" rel="noreferrer">
                      <Text as="p" className="!text-gray-900_01">
                        Testimonials
                      </Text>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center flex-1">
              <div className="flex flex-col items-start w-[79%] md:w-full gap-6">
                <Text size="xl" as="p" className="!text-gray-700">
                  Support
                </Text>
                <ul className="flex flex-col items-start justify-center gap-[17px]">
                  <li>
                    <a href="#" className="mt-0.5">
                      <Text as="p" className="!text-gray-900_01">
                        Help center
                      </Text>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Text as="p" className="!text-gray-900_01">
                        Terms of service
                      </Text>
                    </a>
                  </li>
                  <li>
                    <a href="Legal" target="_blank" rel="noreferrer">
                      <Text as="p" className="!text-gray-900_01">
                        Legal
                      </Text>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Text as="p" className="!text-gray-900_01">
                        Privacy policy
                      </Text>
                    </a>
                  </li>
                  <li>
                    <a href="Status" target="_blank" rel="noreferrer">
                      <Text as="p" className="!text-gray-900_01">
                        Status
                      </Text>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col self-start w-[42%] sm:w-full gap-6">
              <Text size="xl" as="p" className="!text-gray-700">
                Stay up to date
              </Text>
              <div>
                <Input
                  shape="round"
                  name="date"
                  placeholder={`Your email address`}
                  suffix={<Img src="images/img_essential_icons_send.svg" alt="Essential Icons / send" />}
                  className="font-inter"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
