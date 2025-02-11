import axios from "axios";
import React, { useEffect, useState } from "react";

const About = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/user/profile/portfolio",
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getProfile();
  });

  return (
    <>
      <div className="w-full flex flex-col overflow-x-hidden">
        <div className="relative">
          <h1
            className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto
          w-fit font-extrabold"
            style={{ background: "hsl(222.2 84% 4.9%)" }}
          >
            ABOUT
            <span className="text-tubeLight-effect font-extrabold">Me</span>
          </h1>
          <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
        </div>
        <div>
          <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
            <div className="flex justify-center items-center">
              <img
                src={user.profile_photo && user.profile_photo.url}
                alt={user.fullname}
                className="bg-white p-2 sm:p-4 h-[240px] sm:h-[340px] md:h-[350px]
              lg:h-[450px]"
              />
            </div>
            <div className="flex justify-center flex-col tracking-[1px] text-2xl gap-5">
              <p>{user.aboutme}</p>
            </div>
          </div>
          <p className="tracking-[1px] text-2xl">
            I don’t let setbacks define me. I am someone who keeps
            moving forward, even when things get tough. I think I am  
            a mix of resilience, ambition, and creativity, with a strong sense
            of purpose.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
