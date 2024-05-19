import React, { useEffect,useState } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Input, Img, Text, Button, Heading } from "components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { data } from "autoprefixer";
import Cards from "../../components/Cards";
import Modal from "components/Modal";
import { AuthContext } from "contexts/AuthProvider";
import { useContext } from "react";
import usePurchase from "hooks/usePurchase";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/homeNavbar"


const HomePageOrderPage=()=>{

  const [searchBarValue4, setSearchBarValue4] = React.useState("");

  const [recipes, setRecipes] = useState([]);
  const slider=React.useRef(null)
  const { logout } = useContext(AuthContext);

  //const{purchase,refetch}=usePurchase();
  //console.log(purchase)
  const [purchase, refetchPurchase] = usePurchase();
  console.log(purchase.length); 

  // useEffect to fetch purchases
  useEffect(() => {
    // Fetch purchases
    refetchPurchase();
  }, []);

  

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  //settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5, // Number of items to scroll at a time
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
    ],
  };
  

  return(
    

    <div className="w-full bg-gradient1">

          <Header/>
        
          
          <header className="flex justify-end pr-6 mb-8">
            {/*login button*/}
            <button onClick={()=>document.getElementById('my_modal_5').showModal()} 
            className="mb-[29px] ml-[30px] md:ml-0 mr-3" 
            style={{ 
              backgroundColor: '#852D6B', 
              color: 'white',  
              padding: '8px 16px', 
              borderRadius: '15px', 
              border: 'none', 
              cursor: 'pointer' , 
              fontWeight: 'bold'
              }}>
              <Heading size="4xl" as="h4">
                Login
              </Heading>
            </button>
            <Modal/>{/*login componenet importing*/}
            
            {/*logout button*/}
            <button onClick={logout}
             className="mb-[29px] md:ml-0" 
             style={{ backgroundColor: '#852D6B', color: 'white',  padding: '8px 16px', borderRadius: '15px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
              <Heading size="4xl" as="h4">
                Logout
              </Heading>
            </button>
        </header>








    <div className="mt-[43px]">
      <div className="flex flex-col items-center">
        <div className="h-[627px] w-full mx-auto md:p-5 relative max-w-[1298px]">
          <div className="flex flex-col w-[68%] gap-[22px] bottom-[13%] left-0 m-auto absolute">
            <div className="h-[188px] relative">
              <div className="h-[37px] w-[37px] right-[29%] top-[17%] m-auto rotate-[-30deg] bg-gradient6 absolute rounded-[18px]" />
              <Heading
                size="3xl"
                as="h1"
                className="justify-center w-full h-full left-0 bottom-0 right-0 top-0 m-auto text-shadow-ts absolute"
              >
                Step into a world of sweetness with our Easy Sweet Ordering System! Treat yourself to a hassle-free
                dessert experience – just click, customize, and enjoy. Indulge in a variety of irresistible treats
                that are just a tap away. Welcome to the sweet life, simplified!
              </Heading>
            </div>
            <div className="flex w-[29%] md:w-full ml-[17px] md:ml-0">
              <div className="w-full">
                <div className="h-[76px] bg-gradient7 relative rounded-[33px]">
                  <Heading size="6xl" as="h2" className="w-max top-[21%] right-0 left-0 m-auto absolute">
                    Order Now
                  </Heading>
                  <div className="flex justify-center h-full w-full left-0 bottom-0 right-0 top-0 p-4 m-auto bg-gradient7 absolute rounded-[33px]">
                    <Heading size="6xl" as="h3" className="self-start">
                      Order Now
                    </Heading>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[523px] w-[25%] right-0 top-0 m-auto border border-solid white_A700_white_A700_00_border bg-gradient5 absolute rounded-[44px]">
            <Img
              src="images/img_photo_160618807.png"
              alt="photo160618807"
              className="h-[227px] w-[57%] bottom-0 left-0 m-auto object-cover absolute"
            />
            <Img
              src="images/img_photo_161928631.png"
              alt="photo161928631"
              className="justify-center h-[523px] w-full md:h-auto left-0 bottom-0 right-0 top-0 m-auto object-cover absolute rounded-[44px]"
            />
          </div>
          <Heading size="14xl" as="h4" className="w-[68%] left-[2%] top-[15%] m-auto absolute">
            GET DELICIOUS SWEETS AT YOUR DOORSTEPS{" "}
          </Heading>
          <div className="flex sm:flex-col justify-end items-center w-[29%] bottom-0 right-[4%] m-auto absolute">
            <Img
              src="images/img_premium_photo_1.png"
              alt="premiumphotoone"
              className="self-end w-[41%] sm:w-full sm:h-auto mb-[54px] object-cover"
            />
            <Img
              src="images/img_unsplash_i5bqnyi0jiu.png"
              alt="unsplash_three"
              className="w-[59%] sm:w-full sm:h-auto ml-[-60px] sm:ml-0 object-cover"
            />
          </div>
          <Img
            src="images/img_5a35e097637df0_1.png"
            alt="5a35e097637dfze"
            className="h-[376px] w-[22%] mr-[115px] right-[9%] bottom-0 top-0 my-auto object-cover absolute rounded-[50%]"
          />
        </div>
        <center><Heading size="10xl" as="h5" className="self-start mt-[107px] !text-teal-900_01">
          Choose from your favorite category
        </Heading></center>
        <div className="flex md:flex-col justify-between items-start w-full mt-[9px] gap-5 mx-auto md:p-5 z-[1] max-w-[888px]">
          <div className="flex flex-col items-center w-[13%] md:w-full p-[23px] sm:p-5 border border-solid white_A700_white_A700_00_border bg-gradient3 rounded-[13px]">
            <Img src="images/img_group.svg" alt="image_one" className="self-stretch h-[40px] md:h-auto z-[1]" />
            <Heading size="xl" as="h6" className="mt-[-2px] mb-2 !font-semibold">
              All
            </Heading>
          </div>
          <div className="w-[78%] md:w-full mt-3">
            <div className="flex justify-between items-center gap-5 z-[1]">
              <Img src="images/img_mdi_food_variant.svg" alt="mdifood_one" className="h-[65px] w-[65px]" />
              <Img src="images/img_fluent_emoji_hi.svg" alt="fluentemojihi" className="h-[65px] w-[65px]" />
              <Img
                src="images/img_mdi_food_takeout_box_outline.svg"
                alt="mdifood_three"
                className="h-[65px] w-[65px]"
              />
              <Img
                src="images/img_fluent_food_cake_20_regular.svg"
                alt="fluentfood_one"
                className="h-[62px] w-[63px]"
              />
            </div>
            <div className="flex md:flex-col justify-center items-start mt-[-3px]">
              <Heading size="xl" as="h6" className="mt-0.5">
                Sugar Free
              </Heading>
              <Heading size="xl" as="h6" className="ml-[116px] md:ml-0">
                Chocolate
              </Heading>
              <Heading size="xl" as="h6" className="w-[37%] md:w-full ml-[91px] md:ml-0 text-center">
                Traditional Sweets
              </Heading>
              <Heading size="xl" as="h6" className="mt-2.5 ml-[111px] md:ml-0">
                Cake
              </Heading>
            </div>
          </div>
        </div>
            





        <div>
      <div className="grid grid-cols-4 gap-8 justify-around items-center mt-12">
        {recipes.map((item) => (
          <Cards key={item._id} item={item} />
        ))}
      </div>
    </div>
  

              




        
      <div className="flex flex-col w-full mt-[65px] mx-auto md:p-5 max-w-[1219px]">
              <Heading as="h2" className="!text-teal-900">
                Recommended for you{" "}
              </Heading>
              <div className="flex md:flex-col mt-[23px] ml-[38px] gap-[82px] md:ml-0">
                <div className="flex flex-col justify-center w-full p-[11px] border border-solid white_A700_white_A700_00_border bg-gradient3 rounded-[16px]">
                  <Img
                    src="images/img_unsplash_ck6tjaimjwm_185x315.png"
                    alt="brownies_one"
                    className="object-cover rounded-[16px]"
                  />
                  <Heading size="xl" as="h6" className="mt-1.5">
                    Brownies
                  </Heading>
                  <Heading size="lg" as="h6" className="mt-[3px]">
                    LKR.200.00
                  </Heading>
                  <Img src="images/img_group_5.svg" alt="brownies_four" className="h-[12px]" />
                </div>



                <div className="flex flex-col justify-center w-full p-[11px] border border-solid white_A700_white_A700_00_border bg-gradient3 rounded-[16px]">
                  <Img
                    src="images/img_unsplash_50kffxbjiog.png"
                    alt="unsplash_one"
                    className="object-cover rounded-[16px]"
                  />
                  <Heading size="xl" as="h6" className="mt-2">
                    Ginger Toffee
                  </Heading>
                  <Heading size="lg" as="h6">
                    LKR.120.00
                  </Heading>
                  <Img src="images/img_group_5.svg" alt="image" className="h-[12px]" />
                </div>


                <div className="flex flex-col justify-center w-full p-[11px] border border-solid white_A700_white_A700_00_border bg-gradient3 rounded-[16px]">
                  <Img
                    src="images/img_unsplash_thlvnkdeh1k_185x315.png"
                    alt="unsplash_one"
                    className="object-cover rounded-[16px]"
                  />
                  <Heading size="xl" as="h6" className="mt-1.5">
                    Cheese Cake
                  </Heading>
                  <Heading size="lg" as="h6" className="mt-[3px]">
                    LKR.2400.00
                  </Heading>
                  <Img src="images/img_group_5.svg" alt="image" className="h-[12px]" />
                </div>
              </div>



              <Heading as="h2" className="mt-[100px] !text-teal-900">
                What Our Customers Say About Us
              </Heading>
            </div>
            <div className="flex md:flex-col justify-end items-center w-full mt-[11px] mx-auto md:p-5 max-w-[1515px]">
              <div className="flex md:flex-col items-start w-[75%] md:w-full">
                


                <div className="flex w-[32%] md:w-full mb-[49px] ml-[3px] md:ml-0">
                  <div className="flex flex-col w-full">
                    <Img
                      src="images/img_unsplash_2crxtr4jckc.png"
                      alt="unsplash_five"
                      className="w-[21%] ml-[27px] md:ml-0 z-[1] object-cover rounded-[34px]"
                    />
                    <div className="flex flex-col items-start mt-[-46px] gap-[13px] p-5 border border-solid white_A700_white_A700_00_border bg-gradient3 rounded-[16px]">
                      <Text size="xs" as="p" className="w-[85%] md:w-full mt-[46px] ml-[13px] md:ml-0 !font-poppins">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies nam dui mattis placerat fusce
                        gravida diam
                      </Text>
                      <Text size="xs" as="p" className="w-[85%] md:w-full ml-[13px] md:ml-0 !font-poppins">
                        Curabitur pellentesque vitae amet, massa venenatis neque, netus nunc. Sapien vitae dolor quis
                        quam neque facilisi{" "}
                      </Text>
                      <Heading
                        size="xs"
                        as="p"
                        className="w-[17%] md:w-full ml-[11px] md:ml-0 !text-cyan-800 !font-poppins"
                      >
                        Anna doe
                      </Heading>
                    </div>
                  </div>
                </div>
                <div className="flex w-[61%] md:w-full ml-[13px] md:ml-0">
                  <div className="flex flex-col w-full">
                    <Img
                      src="images/img_unsplash_ym_msbz0ro.png"
                      alt="unsplashym_one"
                      className="h-[152px] w-[152px] ml-[47px] md:ml-0 z-[1] rounded-[50%]"
                    />
                    <div className="flex flex-col justify-end mt-[-67px] gap-[23px] p-8 sm:p-5 border border-solid gray_600_gray_600_00_border bg-gradient8 rounded-[16px]">
                      <Text size="2xl" as="p" className="mt-[51px] ml-[19px] md:ml-0 !text-gray-800_02 !font-poppins">
                        <>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies nam dui mattis placerat
                          fusce gravida diam fermentum. Sit sodales adipiscing rhoncus cras quam vel nam. <br />
                          Curabitur pellentesque vitae amet, massa venenatis neque, netus nunc. Sapien vitae dolor quis
                          quam neque facilisi sagittis, malesuada fermentum.
                        </>
                      </Text>
                      <Heading size="3xl" as="h5" className="mb-2 ml-[15px] md:ml-0 !text-cyan-800 !font-poppins">
                        Joseph Harllow
                      </Heading>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex self-end justify-end w-[20%] md:w-full mb-[83px] ml-[-6px] md:ml-0">
                <div className="flex flex-col w-full">
                  <Img
                    src="images/img_unsplash_2crxtr4jckc_78x78.png"
                    alt="unsplash_seven"
                    className="h-[78px] w-[78px] ml-[31px] md:ml-0 z-[1] rounded-[50%]"
                  />
                  <div className="flex flex-col mt-[-39px] pl-[35px] gap-[11px] py-[35px] sm:pl-5 sm:py-5 border border-solid gray_500_gray_600_00_border bg-gradient2 rounded-[16px]">
                    <Text size="xs" as="p" className="mt-5 ml-0.5 md:ml-0 !font-poppins">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies nam dui mattis placerat fusce
                      gravida diam
                    </Text>
                    <Text size="xs" as="p" className="ml-0.5 md:ml-0 !font-poppins">
                      Curabitur pellentesque vitae amet, massa venenatis neque, netus nunc. Sapien vitae dolor quis quam
                      neque facilisi{" "}
                    </Text>
                    <Heading size="xs" as="p" className="!text-cyan-800 !font-poppins">
                      Anna doe
                    </Heading>
                  </div>
                </div>
              </div>
            </div>
         






        
        <footer className="mt-[9px] pl-[65px] pr-14 py-[65px] md:p-5 border border-solid white_A700_00_gray_600_00_border bg-gradient2">
          <div className="w-full mt-[7px] mx-auto max-w-[1109px]">
            <div className="flex md:flex-col justify-between items-center gap-5">
              <div className="flex flex-col self-end items-start md:p-5">
                <div className="flex gap-4">
                  <Button color="gray_900" shape="circle" className="w-[32px]">
                    <Img src="images/img_social_icons_gray_900.svg" />
                  </Button>
                  <Button color="gray_900" shape="circle" className="w-[32px]">
                    <Img src="images/img_social_icons_gray_900_32x32.svg" />
                  </Button>
                  <Button color="gray_900" shape="circle" className="w-[32px]">
                    <Img src="images/img_social_icons_32x32.svg" />
                  </Button>
                  <Button color="gray_900" shape="circle" className="w-[32px]">
                    <Img src="images/img_path_gray_900.svg" />
                  </Button>
                </div>
                <Text size="lg" as="p" className="mt-[49px] !text-gray-900">
                  Copyright © 2020 Sweet delivery website
                </Text>
                <Text size="lg" as="p" className="mt-[7px] !text-gray-900">
                  All rights reserved
                </Text>
              </div>
              <div className="flex sm:flex-col justify-center items-center w-[57%] md:w-full mb-0.5 gap-[30px] md:p-5">
                <div className="flex flex-col items-start justify-center flex-1">
                  <div className="flex flex-col items-start w-[60%] md:w-full gap-6">
                    <Text size="xl" as="p" className="self-center !text-teal-900">
                      Company
                    </Text>
                    <ul className="flex flex-col items-start gap-[17px]">
                      <li>
                        <a href="#">
                          <Text as="p" className="!text-gray-900">
                            About us
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p" className="!text-gray-900">
                            Blog
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p" className="!text-gray-900">
                            Contact us
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p" className="!text-gray-900">
                            Pricing
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p" className="!text-gray-900">
                            Testimonials
                          </Text>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center flex-1">
                  <div className="flex flex-col items-start w-[79%] md:w-full gap-6">
                    <Text size="xl" as="p" className="!text-teal-900">
                      Support
                    </Text>
                    <ul className="flex flex-col items-start justify-center gap-[17px]">
                      <li>
                        <a href="#" className="mt-0.5">
                          <Text as="p" className="!text-gray-900">
                            Help center
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p" className="!text-gray-900">
                            Terms of service
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p" className="!text-gray-900">
                            Legal
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p" className="!text-gray-900">
                            Privacy policy
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p" className="!text-gray-900">
                            Status
                          </Text>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col self-start w-[42%] sm:w-full gap-6">
                  <Text size="xl" as="p" className="!text-teal-900">
                    Stay up to date
                  </Text>
                  <div>
                    <Input
                      color="gray_900"
                      shape="round"
                      type="email"
                      name="date"
                      placeholder={`Your email address`}
                      suffix={<Img src="images/img_essential_icons_send_teal_900.svg" alt="Essential Icons / send" />}
                      className="font-inter"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        
      </div>
    </div>
  </div>
  )
}

export default HomePageOrderPage
